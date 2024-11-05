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

assert(isReactive(signal), "Read signal recognized as reactive");
assert(isReactive(memo), "Memo recognized as reactive");

report();
