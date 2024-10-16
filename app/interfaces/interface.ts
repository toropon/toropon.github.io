export interface ShopInfo {
    "code": string,
    "name": string,
    "pref": string,
    "prefName": string,
    "address": string
    "storeType": StoreType | null,
    "visited": boolean,
    "loc": Loc | null,
    "closed": boolean
}

export interface Loc {
    "lat":number,
    "lng":number
}

export interface Pref {
    "code": string,
    "name": string
}

export enum StoreType {
    Normal = 0,
    HeadOffice = 1,
    Pharmacy = 2
}