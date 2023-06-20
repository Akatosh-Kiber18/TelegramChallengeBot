import saveResultTask from '../src/components/ResultForm/saveResultTask.js';

describe("saveResultTask", () => {
    it('should work with not nullable event', () => {
        expect(saveResultTask({ target: { value: "test" }}, console.log)).toBeUndefined();
    });

    it('should work with nullable event', () => {
        expect(saveResultTask(null, console.log)).toBeUndefined();
    });
});