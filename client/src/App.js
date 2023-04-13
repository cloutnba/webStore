import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import Main from './pages/Main';
import Basket from './pages/Basket';
import CheckOut from './pages/CheckOut';
import Contacts from './pages/Contacts';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';
import Registration from './pages/Registration';
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import PersonalOffice from './pages/PersonalOffice';
import Authorization from './pages/Authorization';
import WhyUs from './pages/WhyUs';
import ProductComparison from './pages/ProductComparison/ProductComparison';
import Rules from './pages/Rules/Rules';
import './reset.css'; 


const App = () => {

    return (
        <div className="app-wrapper">
            <Header/>
            <div className="app-routes-wrapper">
                <Routes>
                    <Route path="/" element={ <Main/> }/>
                    <Route path="/contacts" element={ <Contacts/> }/>
                    <Route path="/products" element={ <Products/> }/>
                    <Route path="/products/:itemNo" element={ <ProductDetails/> }/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/basket" element={ <Basket/> }/>
                    <Route path="/favorites" element={ <Favorites/> }/>
                    <Route path="/checkout" element={ <CheckOut/> }/>
                    <Route path="/registration" element={ <Registration/> }/>
                    <Route path="/comparison" element={<ProductComparison />} />
                    <Route path="/personal-office" element={ <PersonalOffice/> }/>
                    <Route path="/authorization" element={ <Authorization/> }/>
                    <Route path="/why-us" element={ <WhyUs/> }/>
                    <Route path="/rules" element={ <Rules/> }/>
                    <Route path="/*" element={ <NotFound/> }/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
};

export default App;
