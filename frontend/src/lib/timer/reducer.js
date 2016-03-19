import * as consts from '../constants';
import {Map} from "immutable";

const MINUTES = 90;

const initialState = Map({
    started: false,
    percent: 100,
    minutes: MINUTES,
    initialMinutes: MINUTES
});

export default function timer(state = initialState, action) {
    switch (action.type) {
        case consts.TIMER_INIT:
            return state;
        case consts.TIMER_ADDITIONAL_UPDATE:
        case consts.TIMER_UPDATE:
            return state.withMutations(map => {
                let s = state.get('started');
                let minutes = action.payload.minutes;

                let initialMinutes = s ? state.get('initialMinutes') : action.payload.minutes;

                if (action.type === consts.TIMER_ADDITIONAL_UPDATE) {
                    initialMinutes = action.payload.minutes;
                }

                let percent = minutes / initialMinutes;

                if (!percent) {
                    percent = 0;
                }

                map.set('minutes', minutes)
                   .set('initialMinutes', initialMinutes)
                   .set('percent', percent * 100);
            });
        case consts.TIMER_START:
            return state.set('started', true);
        case consts.TIMER_STOP:
            return state.withMutations(map => {
                map.set('minutes', state.get('initialMinutes'))
                   .set('percent', 100)
                   .set('started', false);
            });
        case consts.TIMER_ENDED:
            return state.withMutations(map => {
                map.set('minutes', state.get('initialMinutes'))
                   .set('percent', 100)
                   .set('ended', true)
                   .set('started', false);
            });

    }

    return state;
}
