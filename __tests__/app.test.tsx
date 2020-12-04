import * as React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/main/App';

test('Hello, Electron & React', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
