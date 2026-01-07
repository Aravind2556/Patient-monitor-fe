import React from 'react'

function ToggleSwitch({ data, setData, id = 'switch', toggleSwitches, disabled = false }) {

    return (
        <div className={disabled ? 'opacity-50 cursor-not-allowed' : ''}>
            <label className={`inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} htmlFor={id}>
                <input
                    type="checkbox"
                    className="sr-only peer"
                    id={id}
                    checked={data}
                    disabled={disabled}
                    onChange={() => {
                        if (!disabled) {
                            setData(!data);
                        }
                    }}
                    onClick={() => {
                        if (!disabled) {
                            toggleSwitches(id, data);
                        }
                    }}
                />

                {/* Toggle Track */}
                <div className="relative w-20 h-9 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full shadow-inner transition-all duration-300 ease-in-out">
                    {/* Text Labels Inside Track */}
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                        <span className={`absolute left-2.5 text-[10px] font-bold text-slate-600 transition-opacity duration-300 ${data ? 'opacity-100' : 'opacity-0'}`}>
                            ON
                        </span>
                        <span className={`absolute right-2 text-[10px] font-bold text-slate-600 transition-opacity duration-300 ${!data ? 'opacity-100' : 'opacity-0'}`}>
                            OFF
                        </span>
                    </div>

                    {/* Toggle Button */}
                    <div className={`absolute top-0.5 w-8 h-8 bg-white rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center z-10 ${data ? 'right-0.5' : 'left-0.5'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${data ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-gradient-to-br from-red-400 to-red-600'}`}></div>
                    </div>
                </div>
            </label>
        </div>
    )
}

export default ToggleSwitch