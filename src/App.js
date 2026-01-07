import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import Home from './components/pages/Dashboard';
import Header from './components/blocks/Header';
import { PatientChart } from './components/pages/PatientChart';
import { Alert } from './components/pages/Alert';
import { Session } from './components/pages/Session';
import NotFound from './components/pages/NotFound';


function App() {

  const { isAuth, currentUser } = useContext(DContext)

//   if(isAuth===null || !currentUser){
//     return <LoadingPage/>
//   }

  return (
    <div className="container-fluid p-0">
      <Header />
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path='/register' element={isAuth ? <Home /> : <Register />} />
        <Route path='/test' element={<LoadingPage />} />
        <Route path='/patient-chart' element={<PatientChart />} />
        <Route path='/alert' element={<Alert />} />
        <Route path='/session' element={<Session />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
