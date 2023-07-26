"use client"
import { Zone } from "@/helpers/events.types";
import { getCountryCode } from "@/helpers/getCountryCode";
import { getTimezone } from "@/helpers/getTimeZone";
import { Countries } from "@/types/countries.types";
import { createContext, useMemo, useState } from "react";

type TimeZoneData = {
    list: Zone[];
    origin: {
        countryCode: Countries | Promise<Countries>;
        date: string;
        name: string;
    };
}
type OriginDate = {
    countryCode: Countries | Promise<Countries>;
    date: string;
    name: string;
}

const originDefault: OriginDate = {
    countryCode: getCountryCode(),
    date: new Date().toISOString(),
    name: getTimezone()
}
export const TimeZoneContext = createContext<{
    timeZones: TimeZoneData | null;
    addTimeZone: (zone: Zone) => void;
    deleteTimeZone: (zone: Zone) => void;
    setOriginDate: (originDate: OriginDate) => void;
  }>({
    timeZones:null, 
    addTimeZone: () => {},
    deleteTimeZone: () => {}, 
    setOriginDate: () => {}
});

const initialTimeZoneData: TimeZoneData | null = {
    list: [
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
    origin: {
        countryCode: "CO",
        date: "2023-07-13T05:18:42.271Z",
        name: "America/Bogota"
    }
};
export function TimeZoneProvider({ children }: { children: React.ReactNode }) {
    const [timeZones, setTimeZones] = useState<TimeZoneData | null>(initialTimeZoneData)
    
    const addTimeZone = (zone: Zone) => {
        
        setTimeZones((prev) => {
                return {
                    ...prev,
                    list: [...(prev?.list ?? []), zone],
                    origin: {
                        ...(prev?.origin 
                            ?? originDefault),
                    }
                }
            }      
        )        
    }

    const deleteTimeZone = (zone: Zone) => {
        const index = timeZones?.list?.indexOf(zone)
        if (index === -1 || index === undefined) {
            return 'Element not found'
        } else {
            let newTimeZonesList = structuredClone(timeZones?.list)
            newTimeZonesList?.splice(index, 1)
            setTimeZones((prev) => {
                return {
                    ...prev,
                    list: newTimeZonesList??[],
                    origin: {
                        ...(prev?.origin 
                            ?? originDefault),
                    }
                }
            })
        }     
    }

    const setOriginDate=(originDate: OriginDate)=>{
        setTimeZones((prev) =>{
            return{
                ...prev,
                list: [...(prev?.list ?? [])],             
                origin: originDate
            }
        })
    }
    const contextValue = useMemo(() => ({
         timeZones, 
         addTimeZone,
         deleteTimeZone,
         setOriginDate
        }), [timeZones]);

    return (
        <TimeZoneContext.Provider value={contextValue}>
            {children}
        </TimeZoneContext.Provider>
    )
}

 