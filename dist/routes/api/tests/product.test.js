"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('test product endpoint', function () {
    it('test index ', async (done) => {
        const response = await request.get('./api/products/');
        expect(response.status).toBe(200);
    });
    it('test show(product-id)', async (done) => {
        const response = await request.get('./api/products/1');
        expect(response.status).toBe(200);
    });
    it('test create', async (done) => {
        const response = await request.post('./api/products/');
        expect(response.status).toBe(200);
    });
});
