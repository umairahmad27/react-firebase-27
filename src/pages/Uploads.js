import React, { useState } from 'react'
import { storage } from "config/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import dummyBanner from "assets/images/dummy-banner.png"

export default function Uploads() {

    const [progress, setProgress] = useState(0)
    const [downloadURL, setDownloadURL] = useState("")

    const handleUpload = (e) => {

        let file = e.target.files[0];

        console.log(file)

        if (!file) return;

        // Create a reference to 'mountains.jpg'
        const fileRef = ref(storage, "images/" + file.name);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log('Upload is ' + progress + '% done');

            setProgress(progress)
        },
            (error) => {
                console.log(error)
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setDownloadURL(downloadURL)
                });
            }
        )
    }

    return (
        <div className='py-5'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-white'>Upload Images / Files</h1>
                        <div className="text-center text-white my-5">
                            <input type="file" multiple onChange={handleUpload} accept="image/*" />
                        </div>
                        <h4 className='text-center text-white'>Upload is <b>{progress} %</b> done.</h4>

                        <img src={downloadURL ? downloadURL : dummyBanner} alt="Banner" className='img-fluid' />
                    </div>
                </div>
            </div>
        </div>
    )
}
