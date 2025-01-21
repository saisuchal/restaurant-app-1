import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RestaurantContext from './context/RestaurantContext'
import Home from './components/Home'

import './App.css'

class App extends Component {
  state = {isLoading: true, cart: {}, activeMenu: []}

  componentDidMount = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = await this.formatResponse(data)
    const {tableMenuList} = formattedData[0]
    const {menuCategoryId} = tableMenuList[0]
    this.setState(
      {
        activebutton: menuCategoryId,
        data: formattedData[0],
        isLoading: false,
      },
      this.activeMenu,
    )
  }

  formatResponse = dataList =>
    dataList.map(data => ({
      branchName: data.branch_name,
      nexturl: data.nexturl,
      restaurantId: data.restaurant_id,
      restaurantImage: data.restaurant_image,
      restaurantName: data.restaurant_name,
      tableId: data.table_id,
      tableMenuList: this.formatTableMenuList(data.table_menu_list),
    }))

  formatTableMenuList = list =>
    list.map(menu => ({
      categoryDishes: this.formatCategoryDishes(menu.category_dishes),
      menuCategory: menu.menu_category,
      menuCategoryId: menu.menu_category_id,
      menuCategoryImage: menu.menu_category_image,
      nexturl: menu.nexturl,
    }))

  formatCategoryDishes = list =>
    list.map(dish => ({
      addonCat: this.formatAddOnCat(dish.addonCat),
      dishAvailability: dish.dish_Availability,
      dishType: dish.dish_Type,
      dishCalories: dish.dish_calories,
      dishCurrency: dish.dish_currency,
      dishDescription: dish.dish_description,
      dishId: dish.dish_id,
      dishImage: dish.dish_image,
      dishName: dish.dish_name,
      dishPrice: dish.dish_price,
      nexturl: dish.nexturl,
    }))

  formatAddOnCat = list =>
    list.map(addOnCat => ({
      addonCategory: addOnCat.addon_category,
      addonCategoryId: addOnCat.addon_category_id,
      addonSelection: addOnCat.addon_selection,
      addons: this.formatAddOn(addOnCat.addons),
      nexturl: addOnCat.nexturl,
    }))

  formatAddOn = list =>
    list.map(addOn => ({
      dishAvailability: addOn.dish_Availability,
      dishType: addOn.dish_Type,
      dishCalories: addOn.dish_calories,
      dishCurrency: addOn.dish_currency,
      dishDescription: addOn.dish_description,
      dishId: addOn.dish_id,
      dishImage: addOn.dish_image,
      dishName: addOn.dish_name,
      dishPrice: addOn.dish_price,
    }))

  switchMenu = event => {
    const {id} = event.target
    this.setState({activebutton: id}, this.activeMenu)
  }

  activeMenu = () => {
    const {activebutton, data} = this.state
    const {tableMenuList} = data
    const activeMenuList = tableMenuList.filter(
      menu => menu.menuCategoryId === activebutton,
    )
    const {categoryDishes} = activeMenuList[0]
    this.setState({activeMenu: categoryDishes})
  }

  increaseQuantity = event => {
    const {value} = event.target
    const {cart} = this.state
    if (cart[value] === undefined) {
      cart[value] = 1
    } else {
      const count = cart[value]
      cart[value] = count + 1
    }
    this.setState({cart}, this.calculateCartTotal)
  }

  decreaseQuantity = event => {
    const {value} = event.target
    const {cart} = this.state
    if (cart[value] === undefined || cart[value] === 0) {
      cart[value] = 0
    } else {
      const count = cart[value]
      cart[value] = count - 1
    }
    this.setState({cart}, this.calculateCartTotal)
  }

  calculateCartTotal = () => {
    const {cart} = this.state
    const values = Object.values(cart)
    let sum = 0
    values.forEach(x => {
      sum += x
    })
    return sum
  }

  render() {
    const {activebutton, isLoading, data, cart, activeMenu} = this.state
    console.log(data)
    return (
      <RestaurantContext.Provider
        value={{
          activebutton,
          switchMenu: this.switchMenu,
          data,
          cart,
          activeMenu,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          calculateCartTotal: this.calculateCartTotal,
        }}
      >
        {isLoading ? <Loader fill="black" /> : <Home />}
      </RestaurantContext.Provider>
    )
  }
}

export default App
