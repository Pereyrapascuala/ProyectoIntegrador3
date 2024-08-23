import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import Login from "../components/Login"
import Home from "../components/Home";
import { Profile } from "../components/Profile";


const Router = createBrowserRouter([
    {
        element: < Layout/>,
        children: [
            {
                index: "true",
                element: <Home/>,
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
        ]
    },
    {
        path:"*",
        element: <h1>Not Found</h1>
    }
])

export {Router};
