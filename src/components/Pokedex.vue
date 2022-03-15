<template>
    <v-container class="d-flex justify-center">
        
        <div>
            <img id="pokeball" src="../assets/Pokeball.png" alt="Pokéball">
            <h1 class="d-inline">Pokedéx</h1>
            <v-text-field 
                class="d-block justify-center" 
                v-model="name"
                @keyup.enter="getPokemonByName()"
                label="Who's That Pokémon?">
            </v-text-field>
            <v-btn 
                id="search-button" 
                class="justify-center"
                rounded    
                color="red accent-1"
                @click="getPokemonByName()">
                    <v-icon left>mdi-pokeball</v-icon>
                    search
            </v-btn>
            <v-btn 
                id="clear-search-button" 
                class="justify-center"
                rounded    
                color="red accent-1"
                @click="clearSearch()">
                    <v-icon left>mdi-refresh</v-icon>
                    clear
            </v-btn>
            <v-card
                v-if="Pokemon" 
                class="mx-auto"
                max-width="350">

                <v-img
                    id="pokemon"
                    :src="sprite"
                    height="200px"
                    width="200px">
                </v-img>
                <v-card-title>
                    {{Pokemon.name.toUpperCase()}}
                </v-card-title>
                <v-card-subtitle v-if="typeNames.length >1">
                    Types: {{typeNames[0].toUpperCase()}} / {{typeNames[1].toUpperCase()}}
                </v-card-subtitle>
                <v-card-subtitle v-else>
                    Type: {{typeNames[0].toUpperCase()}}
                </v-card-subtitle>

                <v-spacer></v-spacer>
                
                <v-card-actions>
                    <v-btn
                        icon
                        @click="show = !show">
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <v-card-subtitle>Base Stats:</v-card-subtitle>
                        <v-card-text v-for="(stat,index) in stats" :key="index">
                            <p>
                                {{stat.stat.name.toUpperCase()}}
                            </p>
                            <v-progress-linear
                                color="indigo darken-4"
                                rounded
                                :value="stat.base_stat"
                                >
                            </v-progress-linear>
                            <p>
                                {{stat.base_stat}}
                            </p>
                        </v-card-text>
                    </div>
                </v-expand-transition>    
            </v-card>
            <v-footer app>
                <v-col 
                    class="text-center"
                    cols="12">
                        Desenvolvido com <v-icon color="red">mdi-heart</v-icon>
                </v-col>
            </v-footer> 
        </div>
        
    </v-container> 
</template>

<script>
/* eslint-disable */
import DataPokemonService from '../services/PokemonService';
import { mdiPokeball } from '@mdi/js';

export default {
    name: 'Pokedex',
    components: {
        'mdi-pokeball' : mdiPokeball,
    },
    data(){
        return {
            name: "",
            Pokemon: null,
            sprite: null,
            types:[],
            typeNames:[],
            stats: [],
            show: false
        }
    },
    methods: {

        getPokemonByName(){
             if(this.typeNames){
                this.typeNames = [];
                this.show = false;
                DataPokemonService.getPokemonByName(this.name.toLowerCase()).then( res => {
                this.Pokemon = res.data;
                console.log(this.Pokemon);
                this.sprite = this.Pokemon.sprites.front_default;
                this.types = this.Pokemon.types;
                console.log(this.types);
                this.types.forEach(type => {
                this.typeNames.push(type.type.name);
                })
                    console.log(this.typeNames);
                    this.stats = this.Pokemon.stats;
                    console.log(this.stats);
                    this.name = "";
                });
            }
        
        },

        clearSearch(){
            this.name = "";
            this.Pokemon = null;
            this.show = false;
        }
    }
}
</script>

<style scoped>

.container {
    justify-content: center;
}

#pokeball {
    
    width: 30px;
    height: 30px;
    margin-left: 30px ;
    
}

#search-button {
    margin-left: 10px;
    margin-bottom: 50px;
}

#clear-search-button{
    margin-left: 10px;
    margin-bottom: 50px;
}

#stats {
    margin-top: 10px;
}

.stats {
  list-style-type: none;
  margin-top: 10px;
  margin-right: 200px;
}

#pokemon{
    margin-left: 25px;
    
}
</style>
