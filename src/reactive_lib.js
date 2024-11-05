// Task 1
// Define and export:
//  * class Signal
//      * contructor should take the initialValue as a parameter
//      * value property should hold the value
//
//  * class Effect
//      * constructor should take the function as a parameter
//      * value property should give the result of the function
//      * Note that this is a memo, but effect and memo are so similar, we treat them the same
//
//  * function isReactive(entity)
//      * Return whether the given entity is reactive
//      * (This is only needed for the component library to be more flexible)
//


// Task 2
//
// * Define a way to track currently active computation
//
// Hint: VXNpbmcgYSBnbG9iYWwgc3RhY2sgaXMgYSByZWFzb25hYmxlIHNvbHV0aW9uCg==
//
//  * Change:
//      * Signal - track which computations called it and reexecute them when a new value is written
//        Hint 1: S2VlcCBhIFNldCBvZiBzdWJzY3JpcHRpb25zIGFuZCBhZGQgdG8gaXQgdGhlIGN1cnJlbnQgY29tcHV0YXRpb24gd2hlbmV2ZXIgdGhlIHNpZ25hbCBpcyByZWFkCg==
//        Hint 2: Q2FsbCBlYWNoIHN1YnNjcmlwdGlvbiBhZnRlciB1cGRhdGluZyB0aGUgdmFsdWUgb2YgdGhlIHNpZ25hbCBpbiB0aGUgd3JpdGUgcGFydAo=
//
//      * Effect - separate its value calculation to its value access. Recalculate only when being notified by a dependecy that has changed
//        Hint 1: VGhlIHJlYWQgcGFydCBzaG91bGQgYmUgdGhlIGV4YWN0IHNhbWUgYXMgZm9yIHNpZ25hbHMuCg==
//        Hint 2: UmVjYWxjdWxhdGluZyB0aGUgdmFsdWUgaXMgc2ltaWxhciB0byBzZXR0aW5nIGEgbmV3IHZhbHVlIGluIGEgc2lnbmFsLCBqdXN0IHRoYXQgdGhlIHZhbHVlIGNvbWVzIGZyb20gdGhlIGNvbnRhaW5lZCBmdW5jdGlvbi4gSW4gYWRkaXRpb24sIHRoZSBlZmZlY3QgbmVlZHMgdG8gcmVnaXN0ZXIgaXRzZWxmIG9uIHRoZSBjb21wdXRhdGlvbiBzdGFjawo=
//


// Task 3
//
// * Instead of running computations directly, add stale-counting to determine when to call it
//
//   Hint 1: RWZmZWN0cyBwdXNoIHRoZW1zZWx2ZXMgb250byB0aGUgY29tcHV0YXRpb25zIHN0YWNrLiBJbnN0ZWFkIG9mIGNhbGxpbmcgdGhlaXIgY29tcHV0ZV92YWx1ZSBtZXRob2QgZGlyZWNseSwgd2UgY2FuIHVzZSBhbm90aGVyIG1ldGhvZCB0aGF0IHRha2VzIGEgbWVzc2FnZSAoc29tZXRoaW5nIHJlcHJlc2VudGluZyBpZiBpdCBpcyByZWFkeSBvciBzdGFsZSkgYXMgYW4gYXJndW1lbnQgYW5kIGNhbGxpbmcgdGhlIGNvbXB1dGVfdmFsdWUgbWV0aG9kIHdoZW4gYSByZWFkeSBub3RpZmljYXRpb24gaGFzIGJlZW4gcmVjZWl2ZWQgZm9yIGVhY2ggc3RhbGUgbm90aWZpY2F0aW9uLgo=
//
//   Hint 2: Rm9yIHNpbXBsZSB0cmFja2luZyB3ZSBkb24ndCBuZWVkIHRvIHVzZSB2ZXJ5IGNvbXBsaWNhdGVkIG1lc3NhZ2VzLiBJZiB3ZSB1c2UgMSBmb3Igc3RhbGUgYW5kIC0xIGZvciByZWFkeSwgd2UgY2FuIGp1c3QgYWRkIG1lc3NhZ2VzIHRvIGFuIGFjY3VtdWxhdG9yIGFuZCBhY3Qgd2hlbiBpdCByZWFjaGVzIDAuCg==
//
//
// * Add back-link from computations to subscriptions to allow them to remove themselves
//
//   Hint 1: V2UgY2FuIGtlZXAgYSBzZXQgb2YgYmFjay1saW5rcyBvbiBlZmZlY3RzLiBUaGVuIHRoZSBzaWduYWwgY2FuIGFkZCBpdHMgb3duIHN1YnNjcmlwdGlvbnMgdG8gdGhhdCBzZXQuCg==
//
//   Hint 2: RWFjaCBjb21wdXRhdGlvbiBzaG91bGQgcmVtb3ZlIGl0c2VsZiBmcm9tIGFsbCB0aGUgc3Vic2NyaXB0aW9ucyBiZWZvcmUgaXQgcnVucyBpdHMgZnVuY3Rpb24gdXNpbmcgdGhlIGJhY2stbGlua3MuIEEgbmV3IGdyYXBoIHdpbGwgdGhlbiBiZSBidWlsdCBpbiB0aGUgbmV3IGZ1bmN0aW9uIGV4ZWN1dGlvbiwgY29udGFpbmluZyBvbmx5IHN1YnNjcmlwdGlvbnMgcmVhY2hhYmxlIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzCg==
//
// * Make sure we don't end up in a recursive loop
// Hint: SnVzdCBjaGVjayBpZiBhIGNvbXB1dGF0aW9uIGlzIG9uIHRoZSBjb21wdXRhdGlvbnMgc3RhY2sgYmVmb3JlIGFkZGluZyBhbmQgcnVubmluZyBpdC4gSWYgaXQgaXMsIGp1c3QgbG9nIGFuIGVycm9yIGFuZCByZXR1cm4gd2l0aG91dCBkb2luZyBhbnl0aGluZy4K
//


// Task 4
//
// * define and export class ReactiveObject
//   * constructor should take in an object to base reactive object on or undefined
//   * setting properties starting with '$' should wrap functions into effects and other values into Signals
//   * reading properties starting with '$' should get the value of the contained reactive component
//   * setting properties that do not start with '$' should just set a property
//   * getting properties that do not start with '$' should get the property (for properties set using '$' this should be the underlying reactive component)
