import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Sidebar from './components/custom/Sidebar'
import Menu from './pages/Menu'
import ViewFeedback from './pages/ViewFeedback'
import Announcement from './pages/Announcement'
import AddItems from './pages/AddItems'


function Layout() {
  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/menu' element={<Menu />}/>
          <Route path='/additems' element={<AddItems />} />
          <Route path='/viewfeedback' element={<ViewFeedback />}/>
          <Route path='/announcement' element={<Announcement />}/>
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