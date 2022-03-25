import React, { useEffect, useState } from "react"
import axios, { Axios } from "axios"
const Modal: React.FC<any> = ({ modalData, handleClose }) => {
    const countryUrl = `https://restcountries.com/v3.1/name/${modalData.name}`
    //setCountryHook
    const [country, setcountry] = useState({

    })
    useEffect(() => {
        //fetch data from countryUrl using axios and save into country
        axios.get(countryUrl)
            .then(res => {
                setcountry(res.data)
            })

    }, [])
    useEffect(() => {
        console.log(country);
    }, [country])



    return (
        <div className="modal">
            <div className="modal-content">
                {/* create a modal with 2 grid item in horizonal  */}
                <button className="closeBtn" onClick={handleClose}>Back</button>
                <div className="modal-grid">
                    <div className="modal-grid-item">
                        <img className='modalImage' src={modalData.flag} alt={modalData.name} />
                    </div>
                    <div className="modal-grid-item">
                        <h1>{modalData.name}</h1>
                        <p>Capital: {modalData.capital}</p>
                        <p>Population: {modalData.population}</p>
                        <h2>Languages</h2>
                    </div>
                </div>

                {/* <img className='modalImage' src={modalData.flag} alt={modalData.name} /> */}
            </div>
        </div>
    )
}
export default Modal