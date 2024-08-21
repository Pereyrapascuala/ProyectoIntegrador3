import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import Login from "../components/Login"
import Home from "../components/Home";


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
        ]
    },
    {
        path:"*",
        element: <h1>Not Found</h1>
    }
])

export {Router};
