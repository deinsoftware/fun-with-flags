"use client"
import ReactCountryFlag from "react-country-flag"
import style from './ComboboxCountries.module.css'

import { getDatesList, sortDatesList } from "@/helpers/events"
import { EventDate, ZoneList } from "@/helpers/events.types"
import { useEffect, useState } from "react"

type TimezoneInfo = {
    [time: string]: {
        countryCodes: [string[]];
        gmt?: string;
        date: string;
    }
  };

type DateArray = [
    string, {
        countryCodes: [string[]];
        gmt?: string | undefined;
        date: string;
    }
 ]

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
const currentDate = new Date(mockData.timeZone.origin.date)

const ComboboxCountries = () => {
    const valueList: ZoneList ={
        originDate: new Date(mockData.timeZone.origin.date),
        zoneList: mockData.timeZone.list,
        timeFormat: 24,
    }
    const dateList =sortDatesList(getDatesList(valueList))

    const [filteredDates, setFilteredDates] = useState<DateArray[]>([])
    const [isNextDate, setIsNextDate] = useState<boolean>(false)
    const currentDatePlusOne = new Date(currentDate)
    currentDatePlusOne.setDate(currentDatePlusOne.getDate() + 1)

    useEffect(()=>{
        const filterDates = (dateList: EventDate[]): DateArray[] =>{
            let groupedDates: TimezoneInfo = {}
    
            dateList?.forEach((dateInfo) => {
                const countryCode: string = dateInfo.countryCode
                const time: string = dateInfo.i18n.time
                const date = dateInfo.i18n.date
                const gmt = dateInfo.acronym
                const name = dateInfo.name
    
                if (groupedDates[time]){
                    groupedDates[time].countryCodes.push([countryCode, name])
                } else {
                    groupedDates[time] = {
                        countryCodes: [[countryCode, name]],
                        gmt,
                        date,
                    }
                }})
            const groupedDatesArray = Object.entries(groupedDates)
            return groupedDatesArray
        } 
        setFilteredDates(filterDates(dateList))  
    }, [])  

    useEffect(()=>{
        const thereIsNextDate = (datesArray: DateArray[], currentDate: Date)=>{
            let nextDate = false
            const validation = datesArray.some(([, groupedDate]) => {
                const date= new Date(groupedDate.date)
                const isNextDate = date.getDate() > currentDate.getDate()
                return isNextDate 
            })
            setIsNextDate(validation)
        }  
        thereIsNextDate(filteredDates, currentDate)
    }, [filteredDates])

    
    const datesToRender =(datesArray: DateArray[], nextDate: boolean= false )=>{
        const timeToRender = datesArray.map(([time, groupedDate]) => {
            const date= new Date(groupedDate.date)
            const isSameDate = date.toDateString() === currentDate.toDateString()
            const isNextDate = date.getDate() > currentDate.getDate() 
            const isPrevDate = date.getDate() < currentDate.getDate() 

            const handleClick = (event: React.MouseEvent<HTMLImageElement>)=>{
                const target = event.target as HTMLImageElement
                console.log(target.id)
            }
            const elementJSX = ()=>{
                return (
                    <>
                        <p className={style['time']}>{`${time}`}</p>
                        <p className={style['gmt']}>{`(${groupedDate.gmt})`}</p>
                        <div className={style['flags-container']}>
                        {groupedDate.countryCodes.map(([countryCode, name]) =>{
                        return (
                            <div key={self.crypto.randomUUID()} className={style['flag']}>
                                
                                <ReactCountryFlag
                                onClick={handleClick} 
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
                    </>
                    
                )
            }
            
            return (
                <div key={time} className={style['countries']}>
                    {!nextDate && isSameDate && elementJSX()}              
                    {nextDate && isNextDate && elementJSX()} 
                </div>
            )
        })
        
        return  timeToRender
    }

    return (
        
        <div className={style['countries-container']}>
            <p><strong>{currentDate.toDateString()}</strong></p>
            {(typeof dateList !== 'undefined') ?  datesToRender(filteredDates) 
            : 'Add a timezone to start'}

            
            {isNextDate && 
             <>
                <p><strong>{currentDatePlusOne.toDateString()}</strong></p>
                {datesToRender(filteredDates, true)}
             </> 
            }
        </div>     
        
    )
}

export default ComboboxCountries