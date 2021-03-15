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

it('Time component is being renders', () => {
  const div = document.createElement('div');
  ReactDom.render(<Timer></Timer>, div);
  ReactDom.unmountComponentAtNode(div);
});

it('timeleft is being renders', () => {
  const { getByTestId } = render(<Timer />);
  const day = getByTestId('day');
  const mins = getByTestId('mins');
  const hour = getByTestId('hour');
  const sec = getByTestId('sec');
  expect(hour).toBeInTheDocument();
  expect(mins).toBeInTheDocument();
  expect(sec).toBeInTheDocument();
  expect(day).toBeInTheDocument();
});
