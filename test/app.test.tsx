import * as React from 'react'
import { mount, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import App from '../src/renderer/App'

configure({ adapter: new Adapter() })

test('Welcome to Electron', () => {
  const wrapper = mount(<App />)
  const p = wrapper.find('header p')
  expect(p.text()).toBe('使用 Electron 和 React 构建跨平台的桌面应用')
})
