import {ContextMessageUpdate} from "telegraf";
import {IStatistics, statisticService} from "../services/statistic.service";
const chartExporter = require("highcharts-export-server");

export const chartMiddleware = async (ctx: ContextMessageUpdate) => {
    chartExporter.initPool();

    let stats: IStatistics[];
    if (statisticService.memorizedStat.length) {
        stats = statisticService.memorizedStat;
    } else {
        stats = await statisticService.getStatisticsByCountries();
    }

    const chinaStat = stats.find(stat => stat.attributes.Country_Region === 'Mainland China');
    const chinaData = chinaStat && chinaStat.attributes.Confirmed;
    const othersStat = stats.filter(stat =>
        stat.attributes.Country_Region !== 'Mainland China' && stat.attributes.Country_Region !== 'Others');
    const othersData = othersStat && othersStat.map(stat => ({
        name: stat.attributes.Country_Region,
        y: stat.attributes.Confirmed
    }));
    const chartDetails = {
        type: "png",
        options: {
            chart: {
                type: "pie"
            },
            title: {
                text: "Coronavirus outbreak - confirmed"
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.y}"
                    }
                }
            },
            series: [
                {
                    data: [
                        {
                            name: "Mainland China",
                            y: chinaData
                        },
                        ...othersData
                    ]
                }
            ]
        }
    };
    chartExporter.export(chartDetails, (err: any, res: any) => {
        let imageb64 = res.data;
        let outputFile = "bar.png";
        console.log("Saved image!");
        ctx.replyWithPhoto({ source: Buffer.from(imageb64, 'base64') });
        chartExporter.killPool();
    });
};
