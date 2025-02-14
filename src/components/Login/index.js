import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

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
      this.setState({error: false})
      history.replace('/')
    } else {
      this.setState({error: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {error, errorMsg} = this.state
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
    return (
      <div className="login-div">
        <form onSubmit={this.submitCredentials} className="login-form">
          <h1 className="login-heading">UNI Resto Cafe</h1>
          <label htmlFor="username" className="login-label">
            USERNAME
          </label>
          <input
            type="textbox"
            id="username"
            onChange={this.usernameInput}
            className="input-field"
          />
          <label htmlFor="password" className="login-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            onChange={this.passwordInput}
            className="input-field"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <p>{errorMsg}</p>}
      </div>
    )
  }
}

export default Login
