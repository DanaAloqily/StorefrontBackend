"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
//create a req obj
const request = (0, supertest_1.default)(server_1.default);
describe('test base endpoint server', () => {
    it('get the / endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    }),
        it('get the / endpoint2', async () => {
            const response = await request.get('/');
            expect(response.status).toBe(200);
        });
});
