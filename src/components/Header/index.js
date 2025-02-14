import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {data, cartList} = value
        const cartLength = Object.keys(cartList).length
        return (
          <div className="header-div">
            <Link to="/" className="link-style">
              <div className="heading-div">
                <h1 className="heading">{data.restaurantName}</h1>
              </div>
            </Link>
            <div className="order-logout-div">
              <div className="orders-div">
                <p className="my-orders">My Orders</p>
                <Link to="/cart">
                  <button
                    className="cart-button"
                    data-testid="cart"
                    type="button"
                  >
                    {cartLength > 0 && (
                      <div className="cart-quantity-div">
                        <p className="cart-quantity">{cartLength}</p>
                      </div>
                    )}
                  </button>
                </Link>
              </div>
              <button type="button" onClick={logout} className="logout-button">
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
