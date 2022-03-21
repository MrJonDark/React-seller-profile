import axios from "axios";
import { Store } from "./../components/layout/store";
import auth from "./users";
import jwtDecode from "jwt-decode";

export async function createStore(seller) {
    try {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        };

        const res = axios.post("/api/sellers/create", seller.store, options);
        return res;
    } catch (error) {
        return error;
    }
}

export async function getStore() {

    if (jwtDecode(sessionStorage.getItem("data")).seller.id != undefined) {
        var seller = jwtDecode(sessionStorage.getItem("data")).seller.id;

    } else {
        var seller = auth.getData().seller.id;

    }

    const res = await axios.get(
            "/api/sellers?sellerId=" + seller, {
                headers: {
                    Authorization: auth.currentUser(), //the token is a variable which holds the token
                },
            }
        ).then(res => {
            return res.data.seller.data
        })
        .catch(error => {

            if (error.response.status == 500) {

                window.location = '/logout'


            } else {
                window.location = '/logout'

            }
        });
    return res
}
export async function editStoreInfo(store) {
    const EditedStore = store.store_info;
    const seller = auth.getData().seller.id;
    try {
        const res = await axios.put("/api/sellers/update_info?sellerId=" + seller, EditedStore, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        });
        return res;
    } catch (error) {
        return error;
    }
}
export async function updateCover(src) {
    const seller = auth.getData().seller.id;
    const update = { sellerId: seller, cover: src };
    try {
        const res = await axios.put("/api/sellers/update_cover", update, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        });
        return res;
    } catch (error) {
        return error;
    }
}
export async function updateLogo(src) {
    const seller = auth.getData().seller.id;
    const update = { sellerId: seller, logo: src };

    try {
        const res = await axios.put("/api/sellers/update_logo", update, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        });
        return res;
    } catch (error) {
        return error;
    }
}
export async function changeState(status) {
    const seller = auth.getData().seller.id;

    try {
        const res = await axios.put("/api/sellers/update_status?sellerId=" + seller, { 'status': status }, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        });
        return res;
    } catch (error) {
        return error;
    }
}