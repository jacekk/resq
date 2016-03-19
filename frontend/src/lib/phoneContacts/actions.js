import {
    PHONE_CONTACT_CREATE
} from '../constants';

export function phoneContactCreate(id, name, telephone) {
    return {
        type: PHONE_CONTACT_CREATE,
        payload: {
            id, name, telephone
        },
        meta: {
            validator: {
                id: {
                    func: (id) => typeof id === 'string',
                    msg: 'Invalid id'
                },
                name: {
                    func: (name) => !!name.length,
                    msg: 'Invalid name'
                },
                telephone: {
                    func: (telephone) => !!telephone,
                    msg: 'Invalid telephone'
                }
            }
        }
    }
}
