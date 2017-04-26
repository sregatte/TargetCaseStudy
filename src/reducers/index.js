import { combineReducers } from 'redux';
import ItemReducer from './reducer_item.js';
const rootReducer = combineReducers({
  item: ItemReducer
});

export default rootReducer;
