import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { firestore } from 'config/firebase';
import { toast } from 'react-toastify';

export default function Add() {

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState(0);
    const collectionName = "users"
    const docsCollectionRef = collection(firestore, collectionName)

    const createDoc = async (e) => {
        e.preventDefault();

        let userAge = Number(age)

        let formData = { fullName, age: userAge, dateCreated: serverTimestamp() }

        try {
            const docRef = await addDoc(docsCollectionRef, formData);
            toast.success('User has been added!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            toast.error('Something went wrong.', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Add User</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <form onSubmit={createDoc}>
                            <div className="row">
                                <div className="col">
                                    <input type="text" placeholder='Full Name' name='fullName' className='form-control' onChange={e => { setFullName(e.target.value) }} />
                                </div>
                                <div className="col">
                                    <input type="number" placeholder='Age' name='age' className='form-control' onChange={e => { setAge(e.target.value) }} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col text-center">
                                    <button className='btn btn-success'>Add User</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}
