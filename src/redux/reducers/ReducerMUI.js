import { MUI_CHANGE_LANGUAGE } from '../actions/ActionsMUI';

const initialState = {
    language: 'ru'
};

export function MUI(state = initialState, action) {
    switch (action.type) {
        case MUI_CHANGE_LANGUAGE:
            return { ...state, language: action.payload.language };
        default :
            return state;
    }
}
