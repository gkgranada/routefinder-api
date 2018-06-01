import {RoutesRepository} from './RoutesRepository';

// Database Interface Extensions:
interface IExtensions {
    routes: RoutesRepository
}

export {
    IExtensions,
    RoutesRepository
};