import assert = require('assert');
import {AStarRouteSearch} from '../src/helpers/AStarRouteSearch';
import{Airport} from '../src/models/Airport';


describe('AStarRouteSearch unit tests', function () {
    
    let airports : Map<number, Airport> = new Map<number, Airport>();
    airports.set(2965,
        {id: 2965,
        name: 'Sochi International Airport',
        city: 'Sochi',
        country: 'Russia',
        iata: 'AER',
        icao: 'URSS',
        latitude: 43.449901580811,
        longitude: 39.956600189209,
        altitude: 89,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(2990,
        {id: 2990,
        name: 'Kazan International Airport',
        city: 'Kazan',
        country: 'Russia',
        iata: 'KZN',
        icao: 'UWKD',
        latitude: 55.606201171875,
        longitude: 49.278701782227,
        altitude: 411,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(2966,
        {id: 2966,
        name: 'Astrakhan Airport',
        city: 'Astrakhan',
        country: 'Russia',
        iata: 'ASF',
        icao: 'URWA',
        latitude: 46.2832984924,
        longitude: 48.0063018799,
        altitude: -65,
        timezone: 4,
        dst: 'N',
        tz: 'Europe/Samara',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(2962,
        {id: 2962,
        name: 'Mineralnyye Vody Airport',
        city: 'Mineralnyye Vody',
        country: 'Russia',
        iata: 'MRC',
        icao: 'URMM',
        latitude: 44.2251014709473,
        longitude: 43.081901550293,
        altitude: 1054,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(4078,
        {id: 4078,
        name: 'Tolmachevo Airport',
        city: 'Novosibirsk',
        country: 'Russia',
        iata: 'OVB',
        icao: 'UNNT',
        latitude: 55.012599945068,
        longitude: 82.650703430176,
        altitude: 365,
        timezone: 7,
        dst: 'N',
        tz: 'Asia/Krasnoyarsk',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(2968,
        {id: 2968,
        name: 'Chelyabinsk Balandino Airport',
        city: 'Chelyabinsk',
        country: 'Russia',
        iata: 'CEK',
        icao: 'USCC',
        latitude: 55.305801,
        longitude: 61.5033,
        altitude: 769,
        timezone: 5,
        dst: 'N',
        tz: 'Asia/Yekaterinburg',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(6156,
        {id: 6156,
        name: 'Belgorod International Airport',
        city: 'Belgorod',
        country: 'Russia',
        iata: 'EGO',
        icao: 'UUOB',
        latitude: 50.643798828125,
        longitude: 36.5900993347168,
        altitude: 735,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(2948,
        {id: 2948,
        name: 'Pulkovo Airport',
        city: 'St. Petersburg',
        country: 'Russia',
        iata: 'LED',
        icao: 'ULLI',
        latitude: 59.8003005981445,
        longitude: 30.2625007629395,
        altitude: 78,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(2975,
        {id: 2975,
        name: 'Koltsovo Airport',
        city: 'Yekaterinburg',
        country: 'Russia',
        iata: 'SVX',
        icao: 'USSS',
        latitude: 56.743099212646,
        longitude: 60.802700042725,
        altitude: 764,
        timezone: 5,
        dst: 'N',
        tz: 'Asia/Yekaterinburg',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(4029,
        {id: 4029,
        name: 'Domodedovo International Airport',
        city: 'Moscow',
        country: 'Russia',
        iata: 'DME',
        icao: 'UUDD',
        latitude: 55.4087982177734,
        longitude: 37.9062995910645,
        altitude: 588,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(6969,
        {id: 6969,
        name: 'Begishevo Airport',
        city: 'Nizhnekamsk',
        country: 'Russia',
        iata: 'NBC',
        icao: 'UWKE',
        latitude: 55.5647010803223,
        longitude: 52.0924987792969,
        altitude: 643,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(6160,
        {id: 6160,
        name: 'Bugulma Airport',
        city: 'Bugulma',
        country: 'Russia',
        iata: 'UUA',
        icao: 'UWKB',
        latitude: 54.6399993896484,
        longitude: 52.801700592041,
        altitude: 991,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    airports.set(2922,
        {id: 2922,
        name: 'Heydar Aliyev International Airport',
        city: 'Baku',
        country: 'Azerbaijan',
        iata: 'GYD',
        icao: 'UBBB',
        latitude: 40.4674987792969,
        longitude: 50.0466995239258,
        altitude: 10,
        timezone: 4,
        dst: 'E',
        tz: 'Asia/Baku',
        type: 'airport',
        source: 'OurAirports'});

// dummy airport (for path not found)
    airports.set(1000,
        {id: 1000,
        name: 'Dummy Airport',
        city: 'Dummy',
        country: 'Dummy',
        iata: 'DDD',
        icao: 'DDDD',
        latitude: 54.6399993896484,
        longitude: 52.801700592041,
        altitude: 991,
        timezone: 3,
        dst: 'N',
        tz: 'Europe/Moscow',
        type: 'airport',
        source: 'OurAirports'});

    let routes = new Map<number, number[]>();
    routes.set(2965,[2990]);
    routes.set(2966,[2990, 2962]);
    routes.set(2968,[2990, 4078]);
    routes.set(2990,[2965, 2966, 2968, 4029, 6156, 2948, 2975]);
    routes.set(4029,[2990, 6969, 6160]);
    routes.set(6969,[4029, 2922, 2948, 2975]);
 
    let testParams = [
        [4029, 2990], // 1 stop
        [2965, 2966], // 2 stops
        [2965, 2962], // 3 stops
        [2965, 2922], // 4 stops
        [2966, 1000], // 0 legs (path not found)
        [6969, 6969]  // 0 legs (same airport)
    ];
    let testResults = [
        [4029, 2990],
        [2965, 2990, 2966],
        [2965, 2990, 2966, 2962],
        [2965, 2990, 4029, 6969, 2922],
        [],
        [6969]
    ];

    testParams.forEach(function(t,i) {
        let path = AStarRouteSearch.getShortestPath(
                t[0],
                t[1],
                airports,
                routes);
        console.log(path);
        it('it should return [' + testResults[i] + ']  for ' + t[0] + ' .. ' + t[1], function(){
            console.log(path);
            assert.deepStrictEqual(testResults[i], path);
        });
    });
});



