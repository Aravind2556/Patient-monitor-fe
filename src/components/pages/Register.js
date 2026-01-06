import React from 'react'
import { useState, useContext } from 'react';
import { DContext } from '../../context/Datacontext';
import posterImg from '../../assets/Login.jpg'

const Register = () => {

    const { setIsAuth, setCurrentUser, BeURL } = useContext(DContext)

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [comparePassword, setComparePassword] = useState(true)

    const handleRegister = async () => {

        setComparePassword(password === confirmPassword)

        if (name !== "" || email !== "" || contact !== "" || password !== "") {
            if (password === confirmPassword) {

                let tempUser = {
                    fullname: name, email, contact, password
                }

                if (age?.match(/^\d+(\.\d+)?$/)) {
                    tempUser.age = Number(age)
                }

                if (gender && ['male', 'female', 'other'].includes(gender.toLowerCase().trim())) {
                    tempUser.gender = gender.toLocaleLowerCase().trim()
                }

                fetch(`${BeURL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify(tempUser),
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
                            setGender('Male')
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
        <section className='relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-primary-50 overflow-hidden px-4 py-12'>
            <div className='pointer-events-none absolute inset-0 opacity-70'>
                <div className='absolute -left-20 top-10 h-48 w-48 rounded-full bg-primary-100 blur-3xl' />
                <div className='absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-100 blur-3xl' />
            </div>

            <div className='relative z-10 mx-auto max-w-6xl'>
                <div className='grid items-center gap-8 lg:gap-12 md:grid-cols-[1.05fr_1fr]'>
                    <div className='space-y-6 text-center md:text-left'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700 shadow-sm'>
                            Start your care journey
                        </div>
                        <div className='space-y-3'>
                            <h1 className='text-3xl font-extrabold text-slate-900 sm:text-4xl'>Create your patient profile</h1>
                            <p className='text-base text-slate-600 sm:text-lg'>Stay connected with your doctor, track updates, and keep your health information in one secure place.</p>
                        </div>
                        <div className='flex flex-wrap items-center justify-center gap-4 md:justify-start'>
                            <div className='rounded-2xl bg-white/80 px-4 py-3 shadow-md ring-1 ring-white/70 backdrop-blur'>
                                <div className='flex items-center gap-3'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 font-bold'>✓</div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-900'>Secure signup</p>
                                        <p className='text-xs text-slate-500'>Protected with session-based login</p>
                                    </div>
                                </div>
                            </div>
                            <div className='rounded-2xl bg-white/80 px-4 py-3 shadow-md ring-1 ring-white/70 backdrop-blur'>
                                <div className='flex items-center gap-3'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold'>✓</div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-900'>Doctor connected</p>
                                        <p className='text-xs text-slate-500'>Share updates with your clinician</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-auto max-w-md rounded-3xl bg-white/70 p-4 shadow-xl ring-1 ring-white/70 backdrop-blur md:mx-0'>
                            <img className='mx-auto w-full max-w-xs' src={posterImg} alt='register-illus' />
                        </div>
                    </div>

                    <div className='text-slate-950'>
                        <div className='rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-100 sm:p-8'>
                            <div className='mb-4 text-center'>
                                <h2 className='text-2xl font-bold text-primary-800'>Register</h2>
                                <p className='mt-2 text-sm text-slate-600'>Already have an account? <a className='text-primary-700 font-semibold hover:underline' href='/login'>Log in</a></p>
                            </div>

                            <form className='space-y-4'>
                                <div>
                                    <label htmlFor='InputName' className='block text-sm font-semibold text-slate-800'>Full Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} required type='text' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputName' placeholder='John Alex' />
                                </div>

                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div>
                                        <label htmlFor='InputContact' className='block text-sm font-semibold text-slate-800'>Contact</label>
                                        <input value={contact} onChange={(e) => setContact(e.target.value)} required type='number' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputContact' placeholder='+91 78894561236' />
                                    </div>
                                    <div>
                                        <label htmlFor='InputAge' className='block text-sm font-semibold text-slate-800'>Age</label>
                                        <input value={age} onChange={(e) => setAge(e.target.value)} required type='tel' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputAge' placeholder='12' />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='InputEmail' className='block text-sm font-semibold text-slate-800'>Email address</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} required type='email' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputEmail' placeholder='name@example.com' />
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-slate-800'>Gender</label>
                                    <div className='mt-3 flex flex-wrap gap-3'>
                                        <label htmlFor='male' className='flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm transition hover:border-primary-200 hover:bg-primary-50 cursor-pointer'>
                                            <input className='w-4 h-4 cursor-pointer accent-primary-700 focus:ring-2 focus:ring-primary-500' type='radio' id='male' name='gender' value='Male' checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                                            <span>Male</span>
                                        </label>
                                        <label htmlFor='female' className='flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm transition hover:border-primary-200 hover:bg-primary-50 cursor-pointer'>
                                            <input className='w-4 h-4 cursor-pointer accent-primary-700 focus:ring-2 focus:ring-primary-500' type='radio' id='female' name='gender' value='Female' checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                                            <span>Female</span>
                                        </label>
                                        <label htmlFor='other' className='flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm transition hover:border-primary-200 hover:bg-primary-50 cursor-pointer'>
                                            <input className='w-4 h-4 cursor-pointer accent-primary-700 focus:ring-2 focus:ring-primary-500' type='radio' id='other' name='gender' value='Other' checked={gender === 'Other'} onChange={(e) => setGender(e.target.value)} />
                                            <span>Other</span>
                                        </label>
                                    </div>
                                </div>

                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div>
                                        <label htmlFor='InputPassword' className='block text-sm font-semibold text-slate-800'>Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type='password' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputPassword' placeholder='••••••••' />
                                    </div>
                                    <div>
                                        <label htmlFor='InputConfirmPassword' className='block text-sm font-semibold text-slate-800'>Confirm Password</label>
                                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputConfirmPassword' required placeholder='••••••••' />
                                    </div>
                                </div>

                                {!comparePassword && (
                                    <p className='rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm'>
                                        Passwords do not match
                                    </p>
                                )}

                                <div className='pt-2'>
                                    <button onClick={handleRegister} type='button' className='flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-[1px] hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-200'>
                                        Register
                                        <span aria-hidden='true'>→</span>
                                    </button>
                                    <p className='mt-3 text-center text-xs text-slate-500'>By registering, you agree to receive important care updates.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register