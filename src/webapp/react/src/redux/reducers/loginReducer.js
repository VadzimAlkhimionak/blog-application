const loginState = {
    email: '',
    password: '',
}

export const loginReducer = (state = loginState, action) => {
    switch (action.type) {
        case "email":
            return {...state, email: action.payload};
        case "password":
            return {...state, password: action.payload};
        default:
            return state;
    }
}