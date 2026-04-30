import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ComplianceDashboard from './pages/ComplianceDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">This CDE module is currently secured and requires additional MFA verification to view. Validating compliance state...</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<ComplianceDashboard />} />
          <Route path="/network" element={<Placeholder name="CDE Network Segmentation Map" />} />
          <Route path="/tokenize" element={<Placeholder name="Tokenization Engine Settings" />} />
          <Route path="/encryption" element={<Placeholder name="KMS & Encryption at Rest" />} />
          <Route path="/access" element={<Placeholder name="RBAC & Identity Access Policies" />} />
          <Route path="/audit" element={<Placeholder name="Centralized Audit Logging" />} />
          <Route path="/controls" element={<Placeholder name="PCI-DSS v4.0 Control Matrix" />} />
          <Route path="/settings" element={<Placeholder name="Environment & CDE Settings" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
