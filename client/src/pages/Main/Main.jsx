import './Main.scss';
import Hero from "./components/Hero";
import SearchBlock from "./components/SearchBlock";
import DiscountedProductsSlider from './components/DiscountedProductsSlider';

const Main = () => {
  return(
  <main>
      <Hero />
      <DiscountedProductsSlider />
      <SearchBlock/>

  </main>
  )
};

export default Main;
