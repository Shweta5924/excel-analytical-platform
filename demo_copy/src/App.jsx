import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/UserLogin';

import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FileList from "./pages/FileList";
import Analysis from "./pages/Analysis";
import Profile from "./pages/Profile";
import Navbar from './pages/Navbar';
import { Navigate } from "react-router-dom";
import RoleSelection from './pages/RoleSelection';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import Upload from './pages/Upload';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Logo from './pages/Logo';
import Analyze from './pages/Analyze';
import AdminDashboard from './pages/AdminDashboard';
import AllFilesPage from './pages/AllFilesPage';
import UsersPage from './pages/UsersPage';
import Analytics from './pages/Analytics';
import AdminPermissions from './pages/AdminPermissions';
import RegisterAdmin from './pages/RegisterAdmin';
import SuperadminDashboard from './pages/SuperadminDashboard';
import SuperadminLogin from './pages/SuperadminLogin';
import AdminsPage from './pages/AdminsPage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);





function App() {
  


// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// }
// function RoleProtectedRoute({ children, requiredRole }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;

//   return role === requiredRole ? children : <Navigate to="/" />;
// }
 function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin-login" />;
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("superadminToken");
  return token ? children : <Navigate to="/superadmin-login" />;
}


// export default ProtectedRoute;

  return (
    

<Router>
  {/* <div>
    
    <Nav></Nav> 
  </div> */}
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
       
            <Route
  path="/admin-dashboard"
  element={
    <AdminProtectedRoute >
      {/* <Dashboard /> */}
     <AdminDashboard />
    </AdminProtectedRoute>
  }
/>
<Route path="/users" element={<UsersPage />} />
<Route path="/all_files" element={<AllFilesPage />} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/files" element={<FileList />} />
        <Route path="/analysis/:id" element={<Analysis />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/superadmin" element={ <ProtectedRoute>
              <SuperadminDashboard />
            </ProtectedRoute>} />
<Route path="/register-admin" element={<RegisterAdmin />} />
{/* <Route path="/admin-permissions" element={<AdminPermissions />} /> */}
{/* <Route path="/analytics" element={<Analytics />} /> */}
<Route path="/superadmin-login" element={<SuperadminLogin />} />


<Route path="/superadmin/admins" element={<ProtectedRoute><AdminsPage /></ProtectedRoute>} />
<Route path="/superadmin/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
<Route path="/superadmin/files" element={<ProtectedRoute><AllFilesPage /></ProtectedRoute>} />
       
      </Routes>
      
    </Router>

  );


}

export default App
