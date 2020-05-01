import {combineReducers} from 'redux'
import auth from './auth';
import alert from './alert';

export default combineReducers({
    auth:auth,
    alert:alert
})