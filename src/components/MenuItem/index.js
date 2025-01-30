import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const MenuItem = props => {
  const [menuItemQuantity, setMenuItemQuantity] = useState(0)
  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {menuItem} = props

        const increaseQuantity = () => {
          setMenuItemQuantity(menuItemQuantity + 1)
        }

        const decreaseQuantity = () => {
          if (menuItemQuantity - 1 <= 0) {
            setMenuItemQuantity(0)
          } else {
            setMenuItemQuantity(menuItemQuantity - 1)
          }
        }

        const addToCart = () => {
          menuItem.menuItemQuantity = menuItemQuantity
          addCartItem(menuItem)
        }

        return (
          <div className="menu-item" key={menuItem.dishId} id={menuItem.dishId}>
            <img
              style={{height: '30px', margin: 'auto'}}
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
                {menuItem.dishAvailability && (
                  <div className="quantity-button-div">
                    <button
                      className="quanity-button"
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={menuItemQuantity === 0}
                    >
                      -
                    </button>
                    <button
                      className="quanity-button"
                      type="button"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                )}
                {menuItemQuantity > 0 && menuItem.dishAvailability && (
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
              <p>Cart Quantity</p>
              <div className="item-quantity-div">
                <p>{menuItemQuantity}</p>
              </div>
            </div>
            <div className="menu-sub-div-3">
              <p style={{color: 'orange'}}>{menuItem.dishCalories} calories</p>
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

export default MenuItem
