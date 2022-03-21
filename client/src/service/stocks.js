import axios from "axios";
import auth from "./users";

export async function editStocks(stock) {
    try {
        const res = await axios.put(
            "/api/stocks/" + stock.id, { quantity: stock.quantity }, {
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

export async function deleteStocks(stock_id) {
    try {
        const res = await axios.delete("/api/stocks/" + stock_id, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        });
        return res;
    } catch (error) {
        return error;
    }
}

export async function getStocks(product_id) {
    try {
        const res = await axios.get("/api/stocks?productId=" + product_id, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        });
        return res.data.sizes;
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