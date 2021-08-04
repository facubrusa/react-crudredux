import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../types/index';

// Each reducer has it own state
const initialState = {
    alert: null
}

function alertReducer(state = initialState, action){
    switch(action.type){
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                alert: null
            }
        default:
            return state;
    }
}

export default alertReducer;