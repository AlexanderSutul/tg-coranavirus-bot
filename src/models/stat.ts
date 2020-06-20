import {IStat} from '../services/statistic.service';

const formatNumber = (num: number, locale: string = 'de-DE'): string => {
    return new Intl.NumberFormat(locale).format(num)
}

export class Stat {

    private _idx: number = 0;
    private _region: string = '';
    private _confirmed: number = 0;
    private _death: number = 0;
    private _recovered: number = 0;

    constructor() {
    }


    setIdx(value: number) {
        this._idx = value;
        return this;
    }

    setRegion(value: string) {
        this._region = value;
        return this;
    }

    setConfirmed(value: number) {
        this._confirmed = value;
        return this;
    }

    setDeath(value: number) {
        this._death = value;
        return this;
    }

    setRecovered(value: number) {
        this._recovered = value;
        return this;
    }

    get idx(): number {
        return this._idx;
    }

    get region(): string {
        return this._region;
    }

    get confirmed(): number {
        return this._confirmed;
    }

    get death(): number {
        return this._death;
    }

    get recovered(): number {
        return this._recovered;
    }

    getFormattedRow(): string {
        let row = '';
        row += `${formatNumber(this.idx)}. `
            + `${this.region}`
            + ` ☢️: ${formatNumber(this.confirmed)}`
            + ` ⚰️: ${formatNumber(this.death)}`
            + ` 💚: ${formatNumber(this.recovered)}`
            + `\n`;

        return row;
    }
}
