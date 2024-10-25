import { assert, report } from "../common/test_lib.js";
import { createSignal, createMemo, isReactive } from "../reactive_lib.js";

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

assert(isReactive(read), "Read signal recognized as reactive");
assert(isReactive(write), "Write signal recognized as reactive");
assert(isReactive(memo), "Memo recognized as reactive");

report();
