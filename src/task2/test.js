import { assert, report } from "../common/test_lib.js";
import { Signal, Effect, isReactive } from "../reactive_lib.js";

const signal = new Signal(42);

assert(signal.value === 42, "Initial signal value");
signal.value = 69;
assert(signal.value === 69, "Updating signal");

const memo = new Effect(() => signal.value);
assert(memo.value === 69, "Initial memo value");
signal.value = 42;
assert(memo.value === 42, "Signal update causes memo update");

signal.value = 0;
const memo2 = new Effect(() => memo.value + memo.value);
signal.value = 42;
assert(memo2.value === 84, "Memo using another memo works ");

let effect_test = ':(';
new Effect(() => { effect_test = signal.value });
assert(effect_test === 42, "Effect initial run");

signal.value = 69;
assert(effect_test === 69, "Effect run on update");

let effect_test2 = ':(';
new Effect(() => { effect_test2 = memo.value * signal.value });

signal.value = 2;

assert(effect_test2 === 4, "Effect with memo dependecy runs");

assert(isReactive(signal), "Signal recognized as reactive");
assert(isReactive(memo), "Memo recognized as reactive");

report();
