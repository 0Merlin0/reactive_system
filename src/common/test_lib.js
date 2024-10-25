const passed = [];
const failed = [];

export function assert(test, name) {
    if (test) {
        passed.push(name);
        console.log('%s\x1b[32m%s\x1b[0m', name + ': ' , '[PASSED]');
    } else {
        failed.push(name);
        console.error('%s\x1b[31m%s\x1b[0m', name + ': ', '[FAILED]');
    }
}

export function report() {
    const total = passed.length + failed.length;
    if (passed.length > 0) {
        console.log('\x1b[32m%s\x1b[0m', 'Passed: ' + passed.length + '/' + total);
    }
    if (failed.length > 0) {
        console.log('\x1b[31m%s\x1b[0m', 'Failed: ' + failed.length + '/' + total);
    }
    if (passed.length === total) {
        console.log('\x1b[33m%s\x1b[0m', 'All tests pass. Browser example should now work');
    }
}
