import {AiOutlineShoppingCart} from 'react-icons/ai'
import RestaurantContext from '../../context/RestaurantContext'
import {HeaderDiv, OrdersDiv, CartDiv} from '../StyledComponents'
import './index.css'

const Header = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {data, calculateCartTotal} = value
      const {restaurantName} = data
      const cartLength = calculateCartTotal()
      return (
        <HeaderDiv>
          <h1>{restaurantName}</h1>
          <OrdersDiv>
            <p className="myorders">My Orders</p>
            <CartDiv>
              <AiOutlineShoppingCart className="icon" />
              <p>{cartLength}</p>
            </CartDiv>
          </OrdersDiv>
        </HeaderDiv>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Header
