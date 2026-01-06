import React, { useState, useContext } from 'react'
import { DContext } from '../../context/Datacontext'
import posterImg from '../../assets/Login.jpg'

const Login = () => {

    const { setIsAuth, setCurrentUser, BeURL } = useContext(DContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const HandleLogin = async (e) => {

        e.preventDefault()

        if (email !== "" && password !== "") {
            fetch(`${BeURL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email, password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setIsAuth(true)
                        setCurrentUser(data.user)
                        setEmail('')
                        setPassword('')
                        window.location.href = "/"
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert('Trouble in connecting to the Server! Please try again later.')
                    console.log('Error in Login:', err)
                })
        }
        else {
            alert("All fields are required!")
        }

    }


    return (
        <section className='relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-primary-50 overflow-hidden px-4 py-12'>
            <div className='pointer-events-none absolute inset-0 opacity-70'>
                <div className='absolute -left-16 top-10 h-40 w-40 rounded-full bg-primary-100 blur-3xl' />
                <div className='absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-100 blur-3xl' />
            </div>

            <div className='relative z-10 mx-auto max-w-6xl'>
                <div className='grid items-center gap-8 lg:gap-12 md:grid-cols-[1.05fr_1fr]'>
                    <div className='space-y-6 text-center md:text-left'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700 shadow-sm'>
                            Welcome back
                        </div>
                        <div className='space-y-3'>
                            <h1 className='text-3xl font-extrabold text-slate-900 sm:text-4xl'>Sign in to continue care</h1>
                            <p className='text-base text-slate-600 sm:text-lg'>Access your dashboard, review updates from your doctor, and keep your health data in sync.</p>
                        </div>
                        <div className='flex flex-wrap items-center justify-center gap-4 md:justify-start'>
                            <div className='rounded-2xl bg-white/80 px-4 py-3 shadow-md ring-1 ring-white/70 backdrop-blur'>
                                <div className='flex items-center gap-3'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 font-bold'>✓</div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-900'>Secure sessions</p>
                                        <p className='text-xs text-slate-500'>Cookie-based authentication</p>
                                    </div>
                                </div>
                            </div>
                            <div className='rounded-2xl bg-white/80 px-4 py-3 shadow-md ring-1 ring-white/70 backdrop-blur'>
                                <div className='flex items-center gap-3'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold'>✓</div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-900'>Fast access</p>
                                        <p className='text-xs text-slate-500'>Resume from any device</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-auto max-w-md rounded-3xl bg-white/70 p-4 shadow-xl ring-1 ring-white/70 backdrop-blur md:mx-0'>
                            <img className='mx-auto w-full max-w-xs' src={posterImg} alt='signin-illus' />
                        </div>
                    </div>

                    <div className='text-slate-950'>
                        <div className='rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-100 sm:p-8'>
                            <div className='mb-4 text-center'>
                                <h2 className='text-2xl font-bold text-primary-800'>Login</h2>
                                <p className='mt-2 text-sm text-slate-600'>Don't have an account? <a className='text-primary-700 font-semibold hover:underline' href='/register'>Create one</a></p>
                            </div>

                            <form className='space-y-4'>
                                <div>
                                    <label htmlFor='InputEmail' className='block text-sm font-semibold text-slate-800'>Email address</label>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} required type='email' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputEmail' placeholder='name@mail.com' />
                                </div>

                                <div>
                                    <label htmlFor='InputPassword' className='block text-sm font-semibold text-slate-800'>Password</label>
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} required type='password' className='mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400' id='InputPassword' placeholder='••••••••' />
                                </div>

                                <div className='pt-2'>
                                    <button onClick={HandleLogin} type='submit' className='flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-[1px] hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-200'>
                                        Login
                                        <span aria-hidden='true'>→</span>
                                    </button>
                                    <p className='mt-3 text-center text-xs text-slate-500'>Need help? Contact your doctor or support.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login