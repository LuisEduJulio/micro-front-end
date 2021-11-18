import { combineReducers } from 'redux';

import namePokemon from '../modules/namePokemom/namePokemon.reducer'

const rootReducer = combineReducers({
    namePokemon: namePokemon
})

export default rootReducer;