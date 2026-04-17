import { Navigate, Route, Routes } from 'react-router-dom'
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard.tsx'
import { AppShell } from './components/layout/AppShell.tsx'
import { defaultNavId, pathForNav } from './navigation.ts'
import { BillingPage } from './pages/BillingPage.tsx'
import { CustomersPage } from './pages/CustomersPage.tsx'
import { OverviewPage } from './pages/OverviewPage.tsx'
import { SettingsPage } from './pages/SettingsPage.tsx'
import { SupportPage } from './pages/SupportPage.tsx'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to={pathForNav(defaultNavId)} replace />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={pathForNav(defaultNavId)} replace />} />
      </Route>
    </Routes>
  )
}

export default App
