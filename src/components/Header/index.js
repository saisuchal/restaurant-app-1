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
        const {isLoading, data, cartList} = value
        const cartLength = Object.keys(cartList).length
        return (
          !isLoading && (
            <div className="header-div">
              <Link to="/">
                <div className="heading-div">
                  <h1 className="heading">{data.restaurantName}</h1>
                </div>
              </Link>
              <div className="orders-div">
                <p className="my-orders">My Orders</p>
                <Link to="/cart">
                  <div className="cart-div" data-testid="cart">
                    {cartLength > 0 && (
                      <div className="cart-quantity-div">
                        <p className="cart-quantity">{cartLength}</p>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
              <button type="button" onClick={logout} className="logout-button">
                Logout
              </button>
            </div>
          )
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
