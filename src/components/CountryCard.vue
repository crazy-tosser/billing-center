<template>
    <v-lazy
        v-model="isActive"
        :options="{
          threshold: .9
        }"
        min-height="200"
        transition="fade-transition"
          >
        <v-card
            class="mx-auto elevation-7" 
            max-width="300"
        >
            <v-img
                :src="flagUrl"
                height="200px"
                min-width="300"
                lazy-src="@/assets/placeholder.png"
            ></v-img>

            <v-card-title>
                <v-row class="d-flex align-center justify-space-between ml-1">
                    <span class="d-inline-block text-truncate">{{name}}</span>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon  v-bind="attrs" v-on="on" @click="$emit('onEdit')">
                                <v-icon>mdi-square-edit-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Редактировать</span>
                    </v-tooltip>
                </v-row>
            </v-card-title>

            

            <v-card-text>
            <v-row class="mt-0">
                <v-col ><span class="font-weight-bold">Столица</span></v-col>
                <v-col>{{capital}}</v-col>
            </v-row>
            <v-row class="mt-0">
                <v-col><span class="font-weight-bold">Регион</span></v-col>
                <v-col>{{region}}</v-col>
            </v-row>
            <v-row class="mt-0">
                <v-col><span class="font-weight-bold">Население</span></v-col>
                <v-col>{{population}}</v-col>
            </v-row>
            </v-card-text>

        </v-card>
    </v-lazy>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'


export default Vue.extend({
    name: 'CountryCard',
    props: {
        name: {
            required: true,
            type: String,
        },
        capital:{
            required: true,
            type: String,
        },
        region:{
            required: true,
            type: String
        },
        population:{
            default: 0,
            type: Number
        },
        flagUrl: {
            default: '',
            type: String,
        },
    },
    model: {
		event: 'onEdit'
	},
    data: () => ({
        isActive: false,
    }),

})
</script>

<style>

</style>