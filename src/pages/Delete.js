import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore/lite";
import { firestore } from 'config/firebase';

export default function Delete() {

    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const collectionName = "users"
    const docsCollectionRef = collection(firestore, collectionName)


    useEffect(() => {

        const readDocs = async () => {

            let documents = []

            const querySnapshot = await getDocs(docsCollectionRef);
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                // console.log(doc.id, doc.data())

                documents.push({ ...doc.data(), id: doc.id })
            });

            setDocuments(documents)
            setIsLoading(false)
        }

        readDocs()

    }, [docsCollectionRef])

    const deleteDocument = async (document) => {

        console.log(document)
        await deleteDoc(doc(firestore, collectionName, document.id));

        let newArray = documents.filter((doc) => {
            return document.id !== doc.id
        })

        setDocuments(newArray)
    }

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Delete User</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        {isLoading ?
                            <div className="text-center">
                                <div className="spinner-grow text-white" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : <>
                                {
                                    documents.map((doc) => {
                                        return <p key={doc.id} className="text-white text-center" onClick={() => { deleteDocument(doc) }}>FullName: {doc.fullName} || Age: {doc.age}</p>
                                    })
                                }
                            </>
                        }
                        {/* <form onSubmit={createDoc}>
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
                        </form> */}

                    </div>
                </div>
            </div>

        </div>
    )
}
