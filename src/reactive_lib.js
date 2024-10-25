// Task 1
// Define and export:
//  * function createSignal(initialValue)
//      * Return a tuple of functions to read and write contained value
//
//  * function createMemo(func)
//      * Return a function that returns the result of computing func
//
//  * function isReactive(entity)
//      * Return whether the given entity is reactive (should be true for any of the functions returned form createSignal and createMemo)
//      * (This is only needed for the component library to be more flexible)
//
//  Hint: WW91IGNhbiBhZGQgYSBwcm9wZXJ0eSB0byB5b3VyIHJlYWN0aXZlIGVudGl0aWVzIHdoZW4geW91IGNyZWF0ZSB0aGVtIGFuZCBjaGVjayBpdCBoZXJlCg==


// Task 2
//
// * Define a way to track currently active computation
//
// Hint: VXNpbmcgYSBnbG9iYWwgc3RhY2sgaXMgYSByZWFzb25hYmxlIHNvbHV0aW9uCg==
//
// Define and export:
//  * function createEffect(func)
//      * Should not return anything, but run func everytime its dependencies change
//        (This will not work until the signals have also been updated.)
//
//  Hint: V3JhcCBmdW5jIGluIGEgZnVuY3Rpb24gdGhhdCBwdXNoZXMgaXRzZWxmIHRvIHRoZSBjb21wdXRhdGlvbiBzdGFjayBiZWZvcmUgY2FsbGluZyBmdW5jIGFuZCBwb3BwaW5nIGl0c2VsZiBhZ2FpbiBhZnRlcgo=
//
//  * Change:
//      * createSignal to track which computations called it and reexecute them when a new value is written
//        Hint 1: S2VlcCBhIFNldCBvZiBzdWJzY3JpcHRpb25zIGFuZCBhZGQgdG8gaXQgdGhlIGN1cnJlbnQgY29tcHV0YXRpb24gd2hlbmV2ZXIgdGhlIHNpZ25hbCBpcyByZWFkCg==
//        Hint 2: Q2FsbCBlYWNoIHN1YnNjcmlwdGlvbiBhZnRlciB1cGRhdGluZyB0aGUgdmFsdWUgb2YgdGhlIHNpZ25hbCBpbiB0aGUgd3JpdGUgcGFydAo=
//
//      * createMemo to separate its value calculation to its value access. It should update like an effect and be read like a signal
//        Hint 1: VGhlIHJlYWQgcGFydCBzaG91bGQgYmUgdGhlIGV4YWN0IHNhbWUgYXMgZm9yIHNpZ25hbHMuIFRoaXMgaXMgdGhlIGNsb3N1cmUgdGhhdCBjcmVhdGVNZW1vIHNob3VsZCByZXR1cm4K
//        Hint 2: VGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZXhlY3V0aW9uIG9mIGVmZmVjdCBhbmQgbWVtbyBzaG91bGQgYmUgdGhhdCB0aGUgd3JhcHBlZCBmdW5jdGlvbiBpbiBtZW1vIHJldHVybnMgYSB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzdG9yZWQgYW5kIHRoYXQgcmVjYWxjdWxhdGluZyBhIG1lbW8gc2hvdWxkIG5vdGlmeSBpdHMgc3Vic2NyaWJlcnMK
//


// Task 3
//
// * Instead of running computations directly, add stale-counting to determine when to call it
//
//   Hint 1: Qm90aCBlZmZlY3RzIGFuZCBmdW5jdGlvbnMgbWVtb3MgcHVzaCB0aGVpciBleGVjdXRpb24gZnVuY3Rpb24gb250byB0aGUgY29tcHV0YXRpb25zIHN0YWNrLiBJbnN0ZWFkIG9mIHVzaW5nIHRoZSBleGVjdXRpb24gZnVuY3Rpb24gZGlyZWNseSwgd2UgY2FuIHB1c2ggYW5vdGhlciBmdW5jdGlvbiB0aGF0IHRha2VzIGEgbWVzc2FnZSAoc29tZXRoaW5nIHJlcHJlc2VudGluZyBpZiBpdCBpcyByZWFkeSBvciBzdGFsZSkgYXMgYW4gYXJndW1lbnQgYW5kIGNhbGxpbmcgdGhlIGV4ZWN1dGlvbiBmdW5jdGlvbiB3aGVuIGEgcmVhZHkgbm90aWZpY2F0aW9uIGhhcyBiZWVuIHJlY2VpdmVkIGZvciBlYWNoIHN0YWxlIG5vdGlmaWNhdGlvbi4K
//
//   Hint 2: Rm9yIHNpbXBsZSB0cmFja2luZyB3ZSBkb24ndCBuZWVkIHRvIHVzZSB2ZXJ5IGNvbXBsaWNhdGVkIG1lc3NhZ2VzLiBJZiB3ZSB1c2UgMSBmb3Igc3RhbGUgYW5kIC0xIGZvciByZWFkeSwgd2UgY2FuIGp1c3QgYWRkIG1lc3NhZ2VzIHRvIGFuIGFjY3VtdWxhdG9yIGFuZCBhY3Qgd2hlbiBpdCByZWFjaGVzIDAuCg==
//
//
// * Add back-link from computations to subscriptions to allow them to remove themselves
//
//   Hint 1: RnVuY3Rpb25zIGluIGphdmFzY3JpcHQgYXJlIG9iamVjdHMsIHNvIHdlIGNhbiBhdHRhY2ggYSBiYWNrLWxpbmsgc2V0IGFzIGEgcHJvcGVydHkgdG8gdGhlIGZ1bmN0aW9uIHdlIHB1c2ggdG8gdGhlIGNvbXB1dGF0aW9uIHN0YWNrLiBUaGVuIHRoZSBzaWduYWwgY2FuIGFkZCBpdHMgb3duIHN1YnNjcmlwdGlvbnMgdG8gdGhhdCBzZXQuCg==
//
//   Hint 2: RWFjaCBjb21wdXRhdGlvbiBzaG91bGQgcmVtb3ZlIGl0c2VsZiBmcm9tIGFsbCB0aGUgc3Vic2NyaXB0aW9ucyBiZWZvcmUgaXQgcnVucyBpdHMgZnVuY3Rpb24gdXNpbmcgdGhlIGJhY2stbGlua3MuIEEgbmV3IGdyYXBoIHdpbGwgdGhlbiBiZSBidWlsdCBpbiB0aGUgbmV3IGZ1bmN0aW9uIGV4ZWN1dGlvbiwgY29udGFpbmluZyBvbmx5IHN1YnNjcmlwdGlvbnMgcmVhY2hhYmxlIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzCg==
//
// * Make sure we don't end up in a recursive loop
// Hint: SnVzdCBjaGVjayBpZiBhIGNvbXB1dGF0aW9uIGlzIG9uIHRoZSBjb21wdXRhdGlvbnMgc3RhY2sgYmVmb3JlIGFkZGluZyBhbmQgcnVubmluZyBpdC4gSWYgaXQgaXMsIGp1c3QgbG9nIGFuIGVycm9yIGFuZCByZXR1cm4gd2l0aG91dCBkb2luZyBhbnl0aGluZy4K
