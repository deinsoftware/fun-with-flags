'use client'
import { useEffect, useState } from "react"

import ReactCountryFlag from "react-country-flag"

import style from './DatesToRender.module.css'

import { useTimeZoneContext } from "@/app/context/useTimeZoneContext"
import { DateArray } from "@/types/DateArray.types"
import { Countries } from "@/types/countries.types"


export const DatesToRender: React.FC<{datesArray: DateArray[], nextDate?: boolean, prevDate?: boolean} > =({datesArray, nextDate= false, prevDate=false}
    )=>{
    const {deleteTimeZone, format} = useTimeZoneContext()
    const [timeToRender, setTimeToRender] = useState<React.ReactNode[]>([])
    useEffect(()=>{
        const result = datesArray.map(([time, groupedDate]) => {
            const isSameDate = groupedDate.day === 'same'
            const isNextDate = groupedDate.day === 'next'
            const isPrevDate = groupedDate.day === 'prev'

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
        setTimeToRender(result) 
    },[datesArray])
    
    
    return  timeToRender
}