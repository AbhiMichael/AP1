import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';
import DataPage from './pages/data';
import FormPage from './pages/form';
import WeatherPage from './pages/weather';
import DynamicPage from './pages/dynamicPage';
import DragDropTasks from './pages/DragDropTasks';
import ProductlistPage from './pages/productlist';
import CartSystemPage from './pages/CartSystem';
import PurchasedPage from './pages/Purchased';
import StepperPage from "./pages/StepperPage";
import LocationForm from "./pages/LocationForm";
import Taskboard from "./pages/Taskboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/dynamicPage" element={<DynamicPage />} />
        <Route path="/DragDropTasks" element={<DragDropTasks />} />
        <Route path="/productlist" element={<ProductlistPage />} />
        <Route path="/cart" element={<CartSystemPage />} />
        <Route path="/Purchased" element={<PurchasedPage />} />
        <Route path="/StepperPage" element={<StepperPage />} />
        <Route path="/location" element={<LocationForm />} />
        <Route path="/Taskboard" element={<Taskboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
