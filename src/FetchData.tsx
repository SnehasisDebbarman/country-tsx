import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function sortByName(a: any, b: any) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}
function searchCountryfromList(country: any, search: any) {
    return country.name.toLowerCase().includes(search.toLowerCase())
}
function getFilteredListByRegion(countryList: any, region: any) {
    if (region === '') {
        return countryList
    }
    return countryList.filter((country: any) => country.region === region)
}
const Modal: React.FC<any> = ({ modalData, handleClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h1>{modalData.name}</h1>
                <p>Capital: {modalData.capital}</p>
                <p>Population: {modalData.population}</p>
                <h2>Languages</h2>
                <img src={modalData.flag} alt={modalData.name} />
            </div>
        </div>
    )
}

function FetchData() {
    const [data, SetData] = useState<any>([])
    //search
    const [search, setSearch] = useState('')
    //filter
    const [region, setRegion] = useState('')
    //open and close moda
    const [modalData, setModalData] = useState<any>({})
    const [modalOpen, setModalOpen] = useState(true)

    const showModalWithCountriesDetails = (country: any) => {
        console.log(country)
        setModalData(country)
        setModalOpen(true)
    }




    const url: string = "https://restcountries.com/v3.1/all"

    useEffect(() => {
        Axios.get(url)
            .then(res => {
                const countries = res.data;
                console.log();
                const countryList = [...countries]
                const cList = []
                console.log(countryList);
                for (let i = 0; i < countryList.length; i++) {
                    // countryList.push(i.name.common)
                    console.log(countryList[i])
                    cList.push(
                        {
                            name: countryList[i].name.common,
                            region: countryList[i].region,
                            population: countryList[i].population,
                            capital: countryList[i].capital ? countryList[i].capital[0] : countryList[i].capital,
                            flag: (countryList[i].flags.png) ? countryList[i].flags.svg : ""

                        })
                }
                let slist = new Set([...cList])
                //sort slist by object name
                let sortedList = [...Array.from(slist)].sort(sortByName)
                SetData(sortedList)
            })
    }, []);
    return (

        <div className='grid-container'>
            <div className='search'>
                <input type='text' placeholder='Search Countries' value={search} onChange={(e) => setSearch(e.target.value)} />
                {/* create a dropdown for filter region*/}
                <select id="regionSelect" value={region} onChange={(e) => setRegion(e.target.value)}>
                    <option value=''>Filter by region</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>



            </div>
            <div className='grid'>

                {getFilteredListByRegion(data, region).filter((country: any) => searchCountryfromList(country, search)).map((country: any) =>
                    <div className='grid-item' key={country.name} onClick={() => showModalWithCountriesDetails(country)}>
                        <div>
                            <img className='img' src={country.flag} alt={country.name} />
                        </div>

                        <br />
                        <h3>{country.name}</h3>
                        <p>{country.region}</p>
                        <p>{country.population}</p>
                        <p>{country.capital}</p>
                    </div>
                )}
            </div>

            {/*   create a modal show countries details */}
            {modalOpen && <Modal modalData={modalData} handleClose={() => setModalOpen(false)} />}





        </div>
    )
}
export default FetchData;