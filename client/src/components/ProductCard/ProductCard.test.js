import ProductCard from "./ProductCard";
import {render, screen, fireEvent} from "@testing-library/react"
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../../store"
import '@testing-library/jest-dom/extend-expect'; 

describe("Testing ProductCard", ()=>{
    test("ButtonScale click", ()=>{
        const{container} = render(<Provider store={store}><BrowserRouter><ProductCard/></BrowserRouter></Provider>) 
        const button = container.querySelector("list__item--scales")

        fireEvent.click(button)
        expect(button).toHaveClass('list__item--scales--curent')
    })
})