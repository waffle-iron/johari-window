import React from 'react';
import { shallow, mount } from 'enzyme';
import Admin from './Admin';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Admin', () => {
  const fakeAxios = {
    get(url) {
      return Promise.resolve({
        data: [
          {
            id: 1,
            name: "1610-BE"
          }
        ]
      })
    }
  }

  it('renders admin page with links of cohorts', () => {
    const restore = Admin.prototype.retrieveCohorts
    const mock = Admin.prototype.retrieveCohorts = jest.fn()
    const wrapper = mount(<Router><Admin conn={fakeAxios} /></Router>)
    expect(wrapper.find('.Admin').length).toEqual(1)
    expect(wrapper.find('.cohort-list').length).toEqual(1)
    Admin.prototype.retrieveCohorts = restore
  })

  describe('#retrieveCohorts', () => {
    it('is called on componentDidMount', () => {
      const restore = Admin.prototype.retrieveCohorts
      const mock = Admin.prototype.retrieveCohorts = jest.fn()
      const wrapper = mount(<Router><Admin conn={fakeAxios} /></Router>)
      expect(mock).toHaveBeenCalled()

      Admin.prototype.retrieveCohorts = restore
    })

    it('returns data', async () => {
      const admin = new Admin()
      const data = await admin.retrieveCohorts(fakeAxios)
      expect(data[0].name).toEqual("1610-BE")
    })
  })
})
