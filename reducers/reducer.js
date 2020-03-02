import {combineReducers} from 'redux';
import refreshReducer from './refreshReducer';

export default combineReducers({
  refreshdata:refreshReducer
});