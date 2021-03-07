import {combineReducers} from "redux";
import {personalDataReducer} from "./personalDataReducer";
import {loginReducer} from "./loginReducer";
import {registrationReducer} from "./registrationReducer";
import {readerReducer} from "./readerReducer";
import {appReducer} from "./appReducer";
import {authorReducer} from "./authorReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    personalData: personalDataReducer,
    reader: readerReducer,
    author: authorReducer,
})