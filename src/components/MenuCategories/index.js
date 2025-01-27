import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

const MenuCategories = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {data, switchMenu, activebutton} = value
      const {tableMenuList} = data
      return (
        <div className="menu-button-div">
          {tableMenuList.map(menu => (
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
                    activebutton === menu.menuCategoryId ? 'orange' : 'black',
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
      )
    }}
  </RestaurantContext.Consumer>
)

export default MenuCategories
