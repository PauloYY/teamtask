import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}