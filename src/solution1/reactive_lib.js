export function isReactive(entity) {
    return entity.reactive;
}

export function createSignal(initialValue) {
    let value = initialValue;
    const read = () => {
        return value;
    };
    const write = (nextValue) => {
        value = nextValue;
    }
    read.reactive = true;
    write.reactive = true;
    return [read, write];
}

export function createMemo(func) {

    const execute = () => {
        return func();
    }

    execute.reactive = true;

    return execute;
}
