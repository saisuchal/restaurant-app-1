import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from './context/CartContext'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    isLoading: true,
    cartList: [],
    activebutton: '',
    data: {},
    activeMenu: [],
  }

  componentDidMount() {
    console.log('mounting')
    this.fetchData()
  }

  fetchData = async () => {
    console.log('fetching')
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const dataUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const dataFetchOptions = {
        method: 'GET',
      }
      const dataResponse = await fetch(dataUrl, dataFetchOptions)
      console.log(dataResponse)
      if (dataResponse.ok) {
        const fetchedData = await dataResponse.json()
        const formattedData = await this.formatResponse(fetchedData)
        const initialTableMenuList = formattedData[0].tableMenuList
        const initialActiveButton = initialTableMenuList[0].menuCategoryId
        this.setState(
          {
            activebutton: initialActiveButton,
            data: formattedData[0],
          },
          this.activeMenu,
        )
      }
    }
  }

  switchMenu = event => {
    console.log('switch menu')
    const {id} = event.target
    this.setState({activebutton: id}, this.activeMenu)
  }

  activeMenu = () => {
    console.log('active menu')
    const {activebutton, data} = this.state
    const {tableMenuList} = data
    const activeMenuList = tableMenuList.filter(
      menu => menu.menuCategoryId === activebutton,
    )
    const {categoryDishes} = activeMenuList[0]
    this.setState({activeMenu: categoryDishes, isLoading: false})
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
      menuItemQuantity: 0, // added cartItemQuantity value pair for cart item quantity manipulation on menu and cart pages
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
      console.log(cartItem)
      return cartItemKey === id
    })
    return itemIndex
  }

  addCartItem = menuItem => {
    const {cartList} = this.state
    const {dishId} = menuItem
    const itemIndex = this.fetchCartItemIndex(dishId)
    console.log(itemIndex)
    if (itemIndex === -1) {
      cartList.push({[dishId]: menuItem})
      this.setState(cartList)
    } else {
      const cartItem = cartList[itemIndex]
      const newQuantity = menuItem.menuItemQuantity
      cartItem[dishId].menuItemQuantity = newQuantity
      this.setState({cartList})
    }
  }

  incrementCartItemQuantity = event => {
    console.log('cart increment')
    const {cartList} = this.state
    const {value} = event.target
    const dish = JSON.parse(value)
    const {dishId} = dish
    const itemIndex = this.fetchCartItemIndex(dishId)
    console.log(itemIndex)
    const cartItem = cartList[itemIndex]
    cartItem[dishId].menuItemQuantity += 1
    this.setState(cartList)
  }

  decrementCartItemQuantity = event => {
    console.log('cart decrement')
    const {cartList} = this.state
    const {value} = event.target
    const dish = JSON.parse(value)
    const {dishId} = dish
    const itemIndex = this.fetchCartItemIndex(dishId)
    const cartItem = cartList[itemIndex]
    const previousCartQuantity = cartItem[dishId].menuItemQuantity
    if (previousCartQuantity - 1 <= 0) {
      cartList.pop(itemIndex)
      this.setState(cartList)
    } else {
      cartItem[dishId].menuItemQuantity -= 1
      this.setState(cartList)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = event => {
    const {value} = event.target
    const {cartList} = this.state
    const itemIndex = this.fetchCartItemIndex(value)
    cartList.pop(itemIndex)
    this.setState({cartList})
  }

  render() {
    console.log('rendering')
    const {isLoading, cartList, data, activebutton, activeMenu} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          isLoading,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          data,
          activebutton,
          activeMenu,
          switchMenu: this.switchMenu,
          fetchCartItemIndex: this.fetchCartItemIndex,
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
