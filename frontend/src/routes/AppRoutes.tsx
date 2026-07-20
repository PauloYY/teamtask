import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import GroupPage from "../pages/GroupPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TaskPage from "../pages/TaskPage";
import MainLayout from "./MainLayout";

export default function AppRoutes(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                        
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/groups" element={<GroupPage />} />
                            <Route path="/tasks" element={<TaskPage />} />

                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}