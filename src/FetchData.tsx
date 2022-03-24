import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function FetchData() {
    const [data, SetData] = useState<any>([])

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
                SetData(cList)
            })
    }, []);
    return (

        <div className='grid'>
            {data.map((item: any) => {
                return (

                    <div className='grid-item' key={item.name}>
                        <div className='imgback' style={{ background: `url(${item.flag})` }}></div>
                        {/* <img src={item.flag} alt={item.name} /> */}
                        <br />
                        {item.name}---{item.region}--{item.population}


                    </div>)

            })}</div>
    )
}
export default FetchData;