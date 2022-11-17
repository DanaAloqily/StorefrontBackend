"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const PORT = 3000;
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World!!🌍'
    });
});
app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
