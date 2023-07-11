"use client"
import ReactCountryFlag from "react-country-flag"
import style from './ComboboxCountries.module.css'

import { getDatesList, sortDatesList } from "@/helpers/events"
import { EventDate, ZoneList } from "@/helpers/events.types"

type TimezoneInfo = {
    [time: string]: {
        countryCodes: [string[]];
        gmt?: string;
    }
  };

const data = `{
    "id": "64a25c08492a2b3680a10500",
    "description": "",
    "img": "https://dummyimage.com/800x300/000000/fff.png",
    "lang": "es",
    "name": "Evento Dummy",
    "tags": [
        "javascript",
        "css"
    ],
    "timeZone": {
        "list": [
            {
                "countryCode": "ES",
                "name": "Europe/Madrid"
            },
            {
                "countryCode": "US",
                "name": "America/Adak"
            },
            {
                "countryCode": "CK",
                "name": "Pacific/Rarotonga"
            },
            {
                "countryCode": "CA",
                "name": "America/Vancouver"
            },
            {
                "countryCode": "US",
                "name": "America/Los_Angeles"
            },
            {
                "countryCode": "EC",
                "name": "America/Guayaquil"
            },
            {
                "countryCode": "CL",
                "name": "America/Santiago"
            }
        ],
        "origin": {
            "countryCode": "CO",
            "date": "2023-06-10T01:36:42.271Z",
            "name": "America/Bogota"
        }
    },
    "createdAt": "2023-07-03T05:26:33.000Z",
    "updatedAt": null,
    "url": "http://youtube.com/channel/event-video",
    "userId": "64a62f9cfd16fa4f76403358"
}`

const mockData=JSON.parse(data)

const ComboboxCountries = () => {
    const valueList: ZoneList ={
        originDate: new Date(mockData.timeZone.origin.date),
        zoneList: mockData.timeZone.list,
        timeFormat: 24,
    }
    const dateList =sortDatesList(getDatesList(valueList))
    
    const filterDates = (dateList: EventDate[]) =>{
        let groupedDates: TimezoneInfo = {}

        dateList?.forEach((date) => {
            const countryCode: string = date.countryCode
            const time: string = date.time
            const gmt = date.gmt
            const name = date.name

            if (groupedDates[time]){
                groupedDates[time].countryCodes.push([countryCode, name])
            } else {
                groupedDates[time] = {
                    countryCodes: [[countryCode, name]],
                    gmt,
                }
            }})
        const groupedDatesArray = Object.entries(groupedDates)

        const timeToRender = groupedDatesArray.map(([time, groupedDate]) => {
            return (
                <div key={time} className={style['countries']}>
                    <p >{` ${time} (${groupedDate.gmt})`}</p>
                    <div className={style['flags-container']}>
                    {groupedDate.countryCodes.map(([countryCode, name]) =>{
                        return (
                            <ReactCountryFlag
                            onClick={() => {
                                console.log(name)
                            }}
                            key={name}
                            countryCode={countryCode}
                            svg
                            style={{
                                width: '1.4rem',
                                height: '1.4rem',
                            }}
                            />
                        )
                    })}
                    </div>
                </div>
            )
        })
        
        return  timeToRender
    } 

    return (
        
        <div className={style['countries-container']}>

            {(typeof dateList !== 'undefined') ?  filterDates(dateList)
            : 'Add a timezone to start'}
            
        </div>     
        
    )
}

export default ComboboxCountries