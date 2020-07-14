import { IStatistics } from './statistic.service';
import { ConfigService } from "./config.service";
import axios from "axios";
import { RequestsService } from "./requests.service";
import { Stat } from "../models/stat";

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

  getStatisticsByCountries = async (): Promise<Stat[]> => {
    const url = ConfigService.getByCountriesUrl();
    const req = new RequestsService();
    const response = await req.get(url);
    const stats = response.features as IStatistics[];
    return stats.map((statistics: IStatistics, index: number) => {
      const stat = new Stat();
      stat
        .setIdx(index + 1)
        .setRegion(statistics.attributes.Country_Region)
        .setConfirmed(statistics.attributes.Confirmed)
        .setDeath(statistics.attributes.Deaths)
        .setRecovered(statistics.attributes.Recovered)

      return stat;
    })
  };
}

export const statisticService = new StatisticService();

export interface IStatistics {
  attributes: IStatisticAttributes;
}

interface IStatisticAttributes {
  OBJECTID: number;
  Country_Region: string;
  Last_Update: number;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
}

export interface IStat {
  idx: number,
  region: string,
  confirmed: number,
  death: number,
  recovered: number
}
