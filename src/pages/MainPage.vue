<template>
    <div>
        <v-row v-if="loading" class="d-flex justify-space-around mt-15" >
            <div class="d-flex flex-column" >
                
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>

                    <span>Загрузка...</span>
            </div>
        </v-row>
        <v-row v-else
            class="d-flex justify-space-around mt-15"
        >
          
                <v-col v-for="country, key in countries"
                    :key="key"
                    class="ma-5"
                > 
                    <country-card
                        :name="country.name.common"
                        :capital="country.capitalNormal"
                        :flagUrl="country.flags.png"
                        :population="country.population"
                        :region="country.region"
                        @onEdit="edit(key)"
                    ></country-card>
                </v-col>
           
        </v-row>
    </div>
</template>

<script lang="ts">
import CountryCard from '@/components/CountryCard.vue'

import Vue from 'vue'
import { CountryActions } from '@/store/types'
import store from '@/store'
import { TCountry } from '@/models/Country'


export default Vue.extend({
    name: "MainPage",
    components:{ CountryCard, },
    data: () => ({
        loading: false, // loader для загрузки стран
        //
    }),
    mounted(){
        this.init()
    },
    computed:{
        countries: ():TCountry[] => store.getters.getCountries
    },
    methods:{
        init(){
            if (this.countries.length == 0){ // не обновлять список стран если они уже подгружены
                this.loading = true
                store.dispatch(CountryActions.GET_COUNTRIES)
                    .finally(() => {this.loading = false})
            }
        },
        edit(id: number){
            this.$router.push(`/edit/${id}`)
        }
    }
})


</script>
