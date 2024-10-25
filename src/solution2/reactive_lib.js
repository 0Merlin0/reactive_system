export function isReactive(entity) {
    return entity.reactive;
}

const computation_stack = [];
function current_computation() {
    return computation_stack[computation_stack.length - 1];
}

export function createSignal(initialValue) {
    let value = initialValue;
    const subscriptions = new Set();

    const read = () => {
        if (current_computation()) {
            subscriptions.add(current_computation());
        }
        return value;
    };
    const write = (nextValue) => {
        value = nextValue;
        for (const sub of subscriptions) {
            sub();
        }
    }
    read.reactive = true;
    write.reactive = true;
    return [read, write];
}

export function createMemo(func) {

    let value;
    const subscriptions = new Set();

    const execute = () => {
        computation_stack.push(execute);
        value = func();
        computation_stack.pop();
        for (const sub of subscriptions) {
            sub();
        }
    }

    const read = () => {
        if (current_computation()) {
            subscriptions.add(current_computation());
        }
        return value;
    }

    read.reactive = true;
    execute();
    return read;
}

export function createEffect(func) {
    const execute = () => {
        computation_stack.push(execute);
        func();
        computation_stack.pop();
    }

    execute();
}
