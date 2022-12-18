import Vue from 'vue'
import Vuex from 'vuex'
import { TCountry } from '@/models/Country'
import axios from '@/plugins/axios'
import { CountryState, CountryMutations, CountryActions } from './types'
 
Vue.use(Vuex);


export default new Vuex.Store({
  state: <CountryState>{
            countries: [],
            error: '',
    
          },

	getters:{
    isError: state => state.error !== '',
    getError: state => state.error,
    getCountries: state => state.countries,
    getCountry: state => (i: number) => { return {...state.countries[i]}}, //spread для того чтобы объект из массива скопировался

  },

  mutations:{
    [CountryMutations.SET_COUNTRIES] (state,  data: TCountry[]){
      //перед тем как сохранить нужно отсортировать по country.name.common И склеим все сталицы из массива
      state.countries = data 
                          .sort((a, b) => a.name.common > b.name.common ? 1 : -1)
                          .map(i => {
                            i.capital ? i.capitalNormal = i.capital.join(', ') : i.capitalNormal='Отсутсвует'
                            return i
                          })
    },
    [CountryMutations.UPD_COUNTRY] (state, data){
      state.countries[data.id] = data.country
    },
    [CountryMutations.SET_ERROR] (state, data: string){
      state.error = data
    },
    [CountryMutations.CLEAR_ERROR] (state){
      state.error = ''
    },
  },

  actions:{
    //Получить полный список стран
    async [CountryActions.GET_COUNTRIES] ({commit}) {
      await axios.get<TCountry>('/all')
        .then(response => {
           commit(CountryMutations.SET_COUNTRIES, response.data)
        })
        .catch(error => {
        		commit(CountryMutations.SET_ERROR, error.message)
        		return Promise.reject('Error')
        })
    },
  }
})

