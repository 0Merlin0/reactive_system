const effect_stack = [];

export class Reactive {

    constructor() {
        this._subscriptions = new Set();
        this._cached_value = null;
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

    notify_subscriptions() {
        for (const sub of this._subscriptions) {
            sub.compute_value();
        }
    }

    compute_value() {}
}

export class Signal extends Reactive {

    constructor(defaultValue) {
        super();
        this._cached_value = defaultValue;
    }

    get value() {
        return this.get_value();
    }

    set value(newValue) {
        this._cached_value = newValue;
        this.notify_subscriptions();
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
            this._cached_value = this.effect_function();
            this.notify_subscriptions();
        } finally {
            effect_stack.pop();
        }
    }
}

// Wrapping into functional interface to conform with interface

export function createSignal(initialValue) {
    const s = new Signal(initialValue);

    const get = () => s.value;
    const set = (v) => s.value = v;
    get._reactive = true;
    set._reactive = true;

    return [get, set];
}

export function createEffect(func) {
    new Effect(func);
}

export function createMemo(func) {
    const e = new Effect(func);
    const get = () => e.get_value();
    get._reactive = true;
    return get;
}

export function isReactive(entity) {
    return entity._reactive === true;
}
