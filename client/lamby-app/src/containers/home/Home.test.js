import React from 'react';
import ReactDom from 'react-dom';
import {
  cleanup,
  getByTestId,
  render,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import Home from './Home';

afterEach(cleanup);
it('renders correctly Home-Page', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Home />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
