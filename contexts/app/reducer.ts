import { DataType, ActionType, Actions } from "./types"

export const reducer = (state: DataType, action: ActionType) => {
    switch (action.type) {
        case Actions.SET_LIGA:
            return { ...state, liga: action.payload.liga };
            break;
        default: return state;
    }
}