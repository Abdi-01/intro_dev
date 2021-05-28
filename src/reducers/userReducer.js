const INITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    role: ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("Data masuk reducer :", action.payload)
            // spread operator dan concat
            return { ...state, ...action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}