import { loadProducts, showDetailedProductModal } from "../shared/products.shared";
import { afterDOM } from "../views/elements"
import { displayProducts } from "../views/search";

const addModalToSearchProducts: () => void = () => {
  const containers = afterDOM.header.getAllSearchProducts()
  console.log(containers)
  showDetailedProductModal(containers)
}
 
export const searchBarController = () => {
  const input = afterDOM.header.searchInput()
  const container = afterDOM.header.searchContainer()

  input.addEventListener('focus', async () => {
    container.classList.add('visible'); 
    const products = await loadProducts();

    displayProducts(products, container);
    addModalToSearchProducts()

    input.addEventListener('keyup', () => {
      const value = input.value.toLowerCase();  
      const filteredProducts = products.filter(product => product.name.toLowerCase().indexOf(value) > - 1);

      displayProducts(filteredProducts, container);
    });

    
  });

  // input.addEventListener('focusout', () => {
  //   container.classList.remove('visible'); 
  // })
}