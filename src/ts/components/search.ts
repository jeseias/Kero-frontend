import { IProduct } from "../constants/interfaces"
import { ProductAPI } from "../models/Products"
import { afterDOM } from "../views/elements"
import { displayProducts } from "../views/search";

const loadProducts: () => Promise<IProduct[]> = async () => await ProductAPI.index();
 
export const searchBarController = () => {
  const input = afterDOM.header.searchInput()
  const container = afterDOM.header.searchContainer()

  input.addEventListener('focus', async () => {
    container.classList.add('visible'); 
    const products = await loadProducts();

    displayProducts(products, container);

    input.addEventListener('keyup', () => {
      const value = input.value.toLowerCase();  
      const filteredProducts = products.filter(product => product.name.toLowerCase().indexOf(value) > - 1);

      displayProducts(filteredProducts, container);
    })
  });

  input.addEventListener('focusout', () => {
    container.classList.remove('visible'); 
  })
}