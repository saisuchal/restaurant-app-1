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
  activebutton: '',
  activeMenu: [],
  isLoading: '',
  fetchCartItemIndex: () => {},
})

export default CartContext
