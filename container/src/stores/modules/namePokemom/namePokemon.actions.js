import { actionsTypeNamePokemon } from './namePokemon.actionType';

export function getNamePokemom() {
    return {
        type: actionsTypeNamePokemon.GET_NAME_POKEMON
    }
}

export function closeMessage() {
    return {
        type: actionsTypeNamePokemon.CLOSE_MESSAGE_GET_NAME_POKEMON
    }
}