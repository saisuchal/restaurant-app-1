import Cookies from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  usernameInput = event => {
    const {value} = event.target
    this.setState({username: value})
  }

  passwordInput = event => {
    const {value} = event.target
    this.setState({password: value})
  }

  submitCredentials = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      history.replace('/')
    } else {
      this.setState({error: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {error, errorMsg} = this.state
    return (
      <div>
        <h1>UNI Resto Cafe</h1>
        <form onSubmit={this.submitCredentials}>
          <label htmlFor="username">USERNAME</label>
          <input type="textbox" id="username" onChange={this.usernameInput} />
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" onChange={this.passwordInput} />
          <button type="submit">Login</button>
        </form>
        {error && <p>{errorMsg}</p>}
      </div>
    )
  }
}

export default Login
