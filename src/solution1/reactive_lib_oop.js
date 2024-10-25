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

// Called Effect, since there won't be a difference between effect and memo
// in the OOP version
export class Effect extends Reactive {

    constructor(effect_function) {
        super();
        this.effect_function = effect_function;
        this.compute_value();
    }

    compute_value() {
        this._cached_value = this.effect_function();
    }

    get_value() {
        this.compute_value();
        return this._cached_value;
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

export function createMemo(func) {
    const e = new Effect(func);
    const get = () => e.get_value();
    get._reactive = true;
    return get;
}

export function isReactive(entity) {
    return entity._reactive === true;
}
