//store file is used to generate store object youll use in your react application

import { compose, legacy_createStore as createStore , applyMiddleware } from 'redux';
import logger from 'redux-logger';


import {rootReducer} from './root-reducer'

//root reducer
const middleware = [logger];

const composedEnhansers = compose(applyMiddleware(...middleware));

const store = createStore(rootReducer, undefined, composedEnhansers);

export default store;