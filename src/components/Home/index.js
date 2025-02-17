import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import MenuCategories from '../MenuCategories'
import CartContext from '../../context/CartContext'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {apiStatus} = value
        return (
          apiStatus === 'SUCCESS' && (
            <div>
              <Header />
              <MenuCategories />
            </div>
          )
        )
      }}
    </CartContext.Consumer>
  )
}

export default Home
