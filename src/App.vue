<template>
  <v-app>
    <v-main>
      <Pokedex/>
    </v-main>
  </v-app>
</template>

<script>
import Pokedex from './components/Pokedex.vue';

export default {
  name: 'App',

  components: {
    Pokedex,
  },
};
</script>
