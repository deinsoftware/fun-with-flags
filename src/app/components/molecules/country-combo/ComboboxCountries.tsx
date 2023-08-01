"use client"
import ReactCountryFlag from "react-country-flag"

import style from './ComboboxCountries.module.css'

import { useGetDay } from "./useGetDay"
import { useFilteredDates } from "./useFilteredDates"

import { useGetInfoDates } from "./useGetInfoDates"

import { DateArray } from "@/types/DateArray.types"
import { Countries } from "@/types/countries.types"
import { useTimeZoneContext } from "@/app/context/useTimeZoneContext"
import { TimeFormat } from "@/helpers/events.types"

const ComboboxCountries: React.FC<{format: TimeFormat}> = ({format}) => {
    const {dateList, currentDate} = useGetInfoDates({format})
    
    const filteredDates = useFilteredDates(dateList, format)
    const {isNextDate, isPrevDate, isToday} = useGetDay(filteredDates, currentDate)
   
    const currentDatePlusOne = new Date(currentDate.getTime())
    currentDatePlusOne.setDate(currentDatePlusOne.getDate() + 1)
    
    const currentDateMinusOne = new Date(currentDate.getTime())
    currentDateMinusOne.setDate(currentDateMinusOne.getDate() - 1)

    
    const DatesToRender: React.FC<{datesArray: DateArray[], nextDate?: boolean, prevDate?: boolean} > =({datesArray, nextDate= false, prevDate=false}
        )=>{
        const {deleteTimeZone} = useTimeZoneContext()
        const timeToRender = datesArray.map(([time, groupedDate]) => {
            const date= new Date(groupedDate.date)
            const isSameDate = date.getDate() === currentDate.getDate()
            const isNextDate = date.getDate() === currentDate.getDate()+1
            const isPrevDate = date.getDate() === currentDate.getDate()-1

            const handleClick = (event: React.MouseEvent<HTMLImageElement>)=>{
                const target = event.target as HTMLImageElement
                const name= target.id.split('--')[0]
                const countryCode= target.id.split('--')[1] as Countries
                deleteTimeZone({countryCode, name})
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
                                svg
                                alt={`Flag of ${countryCode}`}
                                countryCode={countryCode}
                                id={`${name}--${countryCode}`}
                                style={{
                                    width: '1.6rem',
                                    height: '1.6rem',
                                }}
                                title={`Flag of ${countryCode}`}
                                onClick={handleClick}
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
                <DatesToRender datesArray={filteredDates} prevDate={true} />
             </> 
            }
            
            {(typeof dateList !== 'undefined' && isToday) && 
            <>
                <p><strong>{`${currentDate.toDateString()}\n`}</strong></p>
                <DatesToRender datesArray={filteredDates} />
            </> 
            }

            {isNextDate && 
             <>
                <p><strong>{`${currentDatePlusOne.toDateString()}\n`}</strong></p>
                <DatesToRender datesArray={filteredDates} nextDate={true}/>
             </> 
            }

            {!isNextDate && !isPrevDate && !isToday && 'Add a timezone to start'}
            
        </div>     
        
    )
}

export default ComboboxCountries