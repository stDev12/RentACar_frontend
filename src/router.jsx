import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Cars from "./pages/Cars"
import ContactUs from "./pages/ContactUs"
import Header from "./components/Header"
import CarSelected from "./pages/CarSelected"
import NotFound from "./pages/NotFound"
import ShoppingCart from "./pages/ShoppingCart"
import Orders from "./pages/Orders"
import SignUp from "./pages/SignUp"
import UserProfile from "./pages/UserProfile"

const router = createBrowserRouter([
    {
        element: <Header />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/contact', element: <ContactUs /> },
            { path: '/signUp', element: <SignUp /> },
            { path: '/userProfile', element: <UserProfile /> },
            {
                path: '/cars', children: [
                    { index: true, element: <Cars /> },
                    { path: ':id', element: <CarSelected /> }
                ]
            },
            { path: 'cart', element: <ShoppingCart /> },
            { path: 'orders', element: <Orders /> },
            { path: '*', element: <NotFound /> }
        ]
    }
])

export default router;