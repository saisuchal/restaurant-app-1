import RestaurantContext from '../../context/RestaurantContext'

const Home = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {activeButton, switchMenu} = value
      return (
        <div>
          <h1>{activeButton}</h1>
        </div>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Home
