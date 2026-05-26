

import RootLayout from './Components/RootLayout'
import HomePage from './Pages/HomePage'
import UsersPage from './Pages/UsersPage'
import LoginPage from './Pages/LoginPage'
import AdminPage from './Pages/AdminPage'
import PrivateRoute from './Components/PrivateRoute'

import {
     createRootRoute,
     createRoute,
     createRouter,
     createBrowserHistory } from "@tanstack/react-router";  

const rootRoute = createRootRoute({
    component: RootLayout,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
})

const usersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/users',
    component: UsersPage,
})

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: () => (
        <PrivateRoute>
            <AdminPage />
        </PrivateRoute>
    ),
})

rootRoute.addChildren([homeRoute, loginRoute, usersRoute, adminRoute])


const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;
