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

export function isReactive(entity) {
    return entity instanceof Reactive;
}
