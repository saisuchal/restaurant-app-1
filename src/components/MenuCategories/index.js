import CartContext from '../../context/CartContext'
import MenuItem from '../MenuItem'
import './index.css'

const MenuCategories = () => (
  <CartContext.Consumer>
    {value => {
      const {
        data,
        activeButton,
        activeMenu,
        switchMenu,
        cartQuantityList,
        apiStatus,
      } = value
      console.log(activeMenu)
      return (
        apiStatus === 'SUCCESS' && (
          <>
            <div className="menu-button-div">
              {data.tableMenuList.map(menu => (
                <button
                  type="button"
                  className="menu-button"
                  style={
                    ({
                      borderColor:
                        activeButton === menu.menuCategoryId
                          ? 'orange'
                          : 'transparent',
                    },
                    {
                      color:
                        activeButton === menu.menuCategoryId
                          ? 'orange'
                          : 'black',
                    })
                  }
                  id={menu.menuCategoryId}
                  key={menu.menuCategoryId}
                  onClick={switchMenu}
                >
                  {menu.menuCategory}
                </button>
              ))}
            </div>
            <div className="menu-items-div">
              {activeMenu.map(menuItem => {
                const {dishId} = menuItem
                const cartQuantity =
                  cartQuantityList[dishId] === undefined
                    ? 0
                    : cartQuantityList[dishId]
                return (
                  <MenuItem
                    menuItem={menuItem}
                    key={menuItem.dishId}
                    cartQuantity={cartQuantity}
                  />
                )
              })}
            </div>
          </>
        )
      )
    }}
  </CartContext.Consumer>
)

export default MenuCategories
