import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { parse } from "tns-core-modules/css/reworkcss";
import * as fs from "tns-core-modules/file-system";
import { Elofizeto } from "./../models/elofizeto.model";

@Injectable()
export class UjsagokService {

    private _lista: BehaviorSubject<Array<Elofizeto>> = new BehaviorSubject(([]));
    // tslint:disable-next-line:member-ordering
    readonly lista: Observable<Array<Elofizeto>> = this._lista.asObservable();
    private subscr;

    constructor() {
        this.readElofizetok();
    }

    load(): Observable<Array<Elofizeto>> {
        return Observable.create((observer) => {
            console.log("Betöltés2");
            this.subscr = observer;
            this.readElofizetok();
        });
    }

    private readElofizetok() {
        const documents = fs.knownFolders.documents();
        const csvFile = documents.getFile("app/files/ujsaglista.csv");
        csvFile.readText().
        then((content) => {
            this.extractData(content);
        });
    }
/*
    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }*/

    private extractData(res: string) {
        // console.log("res:" + res);
        const allTextLines = res.split(/\r\n|\n/);
        const lines = [];
        // console.log("res:" + res);
        // console.log("Nulladik sor:" + allTextLines[0]);
        // console.log("sorok száma:" + allTextLines.length);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            const data = allTextLines[i].replace(/\s+/, " ").split(",");
            console.log("Data:" + data);
            if (data.length >= 1) {
                const tarr = new Elofizeto(
                    data[0],
                    data[1],
                    data[2]);
                lines.push(tarr);
            }
        }
        const rendezett = lines.sort((a, b) =>  (a.ujsag >= b.ujsag) ? 1 : 0);
        // this.subscr.next(rendezett);
        this._lista.next(rendezett);
        console.log("sorok száma:" + lines.length);
}
}
