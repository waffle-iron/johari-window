import Auth0Lock from 'auth0-lock'
import { isTokenExpired } from './jwtHelper'
import { EventEmitter } from 'events'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  login() {
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!this.getToken() && !isTokenExpired(token)
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }
  
  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}