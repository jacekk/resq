import {CONTACT_CREATE} from '../constants';

export function contactCreate(id, name, telephone) {
    return {
        type: CONTACT_CREATE,
        payload: {
            id, name, telephone
        },
        meta: {
            validator: {
                id: {
                    func: (id) => typeof id === 'number',
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
