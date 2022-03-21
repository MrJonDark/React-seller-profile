import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtEncode from "jwt-encode";

export async function createUser(user) {

    const res = await axios.post("/api/users/signup", user.SignUp);
    sessionStorage.setItem("token", res.headers.authorization);
    let data = res.data;
    sessionStorage.setItem("data", data);
    return res;

}

export async function Login(user) {
    try {
        const res = await axios.post("/api/users/login", user.signIn);
        let authorization = res.headers.authorization;
        let data = res.data;
        sessionStorage.setItem("token", authorization);
        sessionStorage.setItem("data", data);
        return res;
    } catch (error) {
        return error;
    }
}
export function currentUser() {
    try {
        const token = sessionStorage.getItem("token");
        return token;
    } catch (error) {
        return null;
    }
}
export function getData() {

    return jwtDecode(sessionStorage.getItem("data"));

}
export function getSeller() {
    try {
        const token = sessionStorage.getItem("data");

        return jwtDecode(token).seller;
    } catch (error) {
        return null;
    }
}
export default {
    createUser,
    Login,
    currentUser,
    getData,
    getSeller
};