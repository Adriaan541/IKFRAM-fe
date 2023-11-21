import {createRouter, createWebHistory} from 'vue-router';
import store from "@/store";
import ProductsList from "@/components/shop/ProductsList";
import LoginComponent from "@/components/account/LoginComponent";
import RegisterComponent from "@/components/account/RegisterComponent";
import AddEditProduct from "@/components/admin/AddEditProduct";
import AddCategory from "@/components/admin/AddCategory";
import AccountComponent from "@/components/account/AccountComponent";
import ProductPage from "@/components/shop/ProductPage";
import HomePage from "@/components/home/HomePage";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/me', component: AccountComponent, beforeEnter: loginGuard },
        { path: '/home', component: HomePage },
        { path: '/shop', component: ProductsList },
        { path: '/shop/:productId', component: ProductPage },
        { path: '/login', component: LoginComponent },
        { path: '/register', component: RegisterComponent },
        { path: '/addproduct', component: AddEditProduct, beforeEnter: adminGuard },
        { path: '/editproduct/:productId', component: AddEditProduct, beforeEnter: adminGuard },
        { path: '/addCategory', component: AddCategory, beforeEnter: adminGuard },
    ]
})

function adminGuard(to, from, next){
    const isAdmin = store.getters['isAdmin'];
    if (isAdmin) {
        next();
    } else {
        next('/home');
    }
}

function loginGuard(to, from, next) {
    const isLoggedIn = store.getters['isLoggedIn'];
    if (isLoggedIn) {
        next();
    } else {
        next('/home');
    }
}

export default router;
