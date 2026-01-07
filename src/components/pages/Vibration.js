import React, { useContext, useEffect, useState } from 'react'
import { DContext } from '../../context/Datacontext'

export const Vibration = () => {
    const { BeURL, currentUser } = useContext(DContext)
    console.log("currentUser90", currentUser)

    const [vibrationHistory, setVibrationHistory] = useState([])

    useEffect(() => {
        if (BeURL) {
            fetch(`${BeURL}/fetchVibration/${currentUser.id}`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setVibrationHistory(data.patientVibration)
                    }
                    else
                        alert(data.message)
                })
        }
    }, [BeURL, currentUser])


    return (
        <div>
            {/* Scrollable Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md max-h-72 overflow-y-auto">
                <div className="">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-teal-500 text-white sticky top-0 z-10">
                            <tr>
                                <th className="p-3 whitespace-nowrap border">Session Id</th>
                                <th className="p-3 whitespace-nowrap border">Date</th>
                                <th className="p-3 whitespace-nowrap border">Duration</th>
                                <th className="p-3 whitespace-nowrap border">Average Temperature</th>

                            </tr>
                        </thead>
                        <tbody>
                            {vibrationHistory?.length > 0 ? vibrationHistory.map((vib, idx) => (
                                <tr
                                    key={vib.sessionId}
                                    className="hover:bg-teal-50 transition border-b border-slate-100 font-semibold"
                                >
                                    <td className="p-3 text-center whitespace-nowrap border">{vib.SessionId}</td>

                                    <td className="p-3 whitespace-nowrap border text-center capitalize">{new Date(vib.Date).toLocaleDateString() || '-'}</td>
                                    <td className="p-3 whitespace-nowrap border text-center">{vib?.Duration ? `${vib?.duration}m` : '-'}</td>
                                    <td className="p-3 whitespace-nowrap border text-center">{`${vib.AverageTemp}°C` || '-'}</td>

                                </tr>
                            )) : <tr><td colSpan="9" className="text-center p-4">No Patient Vibration History found</td></tr>}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
