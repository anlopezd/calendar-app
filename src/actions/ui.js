import { types } from "../types/types";

export const uiCloseModal =  () => {
    return {
        type: types.uiCloseModal
    }
}

export const uiOpenModal = () => {
    return {
        type: types.uiOpenModal
    }
}