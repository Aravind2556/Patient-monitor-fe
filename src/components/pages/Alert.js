import React, { useContext, useMemo } from 'react'
import { DContext } from '../../context/Datacontext'
import { Temp, Pressure } from '../../utils/ThinkSpeak'


export const Alert = () => {
    const { recentFieldOne, recentFieldTwo } = useContext(DContext)

    const alerts = useMemo(() => {
        const list = []
        const time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
        
        //Temperature Alert
        if (recentFieldOne && recentFieldOne >= Number(Temp)) {
            list.push({
                time,
                type: 'Over-temp',
                typeColor: 'text-red-600',
                message: `Temp ${recentFieldOne} °C`
            })
        }

        //Pressure Alert
        if (recentFieldTwo && recentFieldTwo >= Number(Pressure)) {
            list.push({
                time,
                type: 'Pressure spike',
                typeColor: 'text-yellow-600',
                message: `Pressure ${recentFieldTwo} mmHg`
            })
        }

        return list
    }, [recentFieldOne, recentFieldTwo])

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full">
            <h2 className="font-semibold text-lg mb-3">Alerts & Device Status</h2>

            {alerts.length === 0 ? (
                <p className="text-sm text-gray-500">No alerts detected</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="py-2">Time</th>
                            <th>Type</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map((alert, i) => (
                            <tr key={i} className="border-b last:border-b-0">
                                <td className="py-2">{alert.time}</td>
                                <td className={`font-medium ${alert.typeColor}`}>
                                    {alert.type}
                                </td>
                                <td>{alert.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
