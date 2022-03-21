import axios from "axios";
import auth from "./users";
export async function getCategories() {
    const categories = await axios.get(
        "/api/childSubCategories?sellerId=" + auth.getData().seller.id, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }
    );
    return categories.data.childSubCategories;
}

export async function getSubCategories() {
    const categories = await axios.get(
        "/api/subCategories?sellerId=" + auth.getData().seller.id, {
            headers: {
                Authorization: auth.currentUser(), //the token is a variable which holds the token
            },
        }
    );
    return categories.data.subCategories;
}

export function getCategory(categories, id) {
    return categories.find((m) => m.id == id);
}

export async function getCategoriesStores() {
    const categories = await axios.get("/api/categories", {
        headers: {
            Authorization: auth.currentUser(), //the token is a variable which holds the token
        },
    });
    return categories.data.categories;
}