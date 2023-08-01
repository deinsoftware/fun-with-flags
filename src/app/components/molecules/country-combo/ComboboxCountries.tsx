"use client"

import { DatesToRender } from "../../atoms/country-combo/DatesToRender"

import style from './ComboboxCountries.module.css'

import { useGetDay } from "./useGetDay"
import { useFilteredDates } from "./useFilteredDates"

import { useGetInfoDates } from "./useGetInfoDates"

import { TimeFormat } from "@/helpers/events.types"
import { useTimeZoneContext } from "@/app/context/useTimeZoneContext"

const ComboboxCountries = () => {
    const {format} = useTimeZoneContext()
    const {dateList, currentDate} = useGetInfoDates({format})
    
    const filteredDates = useFilteredDates(dateList, format)
    const {isNextDate, isPrevDate, isToday} = useGetDay(filteredDates)

    const currentDatePlusOne = new Date(currentDate.getTime())
    currentDatePlusOne.setDate(currentDatePlusOne.getDate() + 1)
    
    const currentDateMinusOne = new Date(currentDate.getTime())
    currentDateMinusOne.setDate(currentDateMinusOne.getDate() - 1)

    
    return (
        
        <div className={style['countries-container']}>
            {isPrevDate && 
             <>
                <p><strong>{`${currentDateMinusOne.toDateString()}\n`}</strong></p>
                <DatesToRender datesArray={filteredDates} prevDate={true} />
             </> 
            }
            
            { (typeof dateList !== 'undefined' && isToday) &&
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