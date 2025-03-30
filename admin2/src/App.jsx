import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/custom/Navbar'


function Layout(){
  return <div>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </main>
  </div>
}

function App() {

  return (
    <Routes>
      <Route path='*' element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
