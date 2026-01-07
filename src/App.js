import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import DoctorDashboard from './components/pages/DoctorDashboard';
import Header from './components/blocks/Header';
import NotFound from './components/pages/NotFound';
import PatientDashboard from './components/pages/PatientDashboard';


function App() {

  const { isAuth, currentUser } = useContext(DContext)

  if (isAuth === null || !currentUser) {
    return <LoadingPage />
  }

  const renderHomepage = () => {
    if(isAuth){
      if(currentUser.role === 'doctor'){
        return <DoctorDashboard />
      }
      else if(currentUser.role === 'patient'){
        return <PatientDashboard/>
      }
    }
    return <Login />
  }

  return (
    <div className="container-fluid p-0">
      <Header />
      <Routes>
        <Route path="/" element={renderHomepage()} />
        <Route path="/login" element={renderHomepage()} />
        <Route path='/register' element={renderHomepage()} />
        <Route path='*' element={<NotFound/>} />
      </Routes>

    </div>
  );
}

export default App;
