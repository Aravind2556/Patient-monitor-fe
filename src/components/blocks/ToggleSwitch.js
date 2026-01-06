import React from 'react'

function ToggleSwitch({ data, setData, id = 'switch', toggleSwitches }) {

    return (
        <div>
            <label class="relative inline-flex items-center cursor-pointer" htmlFor={id}>
                <input type="checkbox" value="" class="sr-only peer" id={id} checked={data} onChange={() => setData(!data)} onClick={() => toggleSwitches(id, data)} />
                    <div class="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                    </div>
            </label>
        </div>
    )
}

export default ToggleSwitch