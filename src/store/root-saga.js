import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/category.saga';
// Generator Function
export function* rootSaga(){
  yield all([call(categoriesSaga)]);
}
