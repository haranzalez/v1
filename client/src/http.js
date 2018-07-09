
import axios from 'axios'
import store from './store/index'

export default () => {
    return {
        local: axios.create({
            baseUrl: store.state.baseUrl,
            timeout: 5000,
        }),
        out: axios.create({
            timeout: 5000,
        })
    }
}