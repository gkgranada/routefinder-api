# routefinder-api

Generates a flight route from an origin airport to a destination airport.
Flight data collected from: https://openflights.org/data.html

## API

### GET all direct routes
api/v1/routes/

### GET best (shortest based on geo-distance*) route from origin to destination
api/v1/routes/best?origin=AER&destination=PEK

*Geo-distance formula used is the haversine formula
