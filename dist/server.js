"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
//console.log(config)
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const PORT = 3000;
//logger middleare
app.use((0, morgan_1.default)('common'));
//to parse incoming req
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
//app.use(express.json());
app.get('/', function (req, res) {
    // throw new Error('Error found')
    res.json({
        message: 'Hello World!!🌍'
    });
});
app.use((_req, res) => {
    res.status(404).json({
        message: 'it appears you have lost your way!'
    });
});
app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
