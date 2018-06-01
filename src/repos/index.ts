import {RoutesRepository} from './RoutesRepository';
import {AirportsRepository} from './AirportsRepository';

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