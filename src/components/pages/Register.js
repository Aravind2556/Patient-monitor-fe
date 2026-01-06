import React from 'react'
import { useState, useContext } from 'react';
import { DContext } from '../../context/Datacontext';
import PatientRegister from './PatientRegister';

const Register = () => {

    const { setIsAuth, setCurrentUser, BeURL } = useContext(DContext)

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [comparePassword, setComparePassword] = useState(true)

    const handleRegister = async () => {

        setComparePassword(password === confirmPassword)

        if (name !== "" || email !== "" || contact !== "" || password !== "" || age !== "") {
            if (password === confirmPassword) {
                fetch(`${BeURL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({ fullname: name, email, contact, password, age: Number(age) }),
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
        <div className='flex flex-wrap justify-center items-center translate-y-1/4'>
            <div className='text-center p-2'>
                <img className='mx-auto' src={"https://dummyimage.com/512x512/ddd/000.png&text=Logo"} alt='register-illus' style={{ height: '150px' }} />
                <h1 className='text-3xl font-bold text-primary-500 my-2'>Create an Account!</h1>
                <p className='text-base'><small>Enter all the required details and verify your Email for creating a new Account.</small></p>
            </div>
            <div className='text-slate-950 bg-white m-3 p-5 md:w-5/12 rounded border-[1px] border-primary-500'>
                <h2 className='text-center text-primary-500 font-bold text-xl mb-3'>Register</h2>
                <p className='mb-3'>Already have an account? then <a className='text-sky-600' href='/login'>Click here</a></p>
                <PatientRegister />
            </div>
        </div>
    )
}

export default Register