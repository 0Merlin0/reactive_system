import { assert, report } from "../common/test_lib.js";
import { ReactiveObject, Effect, isReactive } from "../reactive_lib.js";

const obj = new ReactiveObject( { $reactiveProp1: 1, $reactiveProp2: 2, plainProp: -1 });

obj.$memo = () => obj.$reactiveProp1 + obj.$reactiveProp2;


assert(obj.$memo === 3, "Initial memo value");
obj.$reactiveProp1 = 69;
assert(obj.$memo === 71, "Updating signal");

obj.$memo2 = () => obj.$reactiveProp1 * obj.plainProp;

assert(obj.$memo2 === -69, "Initial memo value");
obj.plainProp = 1;
assert(obj.$memo2 === -69, "Plain props aren't reactive");

assert(isReactive(obj.memo2), "Accessing reactive props as plain props gives underlying Reactive object");

report();
