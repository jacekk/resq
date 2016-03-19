import {TIMER_INIT, TIMER_UPDATE, TIMER_START, TIMER_STOP, TIMER_ENDED, TIMER_ADDITIONAL_UPDATE} from '../constants';

export function timerInit() {
    return {
        type: TIMER_INIT
    }
}

export function timerUpdate(minutes) {
    return {
        type: TIMER_UPDATE,
        payload: {
            minutes
        }
    }
}

export function timerAdditionalUpdate(minutes) {
    return {
        type: TIMER_ADDITIONAL_UPDATE,
        payload: {
            minutes
        }
    }
}

export function timerStart() {
    return {
        type: TIMER_START
    }
}

export function timerStop() {
    return {
        type: TIMER_STOP
    }
}

export function timerEnded() {
    return {
        type: TIMER_ENDED
    }
}
