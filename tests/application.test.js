const cds = require('@sap/cds')
// protocal level test
describe('OData protocol level test', () => {
    const app = require('express')()
    const request = require('supertest')(app)
    beforeAll(async () => {
        await cds.deploy(__dirname + '/../srv/order-service').to('sqlite::memory:')
        await cds.serve('OrderService')
        .from(__dirname+'/../srv/order-service').in(app)
    })

    test('GET with $select', async () => {
        const response = await request
        .get('/order/Products?$select=ID,name,stock&$top=5')
        .expect('Content-Type', /^application\/json/)
        .expect(200)
        expect(response.body.value).toEqual([
                {
                    "ID": 1,
                    "name": "ALLERGY CHLORATE 4MG TABLET -- 5% discount",
                    "stock": 100
                },
                {
                    "ID": 2,
                    "name": "ALLERGY 4MG TABLET -- 5% discount",
                    "stock": 100
                },
                {
                    "ID": 3,
                    "name": "ALLERGY BANOPHEN 25MG TABLET -- 5% discount",
                    "stock": 100
                },
                {
                    "ID": 4,
                    "name": "ALLERGY BANOPHEN 25MG TABLET -- 5% discount",
                    "stock": 100
                },
                {
                    "ID": 5,
                    "name": "DIPHENHYD 25MG CAPSULE -- 5% discount",
                    "stock": 100
                }
            ])
        })
})

// cds level test
describe('CDS service-level', () => {
    let srv, Products
    beforeAll(async () => {
        srv = await cds.serve('OrderService').from(__dirname+'/../srv/order-service')
        Products = srv.entities.Products
        expect(Products).toBeDefined()
    })
    
    test('GET all books', async () => {
        const product = await srv.read (
        Products, p=>{ p.ID, p.name }
    ).where('ID in (1, 2, 3, 4, 5)')

    expect(product).toMatchObject([
            { ID: 1, name: 'ALLERGY CHLORATE 4MG TABLET' },
            { ID: 2, name: 'ALLERGY 4MG TABLET' },
            { ID: 3, name: 'ALLERGY BANOPHEN 25MG TABLET' },
            { ID: 4, name: 'ALLERGY BANOPHEN 25MG TABLET' },
            { ID: 5, name: 'DIPHENHYD 25MG CAPSULE' }
        ])
    })
})