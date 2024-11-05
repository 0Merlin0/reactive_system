const effect_stack = [];

export class Reactive {

    constructor(initialValue) {
        this._subscriptions = new Set();
        this._stale = 0;
        this._cached_value = initialValue;
    }

    subscribe() {
        const active_effect = effect_stack[effect_stack.length - 1];
        if (active_effect) {
            this._subscriptions.add(active_effect);
            active_effect._cleanup.add(this);
        }
    }

    get_value() {
        this.subscribe();
        return this._cached_value;
    }

    set_value(value) {
        this.send_stale();
        this._cached_value = value;
        this.send_ready();
    }

    send_stale() {
        for (const sub of this._subscriptions) {
            sub.count_stale(1);
        }
    }

    send_ready() {
        for (const sub of this._subscriptions) {
            sub.count_stale(-1);
        }
    }

    count_stale(increase) {
        this._stale += increase;

        if (this._stale === 0) {
            this.send_stale();
            this.compute_value();
            this.send_ready();
        } else if (this._stale < 0) {
            this._stale = 0;
        }
    }

    compute_value() {}
}

export class Signal extends Reactive {

    constructor(defaultValue) {
        super(defaultValue);
    }

    get value() {
        return this.get_value();
    }

    set value(newValue) {
        this.set_value(newValue);
    }
}

export class Effect extends Reactive {

    constructor(effect_function) {
        super();
        this.effect_function = effect_function;
        this._cleanup = new Set();
        this.compute_value();
    }

    compute_value() {
        if (effect_stack.includes(this)) {
            console.log("Same Computation already on the computations stack.");
            return;
        }
        for (const c of this._cleanup) {
            c._subscriptions.delete(this);
        }
        effect_stack.push(this);
        try {
            this.set_value(this.effect_function());
        } finally {
            effect_stack.pop();
        }
    }

    get value() {
        return this.get_value();
    }
}

export class ReactiveObject {
    constructor(base_object) {
        const proxy = new Proxy(this, {
            get(target, prop, receiver) {
                if (!prop.startsWith("$") && target.hasOwnProperty(prop)) {
                    return target[prop];
                }
                prop = prop.substring(1);
                if (target.hasOwnProperty(prop)) {
                    if (isReactive(target[prop])) {
                        return target[prop].value;
                    } else {
                        return target[prop];
                    }

                } else {
                    return undefined;
                }

            },
            set(target, prop, value) {
                if (!prop.startsWith("$")) {
                    target[prop] = value;
                    return true;
                }
                prop = prop.substring(1);
                if (target.hasOwnProperty(prop)) {
                    target[prop].value = value;
                } else if (isReactive(value)) {
                   target[prop] = value;
                } else if (typeof value === "function") {
                   target[prop] = new Effect(value);
                } else {
                   target[prop] = new Signal(value);
                }
                return true;
            }

        });
        if (!!base_object) {
            for (const prop in base_object) {
                proxy[prop] = base_object[prop];
            }
        }
        return proxy;
    }
}


export function isReactive(entity) {
    return entity instanceof Reactive;
}
