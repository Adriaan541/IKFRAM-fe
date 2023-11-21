import {createStore} from 'vuex';
import auth from "@/store/authentication/auth";
import cart from '@/store/modules/cart';
import orders from '@/store/modules/orders';
import products from '@/store/modules/products'
import account from "@/store/authentication/account";
import category from "@/store/modules/category";

const store = createStore({
    state() {
        return {
            base_url: "http://localhost:8080/api",
        }
    },
    modules: {
        auth: auth,
        account: account,
        cart: cart,
        category: category,
        orders: orders,
        products: products
    },
    getters: {
        base_url: (state) => {
            return state.base_url;
        },
    },
    actions: {}
})

export default store;
