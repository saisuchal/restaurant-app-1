import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from './context/CartContext'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    cartList: [],
    activeButton: '',
    data: {},
    activeMenu: [],
    cartQuantityList: {},
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const dataUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const dataFetchOptions = {
        method: 'GET',
      }
      const dataResponse = await fetch(dataUrl, dataFetchOptions)
      if (dataResponse.ok) {
        const fetchedData = await dataResponse.json()
        const formattedData = await this.formatResponse(fetchedData)
        const initialTableMenuList = formattedData[0].tableMenuList
        const initialActiveButton = initialTableMenuList[0].menuCategoryId
        const {tableMenuList} = formattedData[0]
        const activeMenuList = tableMenuList.filter(
          menu => menu.menuCategoryId === initialActiveButton,
        )
        const {categoryDishes} = activeMenuList[0]
        this.setState({
          activeButton: initialActiveButton,
          data: formattedData[0],
          apiStatus: apiStatusConstants.success,
          activeMenu: categoryDishes,
        })
      }
      if (dataResponse.status === 401) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    }
  }

  switchMenu = event => {
    const {id} = event.target
    this.setState({activeButton: id}, this.activeMenu)
  }

  activeMenu = () => {
    const {activeButton, data} = this.state
    const {tableMenuList} = data
    const activeMenuList = tableMenuList.filter(
      menu => menu.menuCategoryId === activeButton,
    )
    const {categoryDishes} = activeMenuList[0]
    this.setState({activeMenu: categoryDishes})
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

  fetchCartItemIndex = id => {
    const {cartList} = this.state
    const itemIndex = cartList.findIndex(cartItem => {
      const cartItemKey = Object.keys(cartItem)[0]
      return cartItemKey === id
    })
    return itemIndex
  }

  addCartItem = (menuItem, menuItemQuantity) => {
    const {cartQuantityList} = this.state
    const {dishId} = menuItem
    const itemIndex = this.fetchCartItemIndex(dishId)
    if (itemIndex === -1) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {[dishId]: menuItem}],
        cartQuantityList: {
          ...prevState.cartQuantityList,
          [dishId]: menuItemQuantity,
        },
      }))
    } else {
      const oldQuantity = parseInt(cartQuantityList[dishId])
      const newQuantity = oldQuantity + menuItemQuantity
      cartQuantityList[dishId] = newQuantity
      this.setState({cartQuantityList})
    }
  }

  incrementCartItemQuantity = event => {
    const {cartQuantityList} = this.state
    const {value} = event.target
    const dish = JSON.parse(value)
    const {dishId} = dish
    const newQuantity = cartQuantityList[dishId] + 1
    cartQuantityList[dishId] = newQuantity
    this.setState({cartQuantityList})
  }

  decrementCartItemQuantity = event => {
    const {cartQuantityList, cartList} = this.state
    const {value} = event.target
    const dish = JSON.parse(value)
    const {dishId} = dish
    const itemIndex = this.fetchCartItemIndex(dishId)
    const previousCartQuantity = cartQuantityList[dishId]
    if (previousCartQuantity - 1 <= 0) {
      delete cartQuantityList[dishId]
      cartList.pop(itemIndex)
      this.setState({cartQuantityList, cartList})
    } else {
      cartQuantityList[dishId] = previousCartQuantity - 1
      this.setState(cartQuantityList)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: [], cartQuantityList: {}})
  }

  removeCartItem = event => {
    const {value} = event.target
    const {cartList, cartQuantityList} = this.state
    const itemIndex = this.fetchCartItemIndex(value)
    cartList.pop(itemIndex)
    delete cartQuantityList[value]
    this.setState({cartList, cartQuantityList})
  }

  render() {
    const {
      apiStatus,
      cartList,
      data,
      activeButton,
      activeMenu,
      cartQuantityList,
    } = this.state
    return (
      <CartContext.Provider
        value={{
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          switchMenu: this.switchMenu,
          apiStatus,
          cartList,
          data,
          activeButton,
          activeMenu,
          cartQuantityList,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
