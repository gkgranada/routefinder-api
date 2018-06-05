import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import{Airport} from '../models/airport';

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class AirportsRepository {

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;

    }

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private db: IDatabase<any>;

    private pgp: IMain;

    // Returns all airport records
    all() {
        return this.db.any('SELECT * FROM airports');
    }

    findByCode(code: string){
        return this.db.oneOrNone("SELECT * FROM airports where iata = \'" + code + "\' or icao = \'" + code + "\'");
    }

}