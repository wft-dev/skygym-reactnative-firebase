import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore.js';
const { store, persistor } = configureStore()
//import {cfgStore, persistor } from './store/configureStore';

import Root from './screens/Root'
import Loader from './components/Loader/Loader';

//const store = cfgStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Root  persistor={persistor} />
                </PersistGate>
                <Loader/>
            </Provider>
        )
    }
}

