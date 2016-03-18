import chai from 'chai';
let expect = chai.expect;

import reduce from './reducer';
import {userCreate} from './actions';

const email = 'john@doe';
const password = 'foobar';
const telephone = '12341234';

let state;

describe('Feature: user registration', () => {
    context('Scenario: success', () => {
        describe('When a person registers', () => {
            let action = userCreate(email, password, telephone);
            state = reduce(state, action);
            let user = state.get('account');
            expect(user.get('email')).to.equal(email);
            expect(user.get('password')).to.equal(password);
            expect(user.get('telephone')).to.equal(telephone);
        });
    });
});
