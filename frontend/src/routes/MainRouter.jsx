import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Store2 from '../pages/operation/Store2';

// Operation
import UserManagementPage from '../pages/UserManagementPage';
import StoreManagementPage from '../pages/operation/StoreManagementPage';

//Product
import MaterialManagementPage from '../pages/Product/MaterialManagementPage';
import BomManagementPage from '../pages/Product/BomManagementPage';
import ProductManagementPage from "../pages/Product/ProductManagementPage";

// Inventory
import BranchInventoryPage from '../pages/inventory/BranchInventoryPage';
import StoreInventoryPage from '../pages/inventory/StoreInventoryPage';

// Supply
import SupplyRequestPage from '../pages/supply/SupplyRequestPage';
import DeliveryInstructionPage from '../pages/supply/DeliveryInstructionPage';
import DeliveryProcessPage from '../pages/supply/DeliveryProcessPage';

// Other main pages
import ManufacturingPage from '../pages/ManufacturingPage';
import QualityPage from '../pages/QualityPage';
import SalesPage from '../pages/SalesPage';
import SettlementPage from '../pages/SettlementPage';

const MainRouter = () => {
  return (
    <Routes>
      {/* Operation Routes */}
      <Route path="/operation/store" element={<StoreManagementPage />} />
      <Route path="/operation/user" element={<UserManagementPage />} />

      {/* Product Routes */}
      <Route path="/Product/material" element={<MaterialManagementPage />} />
      <Route path="/Product/bom" element={<BomManagementPage />} />
      <Route path="/Product/product" element={<ProductManagementPage />} />

      {/* Inventory Routes */}
      <Route path="/inventory/branch" element={<BranchInventoryPage />} />
      <Route path="/inventory/store" element={<StoreInventoryPage />} />

      {/* Supply Routes */}
      <Route path="/supply/request" element={<SupplyRequestPage />} />
      <Route path="/supply/delivery" element={<DeliveryInstructionPage />} />
      <Route path="/supply/process" element={<DeliveryProcessPage />} />

      {/* Main Menu Routes */}
      <Route path="/manufacturing" element={<ManufacturingPage />} />
      <Route path="/quality" element={<QualityPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/settlement" element={<SettlementPage />} />

      {/* Default Route */}
      <Route path="/" element={<HomePage />} />
      <Route path="/user-management" element={<UserManagementPage />} />
      <Route path="/store2" element={<Store2 />} />
    </Routes>
  );
};

export default MainRouter; 