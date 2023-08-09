'use client'
import { useEffect, useRef, useState } from "react"

import ReactCountryFlag from "react-country-flag"

import style from './DatesToRender.module.css'

import { useTimeZoneContext } from "@/app/context/useTimeZoneContext"
import { DatesFilteredArray } from "@/types/flags.types"
import { Countries } from "@/types/countries.types"


export const DatesToRender: React.FC<{datesArray: DatesFilteredArray[], getTextContent: Function}> =
({datesArray, getTextContent})=>{
    const {deleteTimeZone, format} = useTimeZoneContext()
    const [timeToRender, setTimeToRender] = useState<React.ReactNode[]>([])

    const ref = useRef<HTMLDivElement>(null)   
    
    useEffect(()=>{
        getTextContent(ref)
        return ()=>{
            getTextContent(null)
        }
    }, [timeToRender, ref, getTextContent])
           
    useEffect(()=>{
        const result = datesArray.map(([date, groupedCountries]) => {
            
            const handleClick = (event: React.MouseEvent<HTMLImageElement>)=>{
                const target = event.target as HTMLImageElement
                const name= target.id.split('--')[0]
                const countryCode= target.id.split('--')[1] as Countries
                deleteTimeZone({countryCode, name})
            }
            const groupedCountriesArray = Object.entries(groupedCountries)
            const timeInfo= groupedCountriesArray.map(([gmt, countries])=>{
                return(
                    <div key={gmt} className={style['countries']}>
                        <p className={format === 12 ? style['time-12'] : style['time-24'] }>
                            {`${countries[0].i18n.time}`}
                        </p>
                        <p className={style['gmt']}>{`(${gmt})`}</p>
                        <div className={style['flags-container']}>
                            {countries.map(({countryCode, name}) =>{
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
                    </div>
                )
            })
            
            
            return (
                < div key={self.crypto.randomUUID()} ref={ref}  > 
                    <p><strong>{date}</strong></p> 
                    {`\n`}    
                    {timeInfo}
                </div>
            )
        }) 
        setTimeToRender(result) 
    },[datesArray, deleteTimeZone, format])
    
    
   return(
       
           timeToRender
   )  
    
}