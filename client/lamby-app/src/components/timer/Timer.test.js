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

import Timer from './Timer';

const AppStateContext = {
  id: 0,
  homeTeam: 'barca',
  awayTeam: 'madrid',
  formation: '4-3-3',
  venue: 'Old Trafford',
  date: {
    days: 2,
    hours: 20,
    minutes: 30,
    seconds: 10,
  },
};
jest.fn(AppStateContext);

afterEach(cleanup);

it('it renders Time component', () => {
  const div = document.createElement('div');
  ReactDom.render(<Timer></Timer>, div);
  ReactDom.unmountComponentAtNode(div);
});

it('it render the day left', () => {
  const { getByTestId } = render(<Timer />);
  const time = getByTestId('day');
  console.log(time.innerHTML);
  expect(time).toBeInTheDocument();
});

it('it render the hours left', () => {
  const { getByTestId } = render(<Timer />);
  const time = getByTestId('hour');
  expect(time).toBeInTheDocument();
});
it('it render the minutes left', () => {
  const { getByTestId } = render(<Timer />);
  const time = getByTestId('mins');
  expect(time).toBeInTheDocument();
});
it('it render the sec left', () => {
  const { getByTestId } = render(<Timer />);
  const time = getByTestId('sec');
  expect(time).toBeInTheDocument();
});
