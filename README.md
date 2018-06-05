# routefinder-api

Generates a flight route from an origin airport to a destination airport.
Flight data collected from: https://openflights.org/data.html

## API

### GET all direct routes
api/v1/routes/

#### Returns list of JSON objects containing all direct flight routes
Sample JSON response
{

    "status": "success",

    "data": [

        {

            "airline": "SU",

            "airlineid": 130,

            "source": "AER",

            "sourceid": "2965",

            "dest": "OMS",

            "destid": "2958",

            "codeshare": "",

            "stops": 0,

            "equipment": "319"

        },

        {

            "airline": "IOS",

            "airlineid": 2951,

            "source": "OMS",

            "sourceid": "2958",

            "dest": "OVB",

            "destid": "4078",

            "codeshare": "",

            "stops": 0,

            "equipment": "CR2"

        },

        {

            "airline": "HU",

            "airlineid": 2660,

            "source": "OVB",

            "sourceid": "4078",

            "dest": "PEK",

            "destid": "3364",

            "codeshare": "",

            "stops": 0,

            "equipment": "320"

        }

    ],

    "message": "Retrieved ALL routes"
}


#### Sample response### GET best (shortest based on geo-distance*) route from origin to destination
api/v1/routes/best?origin=AER&destination=PEK

origin should be either the IATA or ICAO code of an airport
destination should be either the IATA or ICAO code of an airport

#### Returns list of JSON objects containing legs of a flight route between the origin and destination
Sample JSON response
{

    "status": "success",

    "data": [

        {

            "airline": "SU",

            "airlineid": 130,

            "source": "AER",

            "sourceid": "2965",

            "dest": "OMS",

            "destid": "2958",

            "codeshare": "",

            "stops": 0,

            "equipment": "319"

        },

        {

            "airline": "IOS",

            "airlineid": 2951,

            "source": "OMS",

            "sourceid": "2958",

            "dest": "OVB",

            "destid": "4078",

            "codeshare": "",

            "stops": 0,

            "equipment": "CR2"

        },

        {

            "airline": "HU",

            "airlineid": 2660,

            "source": "OVB",

            "sourceid": "4078",

            "dest": "PEK",

            "destid": "3364",

            "codeshare": "",

            "stops": 0,

            "equipment": "320"

        }

    ],

    "message": "Flight route found"
}
*Geo-distance formula used is the haversine formula

## Database
Database dump found in flights.db
 - Contains dummy airport for testing purposes

