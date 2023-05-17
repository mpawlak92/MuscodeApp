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
        img_url: '../assets/img1.png'
      },
      {
        id: 1,
        name: 'iPad Pro 32GB',
        salePrice: 600,
        price: 800,
        currency: '$',
        img_url: '../assets/img2.png'
      },
      {
        id: 2,
        name: 'MacBook Pro',
        salePrice: 0,
        price: 8000,
        currency: 'PLN',
        img_url: '../assets/img3.png'
      }
    ]
  })
})
