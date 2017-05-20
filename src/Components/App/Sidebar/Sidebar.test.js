import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Sidebar from './Sidebar'


describe('Sidebar', () => {
  it('returns a header', () => {
    const sidebar = shallow(<Sidebar user={{}} />)
    expect(sidebar.find('.sidebar-header').length).toEqual(1)
  })

  describe('for a student', () => {
    it('returns a two links', () => {
      const sidebar = shallow(<Sidebar user={{}} />)
      expect(sidebar.find('.sidebar-links').length).toEqual(1)
      expect(sidebar.find('.sidebar-links Link').length).toEqual(2)
    })
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
