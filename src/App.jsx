import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardView } from './components/views/DashboardView';
import { POSView } from './components/views/pos/POSView';
import { InventoryView } from './components/views/InventoryView';
import { SalesHistoryView } from './components/views/SalesHistoryView';
import { SettingsView } from './components/views/SettingsView';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/pos" element={<POSView />} />
          <Route path="/inventory" element={<InventoryView />} />
          <Route path="/history" element={<SalesHistoryView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
