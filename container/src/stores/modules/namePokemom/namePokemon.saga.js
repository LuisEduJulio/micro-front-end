import { takeEvery, put } from "redux-saga/effects";
import { actionsTypeNamePokemon } from "./namePokemon.actionType";
import * as api from "../../../service/api";


export function* getNamePokemomSaga() {
    try {
        const response = yield api.requestPokemon();
        if (response !== [] || response !== null) {
            var data = Object.entries(response.data).map((e) => {
                return { ...e[1], id: e[0] }
            });

            yield put({
                type: actionsTypeNamePokemon.GET_NAME_POKEMON_SUCESS,
                payload: {
                    message: { title: 'Requisição realizada!', type: 'success' },
                    data: data
                }
            });
        } else {
            yield put({
                type: actionsTypeNamePokemon.GET_NAME_POKEMON_ERROR,
                payload: {
                    message: { title: 'Dados não encontrado!', type: 'info' }
                }
            });
        }
    } catch (err) {
        yield put({
            type: actionsTypeNamePokemon.GET_NAME_POKEMON_ERROR,
            payload: {
                message: { title: 'Erro na requisição!', type: 'error' },
            }
        });
    }
}

export function* watchGetNomePokemon() {
    yield takeEvery(actionsTypeNamePokemon.GET_NAME_POKEMON, getNamePokemomSaga)
}