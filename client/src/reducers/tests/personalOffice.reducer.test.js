import rootReduser from "../personalOffice.reducer"
import { actionUserInfo,  actionEditInputs, actionAllUserOrders } from "../personalOffice.reducer"

describe("personall office reducers function", ()=>{
    it('action user info', ()=>{
        const mockExpectedState = {
            userInfo:{
                firstName: 'Bohdan',
                lastName: 'Kletskyi',
                telephone: '+380956192234',
                email: 'underwater3499@gmail.com' 
            } 
        }

        const mockData = {
            firstName: 'Bohdan',
            lastName: 'Kletskyi',
            telephone: '+380956192234',
            email: 'underwater3499@gmail.com' 
        }
        expect(rootReduser({}, actionUserInfo(mockData))).toStrictEqual(mockExpectedState)
    })

  it('action edit inputs', ()=>{
        const mockExpectedState = {
            editInputs: ["name"]
        }
        const mockData =  "name"
        expect(rootReduser({}, actionEditInputs(mockData))).toStrictEqual(mockExpectedState)
    })
  
    it('action all user orders', ()=>{
        const mockExpectedState = {
            allUserOrders: {
                productsQuantity: 4,  
                totalSum: 1250,
                orderNo: 23432,
                date: "2023-03-25T12:00:00Z"
            }
        }
        const mockData =  {
            productsQuantity: 4,  
            totalSum: 1250,
            orderNo: 23432,
            date: "2023-03-25T12:00:00Z"
        } 
        expect(rootReduser({}, actionAllUserOrders(mockData))).toStrictEqual(mockExpectedState)
    }) 
})