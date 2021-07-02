import http from './http-common';


class PokemonService {

    getPokemonByName(name){
        return http.get(`${name}`);
    }
}

export default new PokemonService();