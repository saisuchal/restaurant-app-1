import CartItem from '../CartItem'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const emptyCartView = (
        <div className="empty-cart-div">
          <img
            className="empty-cart-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty cart"
          />
        </div>
      )
      const cartView = (
        <>
          <div className="remove-all-div">
            <button
              type="button"
              onClick={removeAllCartItems}
              className="remove-all-button"
            >
              Remove All
            </button>
          </div>
          <div className="cart-items-div">
            {cartList.map(cartItem => {
              const dishId = Object.keys(cartItem)[0]
              const dish = Object.values(cartItem)[0]
              return <CartItem eachCartItem={dish} key={`cart${dishId}`} />
            })}
          </div>
        </>
      )
      return (
        <div>
          <Header />
          {cartList.length === 0 ? emptyCartView : cartView}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
