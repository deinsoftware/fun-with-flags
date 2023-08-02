"use client"

import { DatesToRender } from "../../atoms/country-combo/DatesToRender"

import style from './ComboboxCountries.module.css'

import { useFilteredDates } from "./useFilteredDates"

import { useGetInfoDates } from "./useGetInfoDates"

import { useTimeZoneContext } from "@/app/context/useTimeZoneContext"

const ComboboxCountries = () => {
    const {format} = useTimeZoneContext()
    const {dateList} = useGetInfoDates({format})
    
    const filteredDates = useFilteredDates(dateList, format)
    
    return (      
        <div className={style['countries-container']}>   
            {(!dateList || dateList?.length===0) 
            ?'Add a timezone to start'
            : <DatesToRender datesArray={filteredDates}/>
            }   
        </div>      
    )
}

export default ComboboxCountries