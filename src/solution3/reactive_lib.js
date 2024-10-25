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
            current_computation().cleanup.add(subscriptions);
        }
        return value;
    };
    const write = (nextValue) => {
        for (const sub of subscriptions) {
            sub(1);
        }
        value = nextValue;
        for (const sub of subscriptions) {
            sub(-1);
        }
    }
    read.reactive = true;
    write.reactive = true;
    return [read, write];
}

export function createMemo(func) {

    let value;
    const subscriptions = new Set();
    let stale = 0;

    const count_stale = (increase) => {
        stale += increase;
        if (stale === 0) {
            for (const sub of subscriptions) {
                sub(1);
            }
            execute();
            for (const sub of subscriptions) {
                sub(-1);
            }
        }
        if (stale < 0) {
            stale = 0;
        }
    }

    count_stale.cleanup = new Set();

    const execute = () => {
        if (computation_stack.includes(count_stale)) {
            console.log("Same Memo already in call stack, preventing further recursion.");
        } else {
            for (const c of count_stale.cleanup) {
                c.delete(count_stale);
            }
            count_stale.cleanup.clear();
            computation_stack.push(count_stale);
            value = func();
            computation_stack.pop();
        }
    }

    const read = () => {
        if (current_computation()) {
            subscriptions.add(current_computation());
            current_computation().cleanup.add(subscriptions);
        }
        return value;
    }

    read.reactive = true;
    execute();
    return read;
}

export function createEffect(func) {
    let stale = 0;

    const count_stale = (increase) => {
        stale += increase;
        if (stale === 0) {
            execute();
        }
        if (stale < 0) {
            stale = 0;
        }

    }

    count_stale.cleanup = new Set();

    const execute = () => {
        if (computation_stack.includes(count_stale)) {
            console.log("Same Effect already in call stack, preventing further recursion");
        } else {
            for (const c of count_stale.cleanup) {
                c.delete(count_stale);
            }
            count_stale.cleanup.clear();
            computation_stack.push(count_stale);
            func();
            computation_stack.pop();
        }
    }

    execute();
}
