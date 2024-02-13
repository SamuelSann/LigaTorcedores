import { DataType, ActionType, Actions } from "./types"

export const reducer = (state: DataType, action: ActionType) => {
    switch (action.type) {
        case Actions.SET_TOKEN:
            return { ...state, token: action.payload.token || '' };
        case Actions.SET_USER:
            return { ...state, user: action.payload.user || null };
        default: 
            return state;
    }
}
