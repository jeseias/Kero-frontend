/**
 * This is the controller function used to open up a modal to show more info of a product
 * It reviews an [] of DIVs, and loops through each one.
 * Each div will have a click event lister, to open up the modal
 * @param productContainers The array of product DIVs
 */
export type TShowDetailedProductModal = (productContainers: HTMLDivElement[]) => void;