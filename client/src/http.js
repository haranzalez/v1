
import axios from 'axios'
import store from './store/index'

export default () => {
    return axios.create({
        baseUrl: store.state.baseUrl,
        timeout: 5000,
    })
}