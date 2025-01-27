import {AiOutlineShoppingCart} from 'react-icons/ai'
import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

const Header = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {data, calculateCartTotal} = value
      const {restaurantName} = data
      const cartLength = calculateCartTotal()
      return (
        <div className="header-div">
          <h1>{restaurantName}</h1>
          <div className="orders-div">
            <p className="myorders">My Orders</p>
            <div className="cart-div">
              <AiOutlineShoppingCart className="icon" />
              <p>{cartLength}</p>
            </div>
          </div>
        </div>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Header
