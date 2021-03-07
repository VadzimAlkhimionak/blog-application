const registrationState = {
    roles: [{}],
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: null,
    biography: '',
}

export const registrationReducer = (state = registrationState, action) => {
    switch (action.type) {
        case "roles":
            return {...state, roles: action.payload};
        case "firstName":
            return {...state, firstName: action.payload};
        case "lastName":
            return {...state, lastName: action.payload};
        case "username":
            return {...state, username: action.payload};
        case "email":
            return {...state, email: action.payload};
        case "password":
            return {...state, password: action.payload};
        case "repeatPassword":
            return {...state, repeatPassword: action.payload};
        case "biography":
            return {...state, biography: action.payload};
        default:
            return state;
    }
}