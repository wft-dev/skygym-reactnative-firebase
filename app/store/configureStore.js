import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/index';
// For  redux-logger
const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
  });

const persistConfig = {
    key: 'root',
    storage,
    timeout: null,
    whitelist: ['sessionReducer','editOnReducer', 'isLoginReducer' ]
};

// const cfgStore = () => {
//     return createStore(
//         reducers,
//         applyMiddleware(thunk)
//     )
// };
//
// export default cfgStore;

// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// export default () => {
//     let store = createStore(persistedReducer);
//     let persistor = persistStore(store);
//     return { store, persistor }
// }


const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const middlewares = [ReduxThunk, loggerMiddleware];
  const enhancer = applyMiddleware(...middlewares);
  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store)
  return { store, persistor}
} 
// const cfgStore = () => {
//     const middlewares = [thunk, loggerMiddleware];
//     const enhancer = applyMiddleware(...middlewares);
//     const persistedReducer = persistReducer(persistConfig, rootReducer);
//     // create store
//     return createStore(persistedReducer, enhancer);
// };

// let persistor = persistStore(cfgStore());

// // Exports
// export {
//     cfgStore,
//     persistor,
// };

// export const persistor = persistStore(cfgStore());

// export default cfgStore;