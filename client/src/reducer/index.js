import {combineReducers} from 'redux'
import auth from './auth';
import alert from './alert';
import postMessage from './postMessage';

export default combineReducers({
    auth:auth,
    alert:alert,
    postMessage:postMessage
})