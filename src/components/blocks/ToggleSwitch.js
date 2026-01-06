import React from 'react'

function ToggleSwitch({ data, setData, id = 'switch', toggleSwitches, disabled = false }) {

    return (
        <div className={disabled ? 'opacity-50 cursor-not-allowed' : ''}>
            <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} htmlFor={id}>
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
                <div className="relative w-16 h-9 bg-slate-300 rounded-full shadow-inner transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-r peer-checked:from-emerald-400 peer-checked:to-emerald-600 peer-focus:ring-4 peer-focus:ring-primary-200">
                    <div className="absolute top-1 left-1 bg-white w-7 h-7 rounded-full shadow-lg transform transition-all duration-300 ease-in-out peer-checked:translate-x-7 peer-checked:rotate-180 flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-400 peer-checked:text-emerald-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                            {data ? (
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            ) : (
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            )}
                        </svg>
                    </div>
                </div>
            </label>
        </div>
    )
}

export default ToggleSwitch