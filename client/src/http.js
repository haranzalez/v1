
import axios from 'axios'
import store from './store/index'

export default () => {
    return {
        local: axios.create({
            baseUrl: store.state.baseUrl,
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${store.state.authentication.credenciales.token}`,
            },
        }),
        out: axios.create({
            timeout: 5000,
        })
    }
}