import React, { useContext, useMemo } from 'react';
import { DContext } from '../../context/Datacontext';
import { Temp, Pressure } from '../../utils/ThinkSpeak';

export const Alert = () => {
    const { recentFieldOne, recentFieldTwo, predictData, currentUser } = useContext(DContext);

    console.log("currentUser", currentUser);
    console.log("predictData", predictData);

    // Device alerts
    const alerts = useMemo(() => {
        const list = [];
        const time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (recentFieldOne && recentFieldOne >= Number(Temp)) {
            list.push({
                time,
                type: 'Over-temp',
                typeColor: 'text-red-600',
                message: `Temp ${recentFieldOne} °C`
            });
        }

        if (recentFieldTwo && recentFieldTwo >= Number(Pressure)) {
            list.push({
                time,
                type: 'Pressure spike',
                typeColor: 'text-yellow-600',
                message: `Pressure ${recentFieldTwo} mmHg`
            });
        }

        return list;
    }, [recentFieldOne, recentFieldTwo]);

    // AI prediction filtered by current user
    const predictionRows = useMemo(() => {
        if (
            !predictData?.success || 
            !predictData?.prediction || 
            Number(predictData.prediction.Patient_ID) !== currentUser.id
        ) return [];

        const pred = predictData.prediction;

        return [
            {
                parameter: "Compression",
                value: pred.Force,
                status: pred.Compression_Status
            },
            {
                parameter: "SPO2",
                value: pred.SPO2,
                status: pred.SPO2_Status
            },
            {
                parameter: "Temperature",
                value: pred.Temp,
                status: pred.Temp_Status
            }
        ];
    }, [predictData, currentUser]);

    // Function to get status color
    const getStatusColor = (status) => {
        const lower = status.toLowerCase();
        if (lower.includes("issue") || lower.includes("low") || lower.includes("inflammation")) {
            return "text-red-600";
        }
        return "text-green-600";
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full space-y-6">

            {/* Device Alerts */}
            <div>
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
                                    <td className={`font-medium ${alert.typeColor}`}>{alert.type}</td>
                                    <td>{alert.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* AI Prediction */}
            <div>
                <h2 className="font-semibold text-lg mb-2">AI Prediction</h2>
                {predictionRows.length > 0 ? (
                    <table className="w-full text-sm border">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-2 px-2 text-left">Parameter</th>
                                <th className="py-2 px-2 text-left">Value</th>
                                <th className="py-2 px-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predictionRows.map((row, i) => (
                                <tr key={i} className="border-b">
                                    <td className="py-1 px-2 font-medium">{row.parameter}</td>
                                    <td className="py-1 px-2">{row.value}</td>
                                    <td className={`py-1 px-2 font-medium ${getStatusColor(row.status)}`}>
                                        {row.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-sm">No AI prediction available for you</p>
                )}
            </div>

        </div>
    );
};