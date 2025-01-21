import React from 'react'

const RestaurantContext = React.createContext({
  activebutton: '',
  switchMenu: () => {},
  data: {},
  cart: [],
  activeMenu: [],
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  calculateCartTotal: () => {},
})

export default RestaurantContext
