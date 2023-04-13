import PersonalOffice from "./PersonalOffice";
import {render, screen} from "@testing-library/react"
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store'
import '@testing-library/jest-dom/extend-expect';  



describe("Testing PersonalOffice", ()=>{
    test("snapshot PersonalOffice", ()=>{
        const personalOffice = render(<Provider store={store}><BrowserRouter><PersonalOffice/></BrowserRouter></Provider>) 
        expect (personalOffice).toMatchSnapshot() 
    });

    test("test beInDocument", ()=>{
        const {container} = render(<Provider store={store}><BrowserRouter><PersonalOffice/></BrowserRouter></Provider>) 
        expect(container).toBeInTheDocument()
    })
})