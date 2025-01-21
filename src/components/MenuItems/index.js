import RestaurantContext from '../../context/RestaurantContext'
import {
  MenuItemDiv,
  MenuItem,
  QuantityButtonDiv,
  QuantityButton,
  DishImage,
  MenuSubDiv1,
  MenuSubDiv2,
} from '../StyledComponents'

const MenuItems = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {activeMenu, increaseQuantity, decreaseQuantity, cart} = value
      return (
        <MenuItemDiv>
          {activeMenu.map(menuItem => (
            <MenuItem key={menuItem.dishId} id={menuItem.dishId}>
              <img
                style={{height: '30px', margin: 'auto'}}
                src={
                  menuItem.dishType === 1
                    ? 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400259/samples/food/250-garam-masala-sachet-lippia-powder-original-imafschyhh6ucuwq_t1ypr5.webp'
                    : 'https://res.cloudinary.com/dahbfvpdn/image/upload/v1737400305/samples/food/veg-300x259_imnvkj.jpg'
                }
                alt={menuItem.dishType === 1 ? 'Non-Veg' : 'Veg'}
              />
              <MenuSubDiv1>
                <h1>{menuItem.dishName}</h1>
                <p>
                  {menuItem.dishCurrency} {menuItem.dishPrice}
                </p>
                <p>{menuItem.dishDescription}</p>
                {menuItem.dishAvailability ? (
                  <QuantityButtonDiv>
                    <QuantityButton
                      value={menuItem.dishId}
                      onClick={decreaseQuantity}
                    >
                      -
                    </QuantityButton>
                    <p>
                      {cart[menuItem.dishId] === undefined
                        ? 0
                        : cart[menuItem.dishId]}
                    </p>
                    <QuantityButton
                      value={menuItem.dishId}
                      onClick={increaseQuantity}
                    >
                      +
                    </QuantityButton>
                  </QuantityButtonDiv>
                ) : (
                  <p style={{color: 'red'}}>Not Available</p>
                )}
                {menuItem.addonCat.length > 0 && (
                  <p style={{color: 'blue'}}>Customisations Available</p>
                )}
              </MenuSubDiv1>
              <MenuSubDiv2>
                <p style={{color: 'orange'}}>
                  Calories: {menuItem.dishCalories}
                </p>
                <DishImage src={menuItem.dishImage} alt={menuItem.dishName} />
              </MenuSubDiv2>
            </MenuItem>
          ))}
        </MenuItemDiv>
      )
    }}
  </RestaurantContext.Consumer>
)

export default MenuItems
