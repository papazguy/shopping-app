//store file is used to generate store object youll use in your react application

import { compose, legacy_createStore as createStore , applyMiddleware } from 'redux';
//import logger from 'redux-logger';
import {loggerMiddleware} from './middleware/logger'


import {rootReducer} from './root-reducer'

//root reducer
const middlewares = [loggerMiddleware];

const composedEnhansers = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, undefined, composedEnhansers);

export default store;