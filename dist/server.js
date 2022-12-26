"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const routes_1 = __importDefault(require("./routes"));
//console.log(config)
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const PORT = 3000;
//logger middleare
app.use((0, morgan_1.default)('common'));
//to parse incoming req
app.use(body_parser_1.default.json());
//HTTP security middleware
app.use((0, helmet_1.default)());
//limit # of requests to a server middleware
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'to many requests from this IP!!'
}));
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    // throw new Error('Error found')
    res.json({
        message: 'Hello World!!🌍'
    });
});
//error thrown in server handling
app.use(error_middleware_1.default);
app.use((_req, res) => {
    res.status(404).json({
        message: 'it appears you have lost your way!'
    });
});
app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
