"use client"
import { createContext, useMemo, useState } from "react";

import { Zone } from "@/helpers/events.types";
import { Countries } from "@/types/countries.types";

type TimeZoneData = {
    list: Zone[];
    origin: {
        countryCode: Countries;
        date: string;
        name: string;
    };
}
type OriginDate = {
    countryCode: Countries;
    date: string;
    name: string;
}
export const TimeZoneContext = createContext<{
    timeZones: TimeZoneData | null;
    addTimeZone: (zone: Zone) => void;
    setOriginDate: (originDate: OriginDate) => void;
  }>({timeZones:null, addTimeZone: () => {}, setOriginDate: () => {}});

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
                            ?? {
                                countryCode: "CO",
                                date: new Date().toISOString(),
                                name: "America/Bogota"
                            }),
                    }
                }
            }      
        )        
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
         setOriginDate
        }), [timeZones]);

    return (
        <TimeZoneContext.Provider value={contextValue}>
            {children}
        </TimeZoneContext.Provider>
    )
}

 