# routefinder-api

Generates a flight route from an origin airport to a destination airport.
Flight data collected from: https://openflights.org/data.html

## API

### GET all direct routes
api/v1/routes/

### GET best (shortest based on geo-distance*) route from origin to destination
api/v1/routes/best?origin=AER&destination=PEK

*Geo-distance formula used is the haversine formula

## Database
Database dump found in flights.db
 - Contains dummy airport for testing purposes
 
### Table "public.routes"
  Column   |       Type        | Modifiers 
-----------+-------------------+-----------
 airline   | character varying | 
 airlineid | integer           | 
 source    | character varying | 
 sourceid  | character varying | 
 dest      | character varying | 
 destid    | character varying | 
 codeshare | character varying | 
 stops     | integer           | 
 equipment | character varying | 


### Table "public.airports"
  Column   |       Type        |                       Modifiers                       
-----------+-------------------+-------------------------------------------------------
 id        | integer           | not null default nextval('airports_id_seq'::regclass)
 name      | character varying | 
 city      | character varying | 
 country   | character varying | 
 iata      | character varying | 
 icao      | character varying | 
 latitude  | double precision  | 
 longitude | double precision  | 
 altitude  | integer           | 
 timezone  | real              | 
 dst       | character varying | 
 tz        | character varying | 
 type      | character varying | 
 source    | character varying | 
Indexes:
    "airports_pkey" PRIMARY KEY, btree (id)


### Table "public.airlines"
  Column  |       Type        |                       Modifiers                       
----------+-------------------+-------------------------------------------------------
 id       | integer           | not null default nextval('airlines_id_seq'::regclass)
 name     | character varying | 
 alias    | character varying | 
 iata     | character varying | 
 icao     | character varying | 
 callsign | character varying | 
 country  | character varying | 
 active   | character varying | 
Indexes:
    "airlines_pkey" PRIMARY KEY, btree (id)


