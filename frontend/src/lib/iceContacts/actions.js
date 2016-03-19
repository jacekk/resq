import {
    ICE_CONTACT_CREATE,
    ICE_CONTACT_REMOVE
} from '../constants';

export function iceContactCreate(id, name, telephone) {
    return {
        type: ICE_CONTACT_CREATE,
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


export function iceContactRemove(id) {
    return {
        type: ICE_CONTACT_REMOVE,
        payload: {
            id
        }
    }
}
