import { createStore } from 'redux';
import rootReducer from '../models/rootReducer';

//This shows the reducers on tron
const enhancer = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhancer);

export default store;