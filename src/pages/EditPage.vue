<template>
    <v-card class="mt-15 mx-auto elevation-7" max-width="700px">
        <v-card-title class="grey lighten-4"><span>Изменение информации о стране</span></v-card-title>
        <v-card-text  class="" >
            <v-form v-if="countryEdit"
                ref="form"
                v-model="valid"
                lazy-validation
            > 
                <v-row>
                    <v-col cols="8" class="mx-auto my-10">
                        <v-text-field
                            
                            v-model="countryEdit.name.common"
                            :rules="rulesText"
                            label="Наименование страны"
                            required
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="countryEdit.capitalNormal"
                            :rules="rulesText"
                            label="Столица"
                            required
                            outlined
                        ></v-text-field>
                        <v-select
                            v-model="countryEdit.region"
                            :items="regionItems"
                            :rules="rulesText"
                            label="Регион"
                            required
                            outlined
                        ></v-select>
                        <v-text-field
                            v-model="countryEdit.population"
                            :rules="rulesDigit"
                            label="Население"
                            type="number"
                            required
                            outlined
                        ></v-text-field>
                        <div class="d-flex justify-space-between">
                            <v-btn width="200px" @click="save()" color="primary" :disabled="!valid">Сохранить</v-btn>
                            <v-btn width="200px" outlined @click="cancel()">Отмена</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-dialog
            v-model="modal"
            persistent
            max-width="350"
            >
            
            <v-card >
                <v-card-title class="text-h5">
                    Сообщение
                </v-card-title>
                <v-card-text>Информация сохранена</v-card-text>
                <v-card-actions>
                
                <router-link v-slot="{ navigate }" custom to="/"  style="cursor: pointer">
                    <v-btn
                        color="primary"
                        role="link"
                        @click="navigate"
                    >
                    К списку стран
                    </v-btn>
                   
                </router-link>
                <v-spacer></v-spacer>
                <v-btn
                   
                    text
                    @click="modal = false"
                >
                    Закрыть
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </v-card>
  
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store/index'
import { TCountry, Region } from '@/models/Country'
import { CountryMutations } from '@/store/types'

export default Vue.extend({
    name: "EditPage",
    props:{
        id: {
            type: String, // параметр из адресной строки по этому тип строка
            required: true
        },
    },
    data: () => ({
        countryEdit: <TCountry|null>null,
        modal: false,
        valid: true,
        rulesText: [
            (v: string) => !!v || 'Поле обязательно для заполнения',
        ],
        rulesDigit: [
            (v: string) => !!v || 'Поле обязательно для заполнения',
            (v: string) => /^\d+$/.test(v) || 'Только цифры',
        ], // это не правильно, надо вообще запретить вводить не цифры
        
    }),
    created(){
        this.init()
    },
    computed:{
        regionItems: () => Object.values(Region),
    },
    methods: {
        init(){
            //проверить при старте входящий параметр на число и если id страны нет то редирект на 404
            if (!/^\d+$/.test(String(this.id))){
                this.$router.replace('/404')
            }
            // и если id страны нет то редирект на 404
            else if  (parseInt(this.id)<0 || parseInt(this.id)>=store.getters.getCountries.length){
                this.$router.replace('/404')
            } 
            else  this.countryEdit = store.getters.getCountry(parseInt(this.id))
        },
        cancel(){
            this.countryEdit = null
            this.$router.push('/')
        },
        save(){
            if((this.$refs.form as Vue & { validate: () => boolean }).validate() && this.countryEdit ) {
                this.countryEdit.population = parseInt(String(this.countryEdit.population))
                store.commit(CountryMutations.UPD_COUNTRY, {id: parseInt(this.id), country: this.countryEdit})
                this.modal = true
            }
           
        },
        
    }


})
</script>

<style>

</style>