<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-row class="d-flex align-center justify-space-between mx-15" >
        
          <router-link v-slot="{ navigate }" custom to="/" class="text-h4" style="cursor: pointer">
            <span @click="navigate" @keypress.enter="navigate" role="link">Страны мира</span>
          </router-link>
        
          <a href="https://restcountries.com/" class="black--text">https://restcountries.com/</a>
      </v-row>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container class="px-4" >
        <router-view/>
      </v-container>
      
    </v-main>
    <v-snackbar
      v-model="isError"
      timeout="5000"
      color="red accent-2"
    >
      {{ errorText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          
          text
          v-bind="attrs"
          @click="isError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import store from './store';
import { CountryMutations } from './store/types';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    isError: {
			get: () => store.getters.isError,
			set: (val: boolean) => store.commit(CountryMutations.CLEAR_ERROR)
		},
    errorText: () => store.getters.getError,
  },
};
</script>
