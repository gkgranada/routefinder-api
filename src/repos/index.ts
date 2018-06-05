import {RoutesRepository} from './routesRepository';
import {AirportsRepository} from './airportsRepository';

// Database Interface Extensions:
interface IExtensions {
    routes: RoutesRepository
    airports: AirportsRepository
}

export {
    IExtensions,
    RoutesRepository,
    AirportsRepository
};