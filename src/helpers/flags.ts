import { Zone } from "@/shared/types/zones.types"

export const calcOffset = (date: Date = new Date(), timeZone: Zone[]) => {
    return timeZone.map((zone: Zone) => {
        if (zone.dst){
            zone.offset = date.getTimezoneOffset() / 60
        }
        return zone
    })
}