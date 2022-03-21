import axios from "axios";
import auth from "./users";

export async function getShipping() {

    const res = await axios.get(
            "/api/seller_cities?sellerId=" + auth.getData().seller.id, {
                headers: {
                    Authorization: auth.currentUser(), //the token is a variable which holds the token
                },
            }
        ).then(res => {
            return res.data.seller_cities
        })
        .catch(error => {
            if (error.response.status == 500) {

                window.location = '/logout'


            } else {
                window.location = '/logout'

            }
        });
    return res;

}


export async function getCities() {
    try {
        const res = await axios.get("/api/cities", {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        });
        return res.data.cities;
    } catch (error) {
        return error;
    }
}

export async function addStocks(stock, product_id) {

    try {
        const res = await axios.post(
            "/api/stocks?productId=" + product_id, {
                productId: product_id,
                sizeId: stock.stock.attributes.size_id,
                quantity: stock.stock.attributes.quantity,
            }, {
                headers: {
                    Authorization: auth.currentUser(), //the token is a variable which holds the token
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
}
export async function createShipping(shipping) {
    const newShipping = shipping.shippingInputs;
    const res = await axios.post(
        "/api/seller_cities?sellerId=" + auth.getData().seller.id,
        newShipping, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }
    );
}

export async function deleteShipping(shipping_id) {
    const res = await axios.delete("/api/seller_cities/" + shipping_id, {
        headers: {
            Authorization: auth.currentUser(), //the token is a variable which holds the token
        },
    });
}

export async function editShipping(shipping) {
    const editedShipping = shipping.shippingInputs;
    const res = await axios.put(
        "/api/seller_cities/" + editedShipping.id,
        editedShipping, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }
    );
}