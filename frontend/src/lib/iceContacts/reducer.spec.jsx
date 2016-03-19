import chai from 'chai';
let expect = chai.expect;

import {createStore, applyMiddleware} from 'redux';

import reducer from './reducer';
import {iceContactCreate, iceContactRemove} from './actions';

import Validator from 'redux-validator';

const validator = Validator();
const createStoreWithMiddleware = applyMiddleware(validator)(createStore);

let state;
let store;

describe('Feature: contact creation', () => {
    let id, name, telephone;

    id = 0;
    name = 'Ann';
    telephone = '12341234';

    beforeEach(() => {
        state = undefined;
        store = createStoreWithMiddleware(reducer);
    });

    context('Scenario: success', () => {
        describe('When a contact information is retrieview from the phone', () => {
            it('Then an contact is created', () => {
                let action = iceContactCreate(id, name, telephone);
                let result = store.dispatch(action);
                state = store.getState();
                console.log(state);
                let contact = state.get(action.payload.id);
                expect(contact.get('id')).to.equal(id);
                expect(contact.get('name')).to.equal(name);
                expect(contact.get('telephone')).to.equal(telephone);
            });
            it('Then multiple contacts can be created', () => {
                let action, id1 = 1, id2 = 2;
                action = iceContactCreate(id1, name, telephone);
                store.dispatch(action);
                action = iceContactCreate(id2, name, telephone);
                store.dispatch(action);
                state = store.getState();
                expect(state.size).to.equal(2);
            });
        });
        describe('When there is a contact', () => {
            it('Then it can be removed', () => {
                let action;
                action = iceContactCreate(id, name, telephone);
                store.dispatch(action);
                action = iceContactRemove(id);
                store.dispatch(action);
                expect(store.getState().size).to.equal(0);
            });
        });
    });
});
