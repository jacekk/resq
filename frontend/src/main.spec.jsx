import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';

expect.extend(expectJSX);

describe('Main', () => {
    it('should be ok', () => {
        expect(true).toBe(true);
    });
});
