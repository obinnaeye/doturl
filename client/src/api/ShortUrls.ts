import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'
export default class ShortUrls {
    static async getUrls() {
        const response = await axios.get('/urls')
        return response.data
    }

    static async shortenUrl(url: string) {
        return axios.post('/shorten', {url})
            .then(response => {
                return {
                    url: response.data.url, 
                    status: response.status
                }
            })
    }
}
