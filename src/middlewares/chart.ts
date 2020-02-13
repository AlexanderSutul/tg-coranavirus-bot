import {ContextMessageUpdate} from "telegraf";
import {getStatisticsByCountries} from "./statistics";
const chartExporter = require("highcharts-export-server");

export const chartMiddleware = async (ctx: ContextMessageUpdate) => {
    chartExporter.initPool();
    const stats = await getStatisticsByCountries();
    const chinaStat = stats.find(stat => stat.attributes.Country_Region === 'Mainland China');
    const chinaData = chinaStat && chinaStat.attributes.Confirmed;
    const othersStat = stats.find(stat => stat.attributes.Country_Region !== 'Mainland China');
    const othersData = othersStat && othersStat.attributes.Confirmed;
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
                        {
                            name: "Others",
                                y: othersData
                        },
                    ]
                }
            ]
        }
    };
    chartExporter.export(chartDetails, (err: any, res: any) => {
        // Get the image data (base64)
        let imageb64 = res.data;
        // Filename of the output
        let outputFile = "bar.png";
        // Save the image to file
        ctx.replyWithPhoto({ source: Buffer.from(imageb64, 'base64') });
        console.log("Saved image!");
        chartExporter.killPool();
    });
};
