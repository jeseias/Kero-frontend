import { IProduct } from "../constants/interfaces";
import { TShowDetailedProductModal } from "../controllers/@types/product-controller.types";
import { alertUser } from "../models/Alert";
import { isUserLogged } from "../models/Auth";
import { addProductToShoppingList, ProductAPI } from "../models/Products";
import { afterDOM } from "../views/elements";
import { displayProductModal } from "../views/ProductsView";

export const bookingProducts: (products: HTMLDivElement[], targetClass: string) => Promise<void> = 
  async (products, targetClass) => {
    products.forEach(item => {
      item.addEventListener('click', async (e: Event) => {
        const el = <HTMLDivElement>e.target!
        let parent: HTMLElement  

        console.log(el)

        if (el.classList.contains(`${targetClass}__cart`)) {
          if (!isUserLogged()) 
            return alertUser(false, 'Deves criar uma conta, ou fazer o login para adicionar produtos no seu carrinho', 7000)
          
          el?.parentElement?.id.startsWith('product-') 
            ? parent = el.parentElement!
            : parent = el.parentElement!.parentElement!

          const id = parent.id.replace('product-', '')
          const price = <HTMLParagraphElement>parent.querySelector(`.${targetClass}__price`) 
          console.log(price)

          await addProductToShoppingList(id, parseInt(price.textContent!))
        }

        console.log('wrong class')
      })
    })
  }

export const showDetailedProductModal: TShowDetailedProductModal = containers => {
  containers.forEach(container => {
    const img: HTMLDivElement | HTMLImageElement | null = 
      container.querySelector('.product-card__img') || container.querySelector('.product-item__img')

    if (img) {
      img.addEventListener('click', async () => {
        const productID = container.id.replace('product-', '');
        const data: IProduct = await ProductAPI.show(productID);

        displayProductModal(data)
  
        const modal = afterDOM.pages.products.productModal();
  
        bookingProducts([modal], 'solo-product');
      });
    }
  });
}

export const loadProducts: () => Promise<IProduct[]> = async () => await ProductAPI.index();