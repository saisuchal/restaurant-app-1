import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
  addCartItem: () => {},
  switchMenu: () => {},
  data: {},
  activeButton: '',
  activeMenu: [],
  apiStatus: '',
  cartQuantityList: {},
})

export default CartContext
