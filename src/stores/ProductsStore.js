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
        alt: 'obrazek do produktu iphone 6s(telefon) z 16 gigabajtami pamięci, render 2 telefonow obruconych do siebie nawzajem tyłem pod kontem 45 stopni',
      },
      {
        id: 1,
        name: 'iPad Pro 32GB',
        salePrice: 600,
        price: 800,
        currency: '$',
        img: 'img2',
        alt: 'render białego telefonu marki apple, telefon posiada w gurnej części obudowy kamerę oraz głośnik natomiast w dolenej części obudowy przycisk na środku, na obrazku widoczny równiez tył telefonu z logiem aple, tył w kolorze srebrnym, w górnej cześci tylenej obudowy widać aparat fotograficzny oraz lampę błyskową',
      },
      {
        id: 2,
        name: 'MacBook Pro',
        salePrice: 0,
        price: 8000,
        currency: 'PLN',
        img: 'img3',
        alt: 'Komputer MacBook Pro, komputer na randerze jest pokazany z na wprost, z takiej perspektywy że nie widać klawiatury a jedynie monitor i dolną obudowę, komputer otwawrty, obudowa w kolorze srebrnym , ramka do okoła ekranu w kolorze czarnym z widoczna kamerą po środku górnej czesci ',
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
