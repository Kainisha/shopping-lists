import saga from 'saga';
import createRootReducer from 'reducer';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));

const store = createStore(createRootReducer(history), middleware);

sagaMiddleware.run(saga);

export default store;
