import CartContext from '../../context/CartContext'
import MenuItem from '../MenuItem'
import './index.css'

const MenuCategories = () => (
  <CartContext.Consumer>
    {value => {
      const {isLoading, data, activebutton, activeMenu, switchMenu} = value
      return (
        !isLoading && (
          <div>
            <div className="menu-button-div">
              {data.tableMenuList.map(menu => (
                <button
                  type="button"
                  className="menu-button"
                  style={
                    ({
                      borderColor:
                        activebutton === menu.menuCategoryId
                          ? 'orange'
                          : 'transparent',
                    },
                    {
                      color:
                        activebutton === menu.menuCategoryId
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
            <div className="menu-item-div">
              {activeMenu.map(menuItem => (
                <MenuItem menuItem={menuItem} key={menuItem.dishId} />
              ))}
            </div>
          </div>
        )
      )
    }}
  </CartContext.Consumer>
)

export default MenuCategories
