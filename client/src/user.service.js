export default {
    isLoggedIn: async () => {
        let res = await fetch('/api/user/isloggedin');
        return res.status === 200 || false;
    }

}
