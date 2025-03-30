import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Navbar from './components/custom/Navbar'
import Menu from './pages/Menu'
import Feedback from './pages/Feedback'
import Orders from './pages/Orders'
import PaymentSuccess from './components/custom/PaymentSuccess'
import PaymentCanceled from './components/custom/PaymentCanceled'

function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCanceled />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      } />
    </Routes>
  )
}