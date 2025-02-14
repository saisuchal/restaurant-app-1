import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class MenuItem extends Component {
  state = {menuItemQuantity: 0, quantityChanged: false}

  componentDidMount() {
    const {cartQuantity} = this.props
    this.setState({menuItemQuantity: cartQuantity})
  }

  decreaseMenuItemQuantity = () => {
    const {menuItemQuantity} = this.state
    if (menuItemQuantity !== 0) {
      this.setState(prevState => ({
        menuItemQuantity: parseInt(prevState.menuItemQuantity) - 1,
        quantityChanged: true,
      }))
    }
  }

  increaseMenuItemQuantity = () => {
    this.setState(prevState => ({
      menuItemQuantity: parseInt(prevState.menuItemQuantity) + 1,
      quantityChanged: true,
    }))
  }

  fetchCartQuantityItemIndex = (cartQuantityList, dishId) => {
    const itemIndex = cartQuantityList.findIndex(cartItem => {
      const cartItemKey = Object.keys(cartItem)[0]
      return cartItemKey === dishId
    })
    return itemIndex
  }

  render() {
    const {menuItem, cartQuantity} = this.props
    const {dishId} = menuItem
    const {quantityChanged, menuItemQuantity} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          const addToCart = () => {
            this.setState(
              {quantityChanged: true},
              addCartItem(menuItem, menuItemQuantity),
            )
          }
          return (
            <div
              className="menu-item"
              key={menuItem.dishId}
              id={menuItem.dishId}
            >
              <div className="menu-sub-div-1">
                <h1 className="food-name">
                  <img
                    className="food-mark"
                    src={
                      menuItem.dishType === 1
                        ? 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400259/samples/food/250-garam-masala-sachet-lippia-powder-original-imafschyhh6ucuwq_t1ypr5.webp'
                        : 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400305/samples/food/veg-300x259_imnvkj.jpg'
                    }
                    alt={menuItem.dishType === 1 ? 'Non-Veg' : 'Veg'}
                  />
                  {menuItem.dishName}
                </h1>
                <div className="dish-info">
                  <p>
                    {menuItem.dishCurrency} {menuItem.dishPrice}
                  </p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <p className="calories">{menuItem.dishCalories} calories</p>
                </div>
                <p className="food-description">{menuItem.dishDescription}</p>
                <div className="add-to-cart-div">
                  <div className="menu-quantity-button-div">
                    {menuItem.dishAvailability && (
                      <button
                        className="menu-quantity-button"
                        style={{fontSize: '16px'}}
                        type="button"
                        onClick={this.decreaseMenuItemQuantity}
                      >
                        -
                      </button>
                    )}
                    <p
                      style={{fontWeight: 'bold'}}
                      id={`${dishId}-cartQuantity`}
                    >
                      {quantityChanged ? menuItemQuantity : cartQuantity}
                    </p>
                    {menuItem.dishAvailability && (
                      <button
                        className="menu-quantity-button"
                        style={{fontSize: '16px'}}
                        type="button"
                        onClick={this.increaseMenuItemQuantity}
                      >
                        +
                      </button>
                    )}
                  </div>
                  {menuItemQuantity > 0 && menuItem.dishAvailability && (
                    <button
                      type="button"
                      className="add-to-cart-button"
                      id={menuItem.dishId}
                      onClick={addToCart}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
                {!menuItem.dishAvailability && (
                  <p style={{color: 'red'}}>Not Available</p>
                )}
                {menuItem.addonCat.length > 0 && (
                  <p style={{color: 'blue'}}>Customizations available</p>
                )}
              </div>

              <div className="menu-sub-div-2">
                <img
                  className="dish-image"
                  src={menuItem.dishImage}
                  alt={menuItem.dishName}
                />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default MenuItem
