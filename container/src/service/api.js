import axios from './config/default';

export async function requestPokemon() {
    try {
        const response = await axios.get('pokemon_names.json');

        return response;
    } catch (error) {
        throw error;
    }
}