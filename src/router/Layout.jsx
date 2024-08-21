import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import {AuthProvider} from "../context/AuthContext";
import FooterBar from "../components/FooterBar";
import NavMenu from "../components/NavMenu";


function Layout() {
    return (
        <AuthProvider>
            <div className="hero is-info is-fullheight is-flex is-flex-direction-column">
                <NavBar appName={"InfoShare"}/>
                <NavMenu/>
                <Outlet/>
                <FooterBar 
                appName={"InfoShare"}
                
                />

            </div>

        </AuthProvider>
    );
}
export default Layout;