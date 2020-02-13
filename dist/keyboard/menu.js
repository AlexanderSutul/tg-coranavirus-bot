"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
exports.standartMenu = function () {
    return ['Statistics', 'About'].map(function (item) { return telegraf_1.Markup.callbackButton(item, item); });
};
