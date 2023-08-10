import {combineReducers} from 'redux';
// 리듀서 합치기
import userSlice from '../slices/user';
import likeSlice from '../slices/like';
import findSlice from '../slices/find';
import placeSlice from '../slices/likeplace';
import goodSlice from '../slices/likegood';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  find: findSlice.reducer,
  like: likeSlice.reducer,
  likeplace: placeSlice.reducer,
  likegood: goodSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;