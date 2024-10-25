import { assert, report } from "../common/test_lib.js";
import { createSignal, createMemo, createEffect, isReactive } from "../reactive_lib.js";

const [read, write] = createSignal(42);

assert(read() === 42, "Initial signal value");
write(69);
assert(read() === 69, "Updating signal");

const memo = createMemo(() => read());
assert(memo() === 69, "Initial memo value");
write(42);
assert(memo() === 42, "Signal update causes memo update");

write(0);
const memo2 = createMemo(() => memo() + memo());
write(42);
assert(memo2() === 84, "Memo using another memo works ");

let effect_test = ':(';
createEffect(() => { effect_test = read() });
assert(effect_test === 42, "Effect initial run");

write(69);
assert(effect_test === 69, "Effect run on update");

let effect_test2 = ':(';
createEffect(() => { effect_test2 = memo() * read() });

write(2);

assert(effect_test2 === 4, "Effect with memo dependecy runs");

assert(isReactive(read), "Read signal recognized as reactive");
assert(isReactive(write), "Write signal recognized as reactive");
assert(isReactive(memo), "Memo recognized as reactive");

const [firstName, setFirstName] = createSignal("Bob");
const [lastName, setLastName] = createSignal("Sanchez");

const fullName = createMemo( () => firstName() + " " + lastName());

let count = 0;
const print = (_) => { count += 1; };
createEffect( () => { print (firstName() + "(" + fullName() + ")"); });

count = 0;
setFirstName("Carlos");
assert(count === 1, "Effect only evaluated once");

let count2 = 0;
const print2 = (_, i) => { count2 = i; };

const [guard, setGuard] = createSignal(true);

createEffect( () => { if (guard()) {
        print2(firstName(), 10);
    } else {
        print2(lastName(), 1);
    }
})

setGuard(false);
count2 = 0;
setFirstName("Homer");
assert(count2 === 0, "Cleaned up dependecy from unused code path");

setGuard(true);
assert(count2 === 10, "Reevaluate with when conditional signal changes");

count2 = 0;
setLastName("Simpson");
assert(count2 === 0, "Cleaned up dependecy from unused code path");


// This example of a setup with glitch-potential comes from https://stackoverflow.com/a/25141234
const [a, setA] = createSignal(0);
const [b, setB] = createSignal(0);

const sum = createMemo(() => a() + b());
const prod = createMemo(() => a() * b());

createEffect(() => {
    assert(sum() === a() + b(), "Sum consistent");
    assert(prod() === a() * b(), "Product consistent");
});

setA(1);
setB(2);

let caught = null;
try {
    createEffect(() => {
        setA(sum());
    });
} catch (ex) {
    caught = ex;
}

assert(caught === null, "Dependecy loop prevented");
let before = sum();
setA(a());
assert(sum() !== before, "Effect not broken by loop prevention");

report();
