import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        fetchCartItemIndex,
        cartList,
      } = value
      const {eachCartItem} = props
      const {dishId} = eachCartItem
      const cartItemIndex = fetchCartItemIndex(dishId)
      const cartItem = cartList[cartItemIndex]
      const cartQuantity = cartItem[dishId].menuItemQuantity
      console.log(cartItemIndex)
      return (
        <div className="cart-item" key={cartItem.dishId} id={cartItem.dishId}>
          <div className="cart-sub-div-1">
            <h1>{eachCartItem.dishName}</h1>
            <p>
              {eachCartItem.dishCurrency} {eachCartItem.dishPrice}
            </p>
          </div>
          <div className="cart-sub-div-2">
            <div className="quantity-button-div">
              <button
                className="quanity-button"
                type="button"
                value={JSON.stringify(eachCartItem)}
                onClick={decrementCartItemQuantity}
              >
                -
              </button>
              <p>{cartQuantity}</p>
              <button
                className="quanity-button"
                type="button"
                value={JSON.stringify(eachCartItem)}
                onClick={incrementCartItemQuantity}
              >
                +
              </button>
            </div>
            <button
              type="button"
              value={eachCartItem.dishId}
              onClick={removeCartItem}
            >
              Remove
            </button>
            <img
              className="dish-image"
              src={eachCartItem.dishImage}
              alt={eachCartItem.dishName}
            />
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
