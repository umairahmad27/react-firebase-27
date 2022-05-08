import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore/lite";
import { firestore } from 'config/firebase';

export default function Read() {

    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const collectionName = "users"
    const docsCollectionRef = collection(firestore, collectionName)


    const readDocs = async () => {

        let array = []

        const querySnapshot = await getDocs(docsCollectionRef);
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            // console.log("document id => ", doc.id)
            // console.log("document data => ", doc.data())

            array.push({ ...doc.data(), id: doc.id })
        });

        setDocuments(array)
        setIsLoading(false)
    }

    useEffect(() => {
        readDocs()
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Read Users</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        {isLoading ?
                            <div className="text-center">
                                <div class="spinner-grow text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : <>
                                {
                                    documents.map((doc) => {
                                        return <p key={doc.id} className="text-white text-center">FullName: {doc.fullName} || Age: {doc.age}</p>
                                    })
                                }
                            </>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
