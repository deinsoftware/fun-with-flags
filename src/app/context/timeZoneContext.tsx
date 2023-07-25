"use client"
import { Zone } from "@/helpers/events.types";
import { Countries } from "@/types/countries.types";
import { createContext, useMemo, useState } from "react";

type TimeZoneData = {
    list: Zone[];
      origin: {
        countryCode: Countries;
        date: string;
        name: string;
      };
}
export const TimeZoneContext = createContext<{
    timeZones: TimeZoneData | null;
    setTimeZones: React.Dispatch<React.SetStateAction<TimeZoneData | null>>;
  }>({timeZones:null, setTimeZones: () => {}});

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
    const contextValue = useMemo(() => ({ timeZones, setTimeZones }), [timeZones]);

    return (
        <TimeZoneContext.Provider value={contextValue}>
            {children}
        </TimeZoneContext.Provider>
    )
}

 