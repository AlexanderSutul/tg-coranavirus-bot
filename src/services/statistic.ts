import {Config} from "./config";
import axios from "axios";
import {RequestsService} from "./requests";

export class StatisticService {

    memorizedStat: IStatistics[] = [];
    lastStatRequest: number = Date.now();

    getTotalConfirmed = async () => {
        const url = Config.getTotalConfirmedUrl();
        const response = await axios.get(url);
        const data = response.data;
        return data.features[0].attributes.value;
    };

    getTotalDeath = async () => {
        const url = Config.getTotalDeathUrl();
        const req = new RequestsService();
        const response = await req.get(url);
        return response.features[0].attributes.value;
    };

    getTotalRecovered = async () => {
        const url = Config.getTotalRecoveredUrl();
        const req = new RequestsService();
        const response = await req.get(url);
        return response.features[0].attributes.value;
    };

    getStatisticsByCountries = async (): Promise<IStatistics[]> => {
        const url = Config.getByCountriesUrl();
        const req = new RequestsService();
        const response = await req.get(url);
        this.memorizedStat = response.features;
        return response.features as IStatistics[];
    };

    statisticsByCountriesOrginize = (stats: IStatistics[]): IStats[] => {
        return stats.map((stat: IStatistics, index): IStats => ({
            idx: index,
            region: stat.attributes.Country_Region,
            confirmed: stat.attributes.Confirmed || 0,
            death: stat.attributes.Deaths || 0,
            recovered: stat.attributes.Recovered || 0,
        }));
    };
}

export const statisticService = new StatisticService();

export interface IStatistics {
    attributes: {
        OBJECTID: number;
        Country_Region: string;
        Last_Update: number;
        Confirmed: number;
        Deaths: number;
        Recovered: number;
    }
}

export interface IStats {
    idx: number,
    region: string,
    confirmed: number,
    death: number,
    recovered: number
}
