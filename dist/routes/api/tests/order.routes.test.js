"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const server_1 = __importDefault(require("../../../server"));
const request = supertest(server_1.default);
describe('test orders endpoints', function () {
    it('test index ', async (done) => {
        const response = await request.get('./api/orders/');
        expect(response.status).toBe(200);
    });
    it('test show(user-id)', async (done) => {
        const response = await request.get('./api/orders/3');
        expect(response.status).toBe(200);
    });
});
