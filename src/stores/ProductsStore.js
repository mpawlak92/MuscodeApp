import { defineStore } from 'pinia'

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [
      {
        id: 0,
        name: 'iPhone 6s Plus 16GB',
        salePrice: 649,
        price: 1000,
        currency: '$',
        img: 'img1',
      },
      {
        id: 1,
        name: 'iPad Pro 32GB',
        salePrice: 600,
        price: 800,
        currency: '$',
        img: 'img2',
      },
      {
        id: 2,
        name: 'MacBook Pro',
        salePrice: 0,
        price: 8000,
        currency: 'PLN',
        img: 'img3',
      },
    ],
  }),
  actions: {
    editProduct(newProduct, id) {
      Array.from(this.products).forEach((product) => {
        if (product.id === id) {
          product.name = newProduct.name
          product.salePrice = newProduct.salePrice
          product.price = newProduct.price
          product.currency = newProduct.currency
        }
      })
    },
  },
})
