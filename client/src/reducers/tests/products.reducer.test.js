import rootReduser from "../products.reducer"
import { actionFilterRequest, actionSearchInputValue, actionProductsQuantity } from "../products.reducer"

 describe('products reduser function', ()=>{
    it('action filter request', ()=>{
        const mockExpectedState = {
            filterRequest:{
                brand: 'Asus',
                category: 'Busines',
                color: 'black',
                perPage: 3,
                startPage: 1,
            } 
        }
        const mockData = {
            brand: 'Asus',
            category: 'Busines',
            color: 'black',
            perPage: 3,
            startPage: 1,
        }
        expect(rootReduser({}, actionFilterRequest(mockData))).toStrictEqual(mockExpectedState)
    })

    it('action search request', ()=>{
        const mockExpectedState = {
            searchInputValue: 'Asus'
        }
        const mockData = 'Asus'
        expect(rootReduser({}, actionSearchInputValue(mockData))).toStrictEqual(mockExpectedState)
    })


    it('action quantity request', ()=>{
        const mockExpectedState = {
            productsQuantity: 5
        }
        const mockData = 5
        expect(rootReduser({}, actionProductsQuantity(mockData))).toStrictEqual(mockExpectedState)
    })
}) 