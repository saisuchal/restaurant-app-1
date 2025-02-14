import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        cartQuantityList,
      } = value
      const {eachCartItem} = props
      const {dishId} = eachCartItem
      const cartQuantity = cartQuantityList[dishId]
      const dishTotalPrice = eachCartItem.dishPrice * cartQuantity
      return (
        <div className="cart-item">
          <div className="cart-sub-div-1">
            <h1 className="food-name">{eachCartItem.dishName}</h1>
            <p>
              {eachCartItem.dishCurrency} {dishTotalPrice}
            </p>
          </div>
          <div className="cart-sub-div-2">
            <div className="cart-quantity-button-div">
              <button
                className="cart-quantity-button"
                type="button"
                value={JSON.stringify(eachCartItem)}
                onClick={decrementCartItemQuantity}
              >
                -
              </button>
              <p>{cartQuantity}</p>
              <button
                className="cart-quantity-button"
                type="button"
                value={JSON.stringify(eachCartItem)}
                onClick={incrementCartItemQuantity}
              >
                +
              </button>
            </div>
            <button
              className="remove-button"
              type="button"
              value={dishId}
              onClick={removeCartItem}
            >
              Remove
            </button>
            <img
              className="cart-dish-image"
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
