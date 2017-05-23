import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Sidebar from './Sidebar'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthService from '../utils/AuthService'


describe('Sidebar', () => {
  it('returns a header', () => {
    const sidebar = shallow(<Sidebar user={{}} />)
    expect(sidebar.find('.sidebar-header').length).toEqual(1)
  })

  let wrapper

  beforeEach(() => {
    const user = {name: "Olenna Tyrell", github: "revengeissweet", id: 1, token: "1", cohort: 1 }
    const auth = new AuthService('','')
    wrapper = render (<Router><Sidebar user={user} auth={auth} /></Router>)
  })

  describe('for staff', () => {
    it('returns a three links', () => {
      const user = { name: "Mike", role: "staff" }
      const sidebar = shallow(<Sidebar user={user} />)
      const links = sidebar.find('.sidebar-links Link')

      expect(links.length).toEqual(3)
      expect(links.at(2).children().text()).toEqual("Admin")
    })
  })

  describe("when logged in", () => {
    it('returns a logged in as verification', () => {
      const user = { name: "Mike" }
      const sidebar = shallow(<Sidebar user={user} />)
      expect(sidebar.find('.sidebar-user-info').length).toEqual(1)
      expect(sidebar.find('.sidebar-user-info p').text()).toEqual('logged in as: Mike')
    })
  })

  describe("when not logged in", () => {
    it('returns a notice to log in', () => {
      const sidebar = shallow(<Sidebar user={{}} />)
      expect(sidebar.find('.sidebar-user-info').length).toEqual(1)
      expect(sidebar.find('.sidebar-user-info p').text()).toEqual('please log in')
    })
  })
})
