import RestaurantContext from '../../context/RestaurantContext'
import Header from '../Header'
import MenuCategories from '../MenuCategories'
import MenuItems from '../MenuItems'
import {HomeDiv} from '../StyledComponents'

const Home = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {activebutton, switchMenu} = value
      return (
        <HomeDiv>
          <Header />
          <MenuCategories />
          <MenuItems />
        </HomeDiv>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Home
