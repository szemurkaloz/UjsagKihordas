export interface IElofizeto {
    nev: string;
    cim: string;
    ujsag: string;
    darab: number;
}

export class Elofizeto implements IElofizeto {
    nev: string;
    cim: string;
    ujsag: string;
    darab: number;

    constructor(
        cim: string,
        ujsag: string,
        darab: string) {
            this.cim = cim;
            this.ujsag = ujsag;
            this.darab = parseInt(darab, 2);
        }
}
