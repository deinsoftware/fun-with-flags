"use client"
import ReactCountryFlag from "react-country-flag"
import style from './ComboboxCountries.module.css'

import { getDatesList, sortDatesList } from "@/helpers/events"
import { ZoneList } from "@/helpers/events.types"
import { useFilteredDates } from "./useFilteredDates"
import { DateArray } from "@/types/DateArray.types"
import { useNextAndPrevDay } from "./useNextAndPrevDay"



 type Format = {
    format: 12 | 24
 }

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
            "date": "2023-07-13T05:18:42.271Z",
            "name": "America/Bogota"
        }
    },
    "createdAt": "2023-07-03T15:26:33.000Z",
    "updatedAt": null,
    "url": "http://youtube.com/channel/event-video",
    "userId": "64a62f9cfd16fa4f76403358"
}`

const mockData=JSON.parse(data)
const currentDate = new Date(mockData.timeZone.origin.date)

const ComboboxCountries = ({format}: Format) => {
    const valueList: ZoneList ={
        originDate: new Date(mockData.timeZone.origin.date),
        zoneList: mockData.timeZone.list,
        timeFormat: format,
    }
    const dateList =sortDatesList(getDatesList(valueList))

    const filteredDates = useFilteredDates(dateList, format)
    const {isNextDate, isPrevDate} = useNextAndPrevDay(filteredDates, currentDate)
   
    const currentDatePlusOne = new Date(currentDate.getTime())
    currentDatePlusOne.setDate(currentDatePlusOne.getDate() + 1)
    
    const currentDateMinusOne = new Date(currentDate.getTime())
    currentDateMinusOne.setDate(currentDateMinusOne.getDate() - 1)

    
    const datesToRender =({datesArray, nextDate= false, prevDate=false}
        :{datesArray: DateArray[], nextDate?: boolean, prevDate?: boolean} )=>{
        const timeToRender = datesArray.map(([time, groupedDate]) => {
            const date= new Date(groupedDate.date)
            const isSameDate = date.getDate() === currentDate.getDate()
            const isNextDate = date.getDate() === currentDate.getDate()+1
            const isPrevDate = date.getDate() === currentDate.getDate()-1

            const handleClick = (event: React.MouseEvent<HTMLImageElement>)=>{
                const target = event.target as HTMLImageElement
                console.log(target.id)
            }
            const elementJSX = ()=>{
                return (
                    <>
                        <p className={format === 12 ? style['time-12'] : style['time-24'] }>{`${time}`}</p>
                        <p className={style['gmt']}>{`(${groupedDate.gmt})`}</p>
                        <div className={style['flags-container']}>
                        {groupedDate.countryCodes.map(([countryCode, name]) =>{
                        return (
                            <div key={self.crypto.randomUUID()} className={style['flag']}>
                                
                                <ReactCountryFlag
                                onClick={handleClick} 
                                id={name}
                                alt={`Flag of ${countryCode}`}
                                title={`Flag of ${countryCode}`}
                                countryCode={countryCode}
                                svg
                                style={{
                                    width: '1.6rem',
                                    height: '1.6rem',
                                }}
                                />
                                <ReactCountryFlag 
                                    countryCode={countryCode} 
                                    style={{display: 'none'}}
                                />
                            </div>
                            )
                        })}
                        {`\n`}
                    </div>
                    </>
                    
                )
            }
            
            return (
                <div key={time} className={style['countries']}>
                    {!nextDate && !prevDate && isSameDate && elementJSX()}              
                    {nextDate && isNextDate && elementJSX()} 
                    {prevDate && isPrevDate && elementJSX()} 
                </div>
            )
        })
        
        return  timeToRender
    }

    return (
        
        <div className={style['countries-container']}>
            {isPrevDate && 
             <>
                <p><strong>{`${currentDateMinusOne.toDateString()}\n`}</strong></p>
                {datesToRender({datesArray: filteredDates, prevDate: true})}
             </> 
            }
            
            {(typeof dateList !== 'undefined') ? 
            <>
                <p><strong>{`${currentDate.toDateString()}\n`}</strong></p>
                {datesToRender({datesArray: filteredDates})} 
            </> 
            : 'Add a timezone to start'}

            
            {isNextDate && 
             <>
                <p><strong>{`${currentDatePlusOne.toDateString()}\n`}</strong></p>
                {datesToRender({datesArray: filteredDates, nextDate: true})}
             </> 
            }
            
        </div>     
        
    )
}

export default ComboboxCountries