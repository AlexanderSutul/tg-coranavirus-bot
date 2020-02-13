import {ContextMessageUpdate} from "telegraf";
import axios from 'axios';
import {RequestsService} from "../services/requests";
import {Config} from "../services/config";

let memorizedStat: IStatistics[] = [];
let lastStatRequest: number = Date.now();

export const statisticsMiddleware = async (ctx: ContextMessageUpdate) => {

    const [totalConfirmed, totalDeath, totalRecovered, statisticsByCountries] = await Promise.all([
        getTotalConfirmed(), getTotalDeath(), getTotalRecovered(), getStatisticsByCountries()
    ]);

    let replyText: string = '';
    replyText += `Total confirmed️️☢️: ${totalConfirmed}\n`;
    replyText += `Total death⚰️: ${totalDeath}\n`;
    replyText += `Total recovered💚: ${totalRecovered}\n`;

    const stats = statisticsByCountriesOrginize(statisticsByCountries);

    replyText += `Statistics by countries:\n`;

    stats.forEach(stat => {
       replyText += `${stat.idx + 1}. ${stat.region} ☢️: ${stat.confirmed} ⚰️: ${stat.death} 💚: ${stat.recovered}\n`
    });

    await ctx.reply(replyText);
};

const getTotalConfirmed = async () => {
    const url = Config.getTotalConfirmedUrl();
    const response = await axios.get(url);
    const data = response.data;
    return data.features[0].attributes.value;
};

const getTotalDeath = async () => {
    const url = Config.getTotalDeathUrl();
    const req = new RequestsService();
    const response = await req.get(url);
    return response.features[0].attributes.value;
};

const getTotalRecovered = async () => {
    const url = Config.getTotalRecoveredUrl();
    const req = new RequestsService();
    const response = await req.get(url);
    return response.features[0].attributes.value;
};

const getStatisticsByCountries = async (): Promise<IStatistics[]> => {
    const url = Config.getByCountriesUrl();
    const req = new RequestsService();
    const response = await req.get(url);
    memorizedStat = response.features;
    return response.features as IStatistics[];
};

const statisticsByCountriesOrginize = (stats: IStatistics[]): IStats[] => {
    return stats.map((stat: IStatistics, index): IStats => ({
        idx: index,
        region: stat.attributes.Country_Region,
        confirmed: stat.attributes.Confirmed || 0,
        death: stat.attributes.Deaths || 0,
        recovered: stat.attributes.Recovered || 0,
    }));
};

interface IStatistics {
    attributes: {
        OBJECTID: number;
        Country_Region: string;
        Last_Update: number;
        Confirmed: number;
        Deaths: number;
        Recovered: number;
    }
}

interface IStats {
    idx: number,
    region: string,
    confirmed: number,
    death: number,
    recovered: number
}
