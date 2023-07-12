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
                "countryCode": "CO",
                "name": "America/Bogota"
            },
            {
                "countryCode": "JP",
                "name": "Asia/Tokyo"
            },
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
            "date": "2023-06-10T22:36:42.271Z",
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
    // console.log(dateList)
    const filterDates = (dateList: EventDate[]) =>{
        let groupedDates: TimezoneInfo = {}

        dateList?.forEach((dateInfo) => {
            const countryCode: string = dateInfo.countryCode
            const time: string = dateInfo.i18n.time
            const date = dateInfo.i18n.date
            const gmt = dateInfo.gmt
            const name = dateInfo.name

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
                    <p className={style['time']}>{`${time}`}</p>
                    <p className={style['gmt']}>{`(${groupedDate.gmt})`}</p>
                    <div className={style['flags-container']}>
                    {groupedDate.countryCodes.map(([countryCode, name]) =>{
                        return (
                            <div key={name} className={style['flag']}>
                                
                                <ReactCountryFlag
                                onClick={() => {
                                    console.log(name)
                                }} 
                                id={name}
                                countryCode={countryCode}
                                svg
                                style={{
                                    width: '1.6rem',
                                    height: '1.6rem',
                                }}
                                />
                            </div>
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