import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class MenuItem extends Component {
  state = {quantity: 0}

  decreaseMenuItemQuantity = () => {
    const {quantity} = this.state
    if (quantity !== 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  increaseMenuItemQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          const {menuItem} = this.props
          const {quantity} = this.state
          const addToCart = () => {
            menuItem.menuItemQuantity = quantity
            addCartItem(menuItem, quantity)
          }

          return (
            <div
              className="menu-item"
              key={menuItem.dishId}
              id={menuItem.dishId}
            >
              <img
                className="food-mark"
                src={
                  menuItem.dishType === 1
                    ? 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400259/samples/food/250-garam-masala-sachet-lippia-powder-original-imafschyhh6ucuwq_t1ypr5.webp'
                    : 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400305/samples/food/veg-300x259_imnvkj.jpg'
                }
                alt={menuItem.dishType === 1 ? 'Non-Veg' : 'Veg'}
              />
              <div className="menu-sub-div-1">
                <h1>{menuItem.dishName}</h1>
                <p>
                  {menuItem.dishCurrency} {menuItem.dishPrice}
                </p>
                <p>{menuItem.dishDescription}</p>
                <div className="add-to-cart-div">
                  <div className="quantity-button-div">
                    {menuItem.dishAvailability && (
                      <button
                        className="quanity-button"
                        type="button"
                        onClick={this.decreaseMenuItemQuantity}
                      >
                        -
                      </button>
                    )}
                    <p>{quantity}</p>
                    {menuItem.dishAvailability && (
                      <button
                        className="quanity-button"
                        type="button"
                        onClick={this.increaseMenuItemQuantity}
                      >
                        +
                      </button>
                    )}
                  </div>
                  {quantity > 0 && menuItem.dishAvailability && (
                    <div className="quantity-button-div">
                      <button
                        type="button"
                        className="quantity-button"
                        id={menuItem.dishId}
                        onClick={addToCart}
                      >
                        ADD TO CART
                      </button>
                    </div>
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
                <p style={{color: 'orange'}}>
                  {menuItem.dishCalories} calories
                </p>
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
