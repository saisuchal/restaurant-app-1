import CartItem from '../CartItem'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {isLoading, cartList, removeAllCartItems} = value
      return (
        !isLoading && (
          <div>
            <Header />
            {cartList.length === 0 ? (
              <img
                className="empty-cart"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty cart"
              />
            ) : (
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
                {cartList.map(cartItem => {
                  const dishId = Object.keys(cartItem)[0]
                  const dish = Object.values(cartItem)[0]
                  return <CartItem eachCartItem={dish} key={`cart${dishId}`} />
                })}
              </>
            )}
          </div>
        )
      )
    }}
  </CartContext.Consumer>
)

export default Cart
