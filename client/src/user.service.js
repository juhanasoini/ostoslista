import axios from 'axios'
export default {
    isLoggedIn: async () => {
        let res = await axios( {
        	url: '/api/user/isloggedin',
        	withCredentials: true
    	});
        return typeof res.data.error === 'undefined';
    }

}
