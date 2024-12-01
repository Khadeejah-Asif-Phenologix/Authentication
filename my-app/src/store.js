import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { authReducer } from './redux/reducers/authReducer';
import {userListReducer} from './redux/reducers/userListReducer'

const rootreducers = combineReducers({
    auth: authReducer,
    userList: userListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(rootreducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;