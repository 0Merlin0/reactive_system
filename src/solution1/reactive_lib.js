export class Reactive {

    constructor() {
        this._cached_value = null;
    }

    get_value() {
        return this._cached_value;
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
    }
}

export class Effect extends Reactive {

    constructor(effect_function) {
        super();
        this.effect_function = effect_function;
        this.compute_value();
    }

    compute_value() {
        this._cached_value = this.effect_function();
    }

    get value() {
        this.compute_value();
        return this.get_value();
    }
}

export function isReactive(entity) {
    return entity instanceof Reactive;
}
