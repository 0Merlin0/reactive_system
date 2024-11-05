import { assert, report } from "../common/test_lib.js";
import { Signal, Effect, isReactive } from "../reactive_lib.js";

const signal1 = new Signal(42);

assert(signal1.value === 42, "Initial signal value");
signal1.value = 69;
assert(signal1.value === 69, "Updating signal");

const memo = new Effect(() => signal1.value);
assert(memo.value === 69, "Initial memo value");
signal1.value = 42;
assert(memo.value === 42, "Signal update causes memo update");

signal1.value = 0;
const memo2 = new Effect(() => memo.value + memo.value);
signal1.value = 42;
assert(memo2.value === 84, "Memo using another memo works ");

let effect_test = ':(';
new Effect(() => { effect_test = signal1.value });
assert(effect_test === 42, "Effect initial run");

signal1.value = 69;
assert(effect_test === 69, "Effect run on update");

let effect_test2 = ':(';
new Effect(() => { effect_test2 = memo.value * signal1.value });

signal1.value = 2;

assert(effect_test2 === 4, "Effect with memo dependecy runs");

assert(isReactive(signal1), "Signal recognized as reactive");
assert(isReactive(memo), "Memo recognized as reactive");

const firstName = new Signal("Bob");
const lastName = new Signal("Sanchez");

const fullName = new Effect( () => firstName.value + " " + lastName.value);

let count = 0;
const print = (_) => { count += 1; };
new Effect( () => { print (firstName.value + "(" + fullName.value + ")"); });

count = 0;
firstName.value = "Carlos";
assert(count === 1, "Effect only evaluated once");

let count2 = 0;
const print2 = (_, i) => { count2 = i; };

const guard = new Signal(true);

new Effect( () => { if (guard.value) {
        print2(firstName.value, 10);
    } else {
        print2(lastName.value, 1);
    }
})

guard.value = false;
count2 = 0;
firstName.value = "Homer";
assert(count2 === 0, "Cleaned up dependecy from unused code path");

guard.value = true;
assert(count2 === 10, "Reevaluate with when conditional signal changes");

count2 = 0;
lastName.value = "Simpson";
assert(count2 === 0, "Cleaned up dependecy from unused code path");


// This example of a setup with glitch-potential comes from https://stackoverflow.com/a/25141234
const a = new Signal(0);
const b = new Signal(0);

const sum = new Effect(() => a.value + b.value);
const prod = new Effect(() => a.value * b.value);

new Effect(() => {
    assert(sum.value === a.value + b.value, "Sum consistent");
    assert(prod.value === a.value * b.value, "Product consistent");
});

a.value = 1;
b.value = 2;

let caught = null;
try {
    new Effect(() => {
        a.value = sum.value;
    });
} catch (ex) {
    caught = ex;
}

assert(caught === null, "Dependecy loop prevented");
let before = sum.value;
a.value = a.value;
assert(sum.value !== before, "Effect not broken by loop prevention");

report();
