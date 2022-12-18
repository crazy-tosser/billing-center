import Axios from 'axios'

// Ссылка на api находится в файле .env в корне проекта
const api_location = process.env.VUE_APP_API_LOCATION


const instanse = Axios.create({
	baseURL: api_location,
	headers: {
		"Content-type": "application/json"
	},
	withCredentials: false
})

export default instanse