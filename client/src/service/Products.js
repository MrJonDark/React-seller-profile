import axios from "axios";
import auth from "./users";

export async function getProducts(category) {
    var category_id = ' '
    if (category) {
        category_id = category.attributes.name_en !== 'All' ? category.id : '';
    }

    const res = await axios.get(
            "/api/products?sellerId=" + auth.getData().seller.id + '&subCategoryId=' + category_id, {
                headers: {
                    Authorization: auth.currentUser(), //the token is a variable which holds the token
                },
            }
        )
        .then(res => {

            return res.data.products
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

export async function createProduct(product) {
    const newProdcut = product.product;
    const res = await axios.post(
        "/api/products/new?sellerId=" + auth.getData().seller.id,
        newProdcut, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }
    );
}
export async function EditProduct(product) {
    const newProdcut = product.product;

    const res = await axios.put(
        "/api/products/update?sellerId=" + auth.getData().seller.id,
        newProdcut, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }
    );
}
export async function updateStatus(product) {
    const editedProdcut = product.product

    const res = await axios.put(
        "/api/products/update_status?productId=" + editedProdcut.id, { 'status': editedProdcut.status }, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }
    );
}


export async function getProduct(id) {
    const res = await axios.get("/api/products/" + id, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }).then(res => {
            return res.data.product
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

export async function apiDeleteProduct(id) {
    const res = await axios.delete("/api/products/" + id, {
        headers: {
            Authorization: auth.currentUser(), //the token is a variable which holds the token
        },
    });

    return res;
}

export async function getSizes() {
    const res = await axios.get("/api/sizes", {
        headers: {
            Authorization: auth.currentUser(), //the token is a variable which holds the token
        },
    });

    return res.data.sizes;
}