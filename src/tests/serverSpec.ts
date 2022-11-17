import supertest from 'supertest';
import app from '../server';


//create a req obj
const request =supertest(app);

describe('test base endpoint server', ()=>{
    it('get the / endpoint' , async ()=>{
        const response = await request.get('/');
        expect(response.status).toBe(200)
      
    }),
    it('get the / endpoint2' , async ()=>{
        const response = await request.get('/');
        expect(response.status).toBe(200)
      
    })

})