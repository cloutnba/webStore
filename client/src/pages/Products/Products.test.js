import Products from "./Products";
import {render, screen} from "@testing-library/react"
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store'
import '@testing-library/jest-dom/extend-expect';

describe("Test Products", ()=>{
    test("snapshot Products", ()=>{
        const products = render(<Provider store={store}><BrowserRouter><Products/></BrowserRouter></Provider>) 
        expect (products).toMatchSnapshot() 
    });

    test("test container", ()=>{
        const {container} = render(<Provider store={store}><BrowserRouter><Products/></BrowserRouter></Provider>)
        const block = container.querySelector("section")
        expect(block).toHaveClass('main-list__sections')
    })

    test('check props', ()=>{
        const {container} = render(<Provider store={store}><BrowserRouter><Products serverError={false}/></BrowserRouter></Provider>)
        const productsList = container.querySelector(".notification__wrapper")
        expect(productsList).not.toBeInTheDocument();
    })

})