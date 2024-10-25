export class ComponentLib {

    constructor(isSignal, createEffect) {
        if (isSignal === undefined) {
            this.isSignal = () => false;
        } else {
            this.isSignal = isSignal;
        }

        this.createEffect = createEffect;
    }

    addProps(el, props) {
        for (var propName in props) {
            const prop = propName;
            if (props.hasOwnProperty(prop)) {
                const val = props[prop];

                if (this.isSignal(val)) {
                    if (!this.createEffect) {
                        this.registerForManualUpdate(prop, el, val);
                    }
                    else if (prop in el) {
                        this.createEffect( () => {
                            el[prop] = val();
                        });
                    } else {
                        this.createEffect( () => {
                            el.setAttribute(prop, val());
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
            el[prop] = val();
        } else {
            el.setAttribute(prop, val());
        }
    }

}
