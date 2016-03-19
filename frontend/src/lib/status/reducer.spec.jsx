import chai from 'chai';
let expect = chai.expect;

import {createStore, applyMiddleware} from 'redux';

import reducer from './reducer';
import {userCreate} from './actions';

import Validator from 'redux-validator';

const validator = Validator();
const createStoreWithMiddleware = applyMiddleware(validator)(createStore);
const store = createStoreWithMiddleware(reducer);


let state;

describe('Feature: user registration', () => {
    let email, password, telephone;

        email = 'john@doe.com';
        password = 'foobar';
        telephone = '12341234';

    context('Scenario: success', () => {
        describe('When a person registers', () => {
            it('then an account is created', () => {
                let action = userCreate(email, password, telephone);
                let result = store.dispatch(action);
                state = store.getState();
                let user = state.get('account');
                expect(user.get('email')).to.equal(email);
                expect(user.get('password')).to.equal(password);
                expect(user.get('telephone')).to.equal(telephone);
            });
        });
    });

    context('Scenario: invalid input', () => {
        describe('Given an invalid input', () => {
            describe('When a person registers', () => {
                it('then a validator is called for email', () => {
                    let action = userCreate('', password, telephone);
                    let result = store.dispatch(action);
                    state = store.getState();
                    let user = state.get('account');
                    expect(result.err).to.equal('validator');
                    expect(result.msg).to.equal('Invalid email');
                    expect(result.param).to.equal('email');
                    expect(user.get('email')).not.to.be.defined;
                    expect(user.get('password')).not.to.be.defined;
                    expect(user.get('telephone')).not.to.be.defined;
                });

                it('then a validator is called for password', () => {
                    let action = userCreate(email, '', telephone);
                    let result = store.dispatch(action);
                    state = store.getState();
                    let user = state.get('account');
                    expect(result.err).to.equal('validator');
                    expect(result.msg).to.equal('Invalid password');
                    expect(result.param).to.equal('password');
                    expect(user.get('email')).not.to.be.defined;
                    expect(user.get('password')).not.to.be.defined;
                    expect(user.get('telephone')).not.to.be.defined;
                });

                it('then a validator is called for telephone', () => {
                    let action = userCreate(email, password, '');
                    let result = store.dispatch(action);
                    state = store.getState();
                    let user = state.get('account');
                    expect(result.err).to.equal('validator');
                    expect(result.msg).to.equal('Invalid telephone');
                    expect(result.param).to.equal('telephone');
                    expect(user.get('email')).not.to.be.defined;
                    expect(user.get('password')).not.to.be.defined;
                    expect(user.get('telephone')).not.to.be.defined;
                });
            });
        });
    });
});
