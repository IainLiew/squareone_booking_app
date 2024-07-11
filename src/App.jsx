import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage';
import Bookings from './pages/Bookings';
import store from './store';


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/booking' element={<Bookings />} />
          <Route path='*' element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}