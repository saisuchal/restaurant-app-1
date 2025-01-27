import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

const MenuItems = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {activeMenu, increaseQuantity, decreaseQuantity, cart} = value
      return (
        <div className='menu-item-div'>
          {activeMenu.map(menuItem => (
            <div
              className='menu-item'
              key={menuItem.dishId}
              id={menuItem.dishId}
            >
              <img
                style={{height: '30px', margin: 'auto'}}
                src={
                  menuItem.dishType === 1
                    ? 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400259/samples/food/250-garam-masala-sachet-lippia-powder-original-imafschyhh6ucuwq_t1ypr5.webp'
                    : 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400305/samples/food/veg-300x259_imnvkj.jpg'
                }
                alt={menuItem.dishType === 1 ? 'Non-Veg' : 'Veg'}
              />
              <div className='menu-sub-div-1'>
                <h1>{menuItem.dishName}</h1>
                <p>
                  {menuItem.dishCurrency} {menuItem.dishPrice}
                </p>
                <p>{menuItem.dishDescription}</p>
                {menuItem.dishAvailability ? (
                  <div className='quantity-button-div'>
                    <button
                      type='button'
                      className='quantity-button'
                      value={menuItem.dishId}
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <p>
                      {cart[menuItem.dishId] === undefined
                        ? 0
                        : cart[menuItem.dishId]}
                    </p>
                    <button
                      type='button'
                      className='quantity-button'
                      value={menuItem.dishId}
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p style={{color: 'red'}}>Not Available</p>
                )}
                {menuItem.addonCat.length > 0 && (
                  <p style={{color: 'blue'}}>Customizations available</p>
                )}
              </div>
              <div className='menu-sub-div-2'>
                <p style={{color: 'orange'}}>
                  {menuItem.dishCalories} calories
                </p>
                <img
                  className='dish-image'
                  src={menuItem.dishImage}
                  alt={menuItem.dishName}
                />
              </div>
            </div>
          ))}
        </div>
      )
    }}
  </RestaurantContext.Consumer>
)

export default MenuItems
