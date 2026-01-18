import { expect, test } from '@rstest/core';
import { sayHi } from '../src/verb';

test('should sayHi correctly', () => {
    expect(sayHi()).toBe('hi');
});
