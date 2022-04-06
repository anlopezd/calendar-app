import { types } from "../types/types";

const initialState = {
    modalOpen: false,
}

export const uiReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.uiCloseModal:

            return {
                ...state,
                modalOpen: false
            }
    
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }    
        default:
            return state;
    }
}