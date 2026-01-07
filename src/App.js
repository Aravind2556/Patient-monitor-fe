import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import DoctorDashboard from './components/pages/DoctorDashboard';
import Header from './components/blocks/Header';
import { PatientChart } from './components/pages/PatientChart';
import { Alert } from './components/pages/Alert';
import { Session } from './components/pages/Session';
import NotFound from './components/pages/NotFound';
import PatientDashboard from './components/pages/PatientDashboard';
import Layout from './components/blocks/Layout';


function App() {

  const { isAuth, currentUser } = useContext(DContext)

  if(isAuth===null || currentUser == null){
    return <LoadingPage/>
  }

  const renderHomepage = () => {
    if(isAuth){
      if(currentUser.role === 'doctor'){
        return <DoctorDashboard />
      }
      else if(currentUser.role === 'patient'){
        return <Layout><PatientChart /></Layout>
      }
    }
    return <Login />
  }

  const renderPatientRouter = (Component) => {
    if(isAuth && currentUser.role === 'patient'){
      return <Layout><Component /></Layout>
    }
  }

  return (
    <div className="container-fluid p-0">
      { (!isAuth || currentUser?.role === 'doctor') && <Header /> }
      <Routes>
        <Route path="/" element={renderHomepage()} />
        <Route path="/login" element={isAuth ? renderHomepage() : <Login />} />
        <Route path='/register' element={isAuth ? renderHomepage() : <Register />} />
        <Route path='/alerts' element={renderPatientRouter(Alert)} />
        <Route path='/live-therapy' element={renderPatientRouter(Session)} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
