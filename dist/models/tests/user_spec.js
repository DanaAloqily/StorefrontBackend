"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../user.model"));
const User = new user_model_1.default();
const test = {
    id: '1',
    first_name: 'Tala',
    last_name: 'Aloqily',
    password: 'Test234'
};
describe('user model', () => {
    it('should have an index method', () => {
        expect(User.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(User.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(User.create).toBeDefined();
    });
    it('index method should return list of users', async () => {
        const result = await User.index;
        expect(result).toBeDefined;
    });
    it('create method should add a user', async () => {
        const result = await User.create({
            first_name: 'Tala',
            last_name: 'Aloqily',
            password: 'Test234'
        });
        expect(result).toBeDefined();
    });
    it('show method returns all users', async () => {
        const result = await User.index();
        expect(result).toHaveSize(1);
    });
});
