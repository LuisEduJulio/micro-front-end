import { all } from 'redux-saga/effects';

import { watchGetNomePokemon } from '../modules/namePokemom/namePokemon.saga';

export default function* rootSaga() {
  yield all([
    watchGetNomePokemon()
  ]);
}