import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import GroupPage from "../pages/GroupPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TaskPage from "../pages/TaskPage";

export default function AppRoutes(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute />}>
                        
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/groups" element={<GroupPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/tasks" element={<TaskPage />} />

                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}