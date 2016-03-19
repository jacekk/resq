import {USER_CREATE, MIN_PASS_LENGTH} from '../constants';
import emailValidator from 'email-validator';

export function userCreate(email, password, telephone) {
    return {
        type: USER_CREATE,
        payload: {
            email, password, telephone
        },
        meta: {
            validator: {
                email: {
                    func: (email) => {
                        return emailValidator.validate(email);
                    },
                    msg: 'Invalid email'
                },
                password: {
                    func: (password) => {
                        return password.length >= MIN_PASS_LENGTH;
                    },
                    msg: 'Invalid password'
                },
                telephone: {
                    func: (telephone) => !!telephone,
                    msg: 'Invalid telephone'
                }
            }
        }
    }
}
