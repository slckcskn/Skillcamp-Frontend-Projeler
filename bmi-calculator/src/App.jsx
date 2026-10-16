import {Routes, Route, Link} from 'react-router'

import Home from './pages/Home/index.jsx'
import Info from './pages/Info/index.jsx'

import './App.css'

function App() {

  return (
    <div className='items-center justify-content min-h-screen bg-gray-100'>
      <div className='text-center'>
        <nav>
          <ul>
            <Link to="/">
              <button className="m-5 p-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">BMI Hesapla</button>
            </Link>
            <Link to="/bmi-nedir-vucut-kitle-indeksi">
              <button className="m-5 p-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">BMI Nedir?</button>
            </Link>
          </ul>
        </nav>
      </div>

      <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/bmi-nedir-vucut-kitle-indeksi" element={<Info />} />
      </Routes>
      </div>
    </div>
  )
}


export default App
