import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  fetchData: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
  addCartItem: () => {},
  data: {},
  activeButton: '',
  activeMenu: [],
  apiStatus: '',
  fetchCartItemIndex: () => {},
  cartQuantityList: {},
})

export default CartContext
