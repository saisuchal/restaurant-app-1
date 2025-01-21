import RestaurantContext from '../../context/RestaurantContext'
import {MenuButton, MenuButtonDiv} from '../StyledComponents'

const MenuCategories = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {data, activebutton, switchMenu} = value
      const {tableMenuList} = data
      return (
        <MenuButtonDiv>
          {tableMenuList.map(menu => (
            <MenuButton
              id={menu.menuCategoryId}
              activeButton={activebutton}
              key={menu.menuCategoryId}
              onClick={switchMenu}
            >
              {menu.menuCategory}
            </MenuButton>
          ))}
        </MenuButtonDiv>
      )
    }}
  </RestaurantContext.Consumer>
)

export default MenuCategories
