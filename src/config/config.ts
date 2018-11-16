import { Endpoint } from "@app/core";



export const API: Endpoint = {
    translations: 'common/get-translation-by-lang',
    token: 'auth/token',
    deviceTypes: 'common/get-device-type'
}

export const DeviceTypes = [
    {
        "key": "AndroId",
        "value": 1
    },
    {
        "key": "Apple",
        "value": 2
    },
    {
        "key": "GoogleChrome",
        "value": 3
    },
    {
        "key": "MozillaFirefox",
        "value": 4
    },
    {
        "key": "MicrosoftEdge",
        "value": 5
    },
    {
        "key": "Safari",
        "value": 6
    },
    {
        "key": "Opera",
        "value": 7
    },
    {
        "key": "UnknownBrowser",
        "value": 8
    }
]

export const Languages = [
    {
        id: 1,
        name : 'English',
        direction: 'ltr',
        ISO: 'en'
    },
    {
        id: 2,
        name : 'Spanish',
        direction: 'rtl',
        ISO: 'es'
    }
]

export const DEFAULT_LANGUAGE = Languages[0].ISO;