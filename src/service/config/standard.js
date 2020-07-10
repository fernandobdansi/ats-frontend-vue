import axios from 'axios'

const standard = axios.create({
    baseURL: 'http://127.0.0.1:9000/',
    timeout: 100000,
    transformResponse: [
        function (data) {
            return data
        }
    ]
})

export default standard
