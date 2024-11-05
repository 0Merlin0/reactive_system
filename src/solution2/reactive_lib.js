const effect_stack = [];

export class Reactive {

    constructor(initialValue) {
        this._subscriptions = new Set();
        this._cached_value = initialValue;
    }

    subscribe() {
        const active_effect = effect_stack[effect_stack.length - 1];
        if (active_effect) {
            this._subscriptions.add(active_effect);
        }
    }

    get_value() {
        this.subscribe();
        return this._cached_value;
    }

    set_value(value) {
        this._cached_value = value;
        this.notify_subscriptions();
    }

    notify_subscriptions() {
        for (const sub of this._subscriptions) {
            sub.compute_value();
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
        this.compute_value();
    }

    compute_value() {
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
