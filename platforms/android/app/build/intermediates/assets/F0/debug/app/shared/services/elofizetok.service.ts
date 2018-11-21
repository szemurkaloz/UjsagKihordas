import { Injectable, NgZone } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { parse } from "tns-core-modules/css/reworkcss";
import * as fs from "tns-core-modules/file-system";
import { Elofizeto } from "./../models/elofizeto.model";

@Injectable()
export class ElofizetoService {
    private subscr;

    load(): RxObservable<Array<Elofizeto>> {
        return RxObservable.create((observer) => {
            this.subscr = observer;
            this.readElofizetok();
        }); // .catch(this.handleErrors);
    }

            /*const path = "cars";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            //firebase.addValueEventListener(onValueEvent, `/${path}`);*/
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
            // console.log("Data:" + data);
            if (data.length >= 1) {
                const tarr = new Elofizeto(
                    data[0],
                    data[1],
                    data[2]);
                lines.push(tarr);
            }
        }
        const rendezett = lines.sort((a, b) =>  (a.cim >= b.cim) ? 1 : 0);
        this.subscr.next(rendezett);
        console.log("sorok száma:" + lines.length);
}
}
    // tslint:disable-next-line:member-ordering
export const mock = {
    elofizetok: [
        {
            nev: "Blaskó János",
            cim: "Malom u. 40",
            ujsag: "Népszava",
            darab: 1
        },
        {
            nev: "Répa Rozi",
            cim: "Malom u. 41",
            ujsag: "Népszava",
            darab: 1
        }
    ]
     };
