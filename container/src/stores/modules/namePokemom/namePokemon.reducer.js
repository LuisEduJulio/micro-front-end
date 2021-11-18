import { actionsTypeNamePokemon } from './namePokemon.actionType';

const initialState = {
    data: [],
    loading: false,
    message: {},
    open: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case actionsTypeNamePokemon.GET_NAME_POKEMON: {
            return {
                ...state,
                loading: !initialState.loading,
            }
        }
        case actionsTypeNamePokemon.GET_NAME_POKEMON_SUCESS: {
            return {
                ...state,
                data: action.payload.data,
                loading: initialState.loading,
                message: action.payload.message,
                open: !initialState.open
            }
        }
        case actionsTypeNamePokemon.GET_NAME_POKEMON_ERROR: {
            return {
                ...state,
                data: initialState.data,
                loading: initialState.loading,
                message: action.payload.message,
                open: !initialState.open
            }
        }
        case actionsTypeNamePokemon.CLOSE_MESSAGE_GET_NAME_POKEMON: {
            return {
                ...state,
                open: initialState.open
            }
        }
        default:
            return { ...state }
    }
}

