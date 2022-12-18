import { TCountry } from "@/models/Country"

export interface CountryState {
    countries: TCountry[], // массив всех стран
    error: string,        // запишем ошибку если не удалось получить список стран
}


//Mutation types
export enum CountryMutations {
	SET_COUNTRIES = "SET_COUNTRIES",
    UPD_COUNTRY = "UPD_COUNTRY",
    SET_ERROR = "SET_ERROR",
    CLEAR_ERROR = "CLEAR_ERROR",
}

//actions type
export enum CountryActions {
	GET_COUNTRIES = "GET_COUNTRIES",
}