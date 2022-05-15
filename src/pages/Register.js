import React, { useState, useEffect } from 'react'
import { auth, firestore } from 'config/firebase';
import { doc, setDoc, serverTimestamp } from "firebase/firestore/lite"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { toast } from 'react-toastify';

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({})

    useEffect(() => {
        // setUser(auth.currentUser)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // const uid = user.uid;
                // console.log(user)
                setUser(user)
                // ...
            } else {
                console.log("user is not signed in")
                setUser({})
                // User is signed out
                // ...
            }
        });
    }, [])

    const registerUser = (e) => {
        e.preventDefault()

        console.log(email)
        console.log(password)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)

                setDoc(doc(firestore, "users", user.uid), { email, dateCreated: serverTimestamp(), uid: user.uid });
                toast.success('User has been registered!', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                toast.error(errorMessage, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // ..
            });
    }

    const loginUser = (e) => {
        e.preventDefault()

        console.log(loginEmail)
        console.log(loginPassword)

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                toast.success('User has been logged in!', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });


                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;

                console.log(error)
                toast.error(error.message, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }
    const logoutUser = (e) => {
        e.preventDefault()

        signOut(auth).then(() => {
            toast.success('User has been loggedout!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Sign-out successful.
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });

    }

    const emailVerificationButton = () => {
        sendEmailVerification(auth?.currentUser)
            .then(() => {
                console.log("Email sent")
                // Email verification sent!
                // ...
            });
    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column min-vh-100'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3 className='text-center text-white'>Current User: {user?.email}</h3>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Register User</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <form onSubmit={registerUser}>
                            <div className="row">
                                <div className="col">
                                    <input type="email" placeholder='Email' name='email' className='form-control' onChange={e => { setEmail(e.target.value) }} />
                                </div>
                                <div className="col">
                                    <input type="password" placeholder='Password' name='password' className='form-control' onChange={e => { setPassword(e.target.value) }} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col text-center">
                                    <button className='btn btn-success'>Register</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className="border border-bottom border-1 my-5 w-100"></div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Login User</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <form onSubmit={loginUser}>
                            <div className="row">
                                <div className="col">
                                    <input type="email" placeholder='Email' name='email' className='form-control' onChange={e => { setLoginEmail(e.target.value) }} />
                                </div>
                                <div className="col">
                                    <input type="password" placeholder='Password' name='password' className='form-control' onChange={e => { setLoginPassword(e.target.value) }} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col text-center">
                                    <button className='btn btn-success'>Login</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className="border border-bottom border-1 my-5 w-100"></div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Logout User</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="row mt-3">
                            <div className="col text-center">
                                <button className='btn btn-success' onClick={logoutUser}>Logout</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="border border-bottom border-1 my-5 w-100"></div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Send Email Verification Link</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="row mt-3">
                            <div className="col text-center">
                                <button className='btn btn-success' onClick={emailVerificationButton}>Email Verification</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
