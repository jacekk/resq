import chai from 'chai';
let expect = chai.expect;

import {createStore, applyMiddleware} from 'redux';

import reducer from './reducer';
import {contactCreate} from './actions';

import Validator from 'redux-validator';

const validator = Validator();
const createStoreWithMiddleware = applyMiddleware(validator)(createStore);
const store = createStoreWithMiddleware(reducer);


let state;

describe('Feature: contact creation', () => {
    let id, name, telephone;

    id = 0;
    name = 'Ann';
    telephone = '12341234';

    context('Scenario: success', () => {
        describe('When a contact information is retrieview from the phone', () => {
            it('then an contact is created', () => {
                let action = contactCreate(id, name, telephone);
                let result = store.dispatch(action);
                state = store.getState();
                let contact = state.get(action.payload.id);
                expect(contact.get('id')).to.equal(id);
                expect(contact.get('name')).to.equal(name);
                expect(contact.get('telephone')).to.equal(telephone);
            });
        });
    });
});
