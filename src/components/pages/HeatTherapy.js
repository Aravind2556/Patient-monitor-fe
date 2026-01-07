import React, { useContext, useEffect, useState } from 'react'
import { DContext } from '../../context/Datacontext'
import { vibrationDownload } from '../../services/Download'

export const HeatTherapy = () => {
    const { BeURL, currentUser } = useContext(DContext)
    const [heatTherpyHistory, setHeatTherpyHistory] = useState([])
    useEffect(() => {
        if (BeURL) {
            fetch(`${BeURL}/fetchheattherapy/${currentUser.id}`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setHeatTherpyHistory(data.patientHeatTherpy)
                    }
                })
        }
    }, [BeURL])

    const VibratioDownload = async (id) => {
        await vibrationDownload({ BeURL, id, type: 'heat' })
    }

    return (
        <div>
            {/* Scrollable Table */}
            <div className='flex justify-between items-center font-semibold mb-4'>
                <h2 className='text-xl'>Heat Therapy</h2>
                <button onClick={() => VibratioDownload(currentUser?.id)} className='bg-primary-700 text-white px-4 py-2 rounded-xl'>Download</button>
            </div>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md max-h-72 overflow-y-auto">
                <div className="">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-blue-100 text-primary-600 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 whitespace-nowrap border">Session Id</th>
                                <th className="p-3 whitespace-nowrap border">Date</th>
                                <th className="p-3 whitespace-nowrap border">Duration</th>
                                <th className="p-3 whitespace-nowrap border">Average Temperature</th>

                            </tr>
                        </thead>
                        <tbody>
                            {heatTherpyHistory?.length > 0 ? heatTherpyHistory.map((vib, idx) => (
                                <tr
                                    key={vib.SessionId}
                                    className="hover:bg-gray-50 transition border-b border-slate-100 font-semibold"
                                >
                                    <td className="p-3 text-center whitespace-nowrap border">{vib.SessionId}</td>

                                    <td className="p-3 whitespace-nowrap border text-center capitalize">{new Date(vib.Date).toLocaleDateString() || '-'}</td>
                                    <td className="p-3 whitespace-nowrap border text-center">
                                        {Number.isFinite(vib?.Duration) ? `${vib.Duration} min` : '-'}
                                    </td>

                                    <td className="p-3 whitespace-nowrap border text-center">
                                        {Number.isFinite(vib?.AverageTemp)
                                            ? `${vib.AverageTemp.toFixed(2)}°C`
                                            : '-'}
                                    </td>
                                </tr>
                            )) : <tr><td colSpan="9" className="text-center p-4">No Patient HeatTherapy History found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
