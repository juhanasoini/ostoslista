import axios from 'axios'
export default {
    isLoggedIn: async () => {
        let res = await axios.get('/api/user/isloggedin');
        return typeof res.data.error === 'undefined';
    }

}
