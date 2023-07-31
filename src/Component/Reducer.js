export const intialState = {
    isAthentication: JSON.parse(localStorage.getItem('userLogin')) || false,
    opportunities: {},
    candidates:{}
}

export const stateReducer = (state, action) => {

    switch (action.type) {
        case "login": {
            return {
                ...state,
                isAthentication: action.payload
            }
        }
        case "logout": {
            return {
                ...state,
                isAthentication: action.payload
            }
        }
        case "VIEW_OPPORTUNITIES": {
            return {
                ...state,
                opportunities: action.payload
            }
        }
        case "VIEW_CANDIDATES": {
            return {
                ...state,
                candidates: action.payload
            }
        }
        default: return state;
    }
}      