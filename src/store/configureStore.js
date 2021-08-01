import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth'

const composeEnhances = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer
        }),
        composeEnhances(applyMiddleware(thunk))
    );
    return store;
}
