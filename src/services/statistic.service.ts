import {ConfigService} from "./config.service";
import axios from "axios";
import {RequestsService} from "./requests.service";

export class StatisticService {

    getTotalConfirmed = async (): Promise<number> => {
        const url = ConfigService.getTotalConfirmedUrl();
        const response = await axios.get(url);
        const data = response.data;
        return data.features[0].attributes.value;
    };

    getTotalDeath = async (): Promise<number> => {
        const url = ConfigService.getTotalDeathUrl();
        const req = new RequestsService();
        const response = await req.get(url);
        return response.features[0].attributes.value;
    };

    getTotalRecovered = async (): Promise<number> => {
        const url = ConfigService.getTotalRecoveredUrl();
        const req = new RequestsService();
        const response = await req.get(url);
        return response.features[0].attributes.value;
    };

    getStatisticsByCountries = async (): Promise<IStatistics[]> => {
        const url = ConfigService.getByCountriesUrl();
        const req = new RequestsService();
        const response = await req.get(url);
        return response.features as IStatistics[];
    };

    statisticsByCountriesOrginize = (stats: IStatistics[]): IStats[] => {
        return stats.map((stat: IStatistics, index): IStats => ({
            idx: index + 1,
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
