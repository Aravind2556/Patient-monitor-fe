import React, { useContext, useEffect, useState } from 'react'
import { DContext } from '../../context/Datacontext';
import { deletePatient, editPatientList, fetchAllPatients, fetchPatient } from '../../services/fetchPatients';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { renderCapitalize } from '../../utils/renderCaptilize,js';
import PatientRegister from './PatientRegister';
import { HiDownload } from "react-icons/hi";
import { vibrationDownload } from '../../services/Download';
import LoadingPage from './Loading';


function DoctorHomePage() {
  const { BeURL, currentUser, isAuth } = useContext(DContext);
  const [allPatients, setAllPatient] = useState([])
  const [viewPatient, setViewPatient] = useState(false)
  const [showpatient, setShowPatient] = useState(false)
  const [editPatient, setEditPatient] = useState(null)


  // Edit  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [comparePassword, setComparePassword] = useState(true)

  const handleEdit = async (id) => {

    setComparePassword(password === confirmPassword)

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await editPatientList({ BeURL, editPatient, id, setEditPatient })

  }

  useEffect(() => {
    if (BeURL && isAuth === true && currentUser?.role === 'doctor') {
      fetchAllPatients({ BeURL, setAllPatient })
    }
  }, [BeURL, isAuth, currentUser?.role])


  const viewPatients = async (id) => {
    setViewPatient(false)
    setShowPatient(true)

    await fetchPatient({ BeURL, setEditPatient, id })
  }


  const EditPatient = async (id) => {
    await fetchPatient({ BeURL, setEditPatient, id })
    setViewPatient(false)
    setShowPatient(false)
  }

  const handleDelete = async (id) => {
    await deletePatient({ BeURL, id })
  }


  // Download Vibration
  const VibratioDownload = async (id,type) => {
    await vibrationDownload({ BeURL, id ,type })
  }

  // Download Heat Therapy
  const HeatTherapyDownload = async (id) => {
    await vibrationDownload({ BeURL, id, type: 'heat' })
  }

  if (isAuth == null || currentUser == null) return <LoadingPage />

  return (

    <div className='min-h-[80vh] space-y-4 mt-3 px-4 md:px-10'>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">All Patients</h2>

      <div className=' p-4 mb-6'>
        <div className='flex flex-col gap-3'>

          {/* Time Filter Buttons & Date Range */}

          {/* Search & Create */}
          <div className='flex flex-col md:flex-row justify-end items-stretch md:items-center gap-3'>
            {/* Search Section */}


            <button
              onClick={() => setViewPatient(true)}
              className='px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto'
            >
              <svg className='w-5 h-5' fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Patient
            </button>

          </div>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <div className="">
          <table className="min-w-full border-collapse">
            <thead className="bg-teal-500 text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 whitespace-nowrap border">S.No</th>
                <th className="p-3 whitespace-nowrap border">Patient Name</th>
                <th className="p-3 whitespace-nowrap border">Contact</th>
                <th className="p-3 whitespace-nowrap border">Email</th>
                <th className="p-3 whitespace-nowrap border">Age</th>

                <th className="p-3 whitespace-nowrap border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPatients?.length > 0 ? allPatients.map((pat, idx) => (
                <tr
                  key={pat._id}
                  className="hover:bg-teal-50 transition border-b border-slate-100 font-semibold"
                >
                  <td className="p-3 text-center whitespace-nowrap border">{idx + 1}</td>

                  <td className="p-3 whitespace-nowrap border text-center capitalize">{pat.fullname || '-'}</td>
                  <td className="p-3 whitespace-nowrap border text-center">{pat.contact || '-'}</td>
                  <td className="p-3 whitespace-nowrap border text-center">{pat.email || '-'}</td>
                  <td className="p-3 whitespace-nowrap border text-center">{pat.age || '-'}</td>

                  <td className="p-3 flex gap-3 whitespace-nowrap justify-center items-center">
                    <FaEye
                      className="text-teal-600 text-lg cursor-pointer"
                      title="View Job"
                      onClick={() => viewPatients(pat._id)}
                    />
                    <FaRegEdit
                      className="text-lg text-blue-500 cursor-pointer"
                      title="Edit Job"
                      onClick={() => EditPatient(pat._id)}
                    />
                    {['doctor'].includes(currentUser?.role) && (
                      <MdOutlineDeleteOutline
                        className="text-lg text-red-500 cursor-pointer"
                        title="Delete Job"
                        onClick={() => handleDelete(pat._id)}
                      />
                    )}
                    <button
                      onClick={() => VibratioDownload(pat.id , 'compress')}
                      className='flex items-center justify-center px-2 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-700 hover:to-sky-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95  gap-2 w-full md:w-auto'
                    >
                      <HiDownload className='text-base' />
                      Compression</button>

                    <button
                      onClick={() => HeatTherapyDownload(pat.id)}
                      className='flex items-center justify-center px-2 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-700 hover:to-sky-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95  gap-2 w-full md:w-auto'
                    >
                      <HiDownload className='text-base' />
                      Heat Therapy</button>

                    <button
                      onClick={() => VibratioDownload(pat.id)}
                      className='flex items-center justify-center px-2 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-700 hover:to-sky-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95  gap-2 w-full md:w-auto'
                    >
                      <HiDownload className='text-base' />
                      Vibration</button>

                  </td>
                </tr>
              )) : <tr><td colSpan="9" className="text-center p-4">No Patient found</td></tr>}

            </tbody>
          </table>
        </div>
      </div>



      {
        viewPatient && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 relative'>
              <h2 className='text-2xl font-bold mb-4 text-center text-blue-700'>Patient Details</h2>
              <button
                className="absolute top-2 right-2 hover:text-black text-4xl text-teal-600"
                onClick={() => setViewPatient(false)}
              >
                &times;
              </button>
              <div className='text-slate-950 bg-white m-3 p-5 w-full rounded border-[1px] border-primary-500'>
                <PatientRegister />
              </div>
            </div>
          </div>
        )}

      {
        showpatient && editPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            {/* Modal */}
            <div className="relative w-11/12 max-w-md rounded-xl bg-white shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-blue-700">
                  Patient Details
                </h2>
                <button
                  onClick={() => { setShowPatient(false); setEditPatient(null) }}
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              {/* Body */}
              <div className="space-y-3 px-6 py-5 text-gray-700">

                <div className="flex justify-between rounded-md bg-gray-50 px-4 py-2">
                  <span className="font-medium text-gray-600">Full Name</span>
                  <span className="text-gray-900">{editPatient.fullname}</span>
                </div>

                <div className="flex justify-between rounded-md bg-gray-50 px-4 py-2">
                  <span className="font-medium text-gray-600">Contact</span>
                  <span className="text-gray-900">{editPatient.contact}</span>
                </div>

                <div className="flex justify-between rounded-md bg-gray-50 px-4 py-2">
                  <span className="font-medium text-gray-600">Email</span>
                  <span className="text-gray-900 break-all">{editPatient.email}</span>
                </div>

                <div className="flex justify-between rounded-md bg-gray-50 px-4 py-2">
                  <span className="font-medium text-gray-600">Age</span>
                  <span className="text-gray-900">{editPatient.age}</span>
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end border-t px-6 py-3">
                <button
                  onClick={() => { setShowPatient(false); setEditPatient(null) }}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )
      }



      {
        editPatient && !showpatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="relative w-11/12 max-w-lg rounded-xl bg-white shadow-xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-blue-700">
                  Edit Patient Details
                </h2>
                <button
                  onClick={() => setEditPatient(null)}
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              {/* Form */}
              <form className="space-y-4 px-6 py-5">

                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={editPatient.fullname}
                    onChange={e =>
                      setEditPatient(prev => ({ ...prev, fullname: e.target.value }))
                    }
                    className="w-full rounded-md border px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Contact</label>
                  <input
                    type="text"
                    value={editPatient.contact}
                    onChange={e =>
                      setEditPatient(prev => ({ ...prev, contact: e.target.value }))
                    }
                    className="w-full rounded-md border px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={editPatient.email}
                    onChange={e =>
                      setEditPatient(prev => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full rounded-md border px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Age</label>
                  <input
                    type="number"
                    value={editPatient.age}
                    onChange={e =>
                      setEditPatient(prev => ({ ...prev, age: e.target.value }))
                    }
                    className="w-full rounded-md border px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <select
                    value={editPatient.gender}
                    onChange={e =>
                      setEditPatient(prev => ({ ...prev, gender: e.target.value }))
                    }
                    className="w-full rounded-md border px-3 py-2 mt-1 bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>


                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 mt-1"
                  />
                </div>

                {!comparePassword && (
                  <p className="rounded bg-red-100 px-3 py-1 text-sm text-red-600">
                    Passwords do not match
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleEdit(editPatient._id)}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>

              </form>
            </div>
          </div>
        )
      }

    </div>

  )
}

export default DoctorHomePage