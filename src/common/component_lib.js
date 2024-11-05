export class ComponentLib {

    constructor(isReactive, Effect) {
        if (isReactive === undefined) {
            this.isReactive = () => false;
        } else {
            this.isReactive = isReactive;
        }

        this.effectClass = Effect;
    }

    addProps(el, props) {
        for (var propName in props) {
            const prop = propName;
            if (props.hasOwnProperty(prop)) {
                const val = props[prop];

                if (this.isReactive(val)) {
                    if (!this.effectClass) {
                        this.registerForManualUpdate(prop, el, val);
                    }
                    else if (prop in el) {
                        new this.effectClass( () => {
                            el[prop] = val.value;
                        });
                    } else {
                        new this.effectClass( () => {
                            el.setAttribute(prop, val.value);
                        });
                    }
                } else {
                    if (prop in el) {
                        el[prop] = val;
                    } else {
                        el.setAttribute(prop, val);
                    }
                }
            } else {
            }
        }
    }

    button(props) {
        const el = document.createElement('button');
        this.addProps(el, props);
        return el;
    }

    text(props) {
        const el = document.createElement('input');
        el.type = 'text';
        this.addProps(el, props);
        return el;
    }

    add_to_main() {
        for (var i = 0; i < arguments.length; i++) {
            const element = arguments[i];
            try {
                document.getElementById('__main__').appendChild(element);
            } catch(e) {
                document.getElementById('__main__').insertAdjacentHTML('beforeend', element);
            }
        }
    }

    update(el) {
        const element = this.manual_update.get(el);
        for (const entry of element.entries()) {
            this.manualUpdate(el, entry[0], entry[1]);
        }
    }

    registerForManualUpdate(prop, el, val) {
        if (this.manual_update === undefined) {
            this.manual_update = new Map();
        }

        const element = this.manual_update.get(el) ?? new Map();
        this.manual_update.set(el, element);
        element.set(prop, val);
        this.manualUpdate(el, prop, val);
    }

    manualUpdate(el, prop, val) {
        if (prop in el) {
            el[prop] = val.value;
        } else {
            el.setAttribute(prop, val.value);
        }
    }

}

export class ReactiveObjectComponentLib {

    constructor(isReactive, Effect) {
        this.isReactive = isReactive;
        this.effectClass = Effect;
    }

    addProps(el, props) {
        for (var propName in props) {
            const prop = propName;
            const val = props[prop];
            console.log(prop, val, this.isReactive(val));
            if (this.isReactive(val)) {
                if (prop in el) {
                    new this.effectClass( () => {
                        el[prop] = val.value;
                    });
                } else {
                    new this.effectClass( () => {
                        el.setAttribute(prop, val.value);
                    });
                }
            } else {
                if (prop in el) {
                    el[prop] = val;
                } else {
                    el.setAttribute(prop, val);
                }
            }
        }
    }

    button(props) {
        const el = document.createElement('button');
        this.addProps(el, props);
        return el;
    }

    text(props) {
        const el = document.createElement('input');
        el.type = 'text';
        this.addProps(el, props);
        return el;
    }

    add_to_main() {
        for (var i = 0; i < arguments.length; i++) {
            const element = arguments[i];
            try {
                document.getElementById('__main__').appendChild(element);
            } catch(e) {
                document.getElementById('__main__').insertAdjacentHTML('beforeend', element);
            }
        }
    }
}
