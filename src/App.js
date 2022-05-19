import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';

import MainHeader from './components/header/MainHeader';
import Footer from './components/footer/Footer';
import Spinner from './components/UI/Spinner';

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import './App.css';

// import About from './pages/About';
// import Cars from './pages/Cars';
// import ClientsCars from './pages/ClientsCars';
// import Reservation from './pages/Reservation';
// import Contact from './pages/Contact';
// import Profile from './pages/Profile';
// import Signin from './pages/Signin';
// import Signup from './pages/Signup';
// import Logout from './pages/Logout';
// import Jobs from './pages/Jobs';
// import HelpCenter from './pages/HelpCenter';
// import Favourite from './pages/Favourite';
// import SellCar from './pages/SellCar';
// import Privacy from './pages/Privacy';

const About = lazy(() => import('./pages/About'));
const Cars = lazy(() => import('./pages/Cars'));
const ClientsCars = lazy(() => import('./pages/ClientsCars'));
const Reservation = lazy(() => import('./pages/Reservation'));
const Contact = lazy(() => import('./pages/Contact'));
const Profile = lazy(() => import('./pages/Profile'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Logout = lazy(() => import('./pages/Logout'));
const Jobs = lazy(() => import('./pages/Jobs'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Favourite = lazy(() => import('./pages/Favourite'));
const SellCar = lazy(() => import('./pages/SellCar'));
const Privacy = lazy(() => import('./pages/Privacy'));





function App() {
  const location = useLocation().pathname;
  return (
    <>
      <MainHeader />
      <Suspense fallback={
        <div className='spinner--container'>
          <Spinner />
        </div>}>
        <Routes>
          <Route path='/' element={<Navigate replace to="/home" />} />
          <Route path='/home/*' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contactUs' element={<Contact />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/contact/helpCenter' element={<HelpCenter />} />
          <Route path='/contact/Privacy' element={<Privacy />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/clients-cars' element={<ClientsCars />} />
          <Route path='/cars/:carId' element={<Reservation />} />
          <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/sellCar' element={<SellCar />} />
        </Routes>
      </Suspense>
      {location !== '/home' && <Footer />}

      <div className='spinner--container'>
        <Spinner />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme='dark'
        transition={Slide}
      />
    </>
  );
}

export default App;
