import React from 'react'
import { useState, useContext } from 'react';
import { DContext } from '../../context/Datacontext';

const PatientRegister = () => {

    const { setIsAuth, setCurrentUser, BeURL } = useContext(DContext)

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [comparePassword, setComparePassword] = useState(true)

    const handleRegister = async () => {

        setComparePassword(password === confirmPassword)

        if (name !== "" || email !== "" || contact !== "" || password !== "") {
            if (password === confirmPassword) {
                fetch(`${BeURL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({ fullname: name, email, contact, password, age: Number(age), gender }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            // Signup successful
                            setIsAuth(true)
                            setCurrentUser(data.user)
                            setName('')
                            setEmail('')
                            setContact('')
                            setPassword('')
                            setConfirmPassword('')
                            setAge('')
                            setGender('')
                            window.location.href = "/"
                        } else {
                            alert(data.message)
                        }
                    })
                    .catch(err => {
                        alert('Trouble in connecting to the Server! Please try again later.')
                        console.log('Error in Register: ' + err)
                    })

            } else {
                alert('passwords not match!')
            }
        }
        else {
            alert("All fields are required!")
        }

    }


    return (

        <div className='w-full'>

            <form>
                <div className="mb-3">
                    <label htmlFor="InputName" className="block text-sm/6 font-medium text-gray-900">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required type="text" className="p-2 rounded-2 border-[1px] rounded border-slate-400 focus:outline-secondary-500 my-2 w-full" id="InputName" placeholder="John Alex" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputContact" className="block text-sm/6 font-medium text-gray-900">Contact</label>
                    <input value={contact} onChange={(e) => setContact(e.target.value)} required type="number" className="p-2 rounded-2 border-[1px] rounded border-slate-400 focus:outline-secondary-500 my-2 w-full" id="InputContact" placeholder="+91 78894561236" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="p-2 rounded-2 border-[1px] rounded border-slate-400 focus:outline-secondary-500 my-2 w-full" id="InputEmail" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputAge" className="block text-sm/6 font-medium text-gray-900">Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} required type="text" className="p-2 rounded-2 border-[1px] rounded border-slate-400 focus:outline-secondary-500 my-2 w-full" id="InputAge" placeholder="12" />
                </div>


                <div className="mb-3">
                    <label
                        htmlFor="InputGender"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Gender
                    </label>

                    <select
                        id="InputGender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="p-2 my-2 w-full rounded border-[1px] border-slate-400 focus:outline-secondary-500 bg-white"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="p-2 rounded-2 border-[1px] rounded border-slate-400 focus:outline-secondary-500 my-2 w-full" id="InputPassword" placeholder="••••••••" />
                </div>


                <div className="mb-3">
                    <label htmlFor="InputConfirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="p-2 rounded-2 border-[1px] rounded border-slate-400 focus:outline-secondary-500 my-2 w-full" id="InputConfirmPassword" required placeholder="••••••••" />
                </div>
                {!comparePassword && (
                    <p className="my-2 inline-block bg-red-200 text-red-700 px-2 py-1 border-2 rounded-md border-red-200">
                        Passwords do not match
                    </p>
                )}

                <div className='flex justify-end'>
                    <button onClick={handleRegister} type='button' className='rounded-lg px-4 py-1 text-md bg-blue-600 hover:bg-secondary-600 text-white'>Register <i className='bi bi-door-open'></i></button>
                </div>
            </form>
        </div>

    )
}

export default PatientRegister