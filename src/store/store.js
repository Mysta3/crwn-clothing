import { compose, legacy_createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';


const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) return next(action);

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  blacklist: ['user']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === 'production' && loggerMiddleware, 
  sagaMiddleware
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
