import ReactDom from 'react-dom';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import Timer from './Timer';
import { createMemoryHistory } from 'history';
import { AppStateContext } from '../../context/AppContext';
let result = [];
let timerCheck = [];

afterEach(cleanup);
const timerMock = {
  data: {
    match: {
      id: 0,
      homeTeam: 'barca',
      awayTeam: 'madrid',
      formation: '4-3-3',
      venue: 'Old Trafford',
      date: '2021-04-14T15:00:00.000Z',
    },
  },
};
it('rendering right format', async () => {
  const history = createMemoryHistory();
  const route = '/home';
  history.push(route);
  const mockDate = new Date().getTime();
  const spyDate = jest.spyOn(Date, 'now');
  spyDate.mockImplementationOnce(() => {
    return mockDate;
  });
  result.push(mockDate);
  render(
    <AppStateContext.Provider value={timerMock}>
      <Router history={history}>
        <Timer />
      </Router>
    </AppStateContext.Provider>
  );

  let days = parseInt(screen.getByTestId('day').innerHTML);
  let hours = parseInt(screen.getByTestId('hour').innerHTML);
  let mins = parseInt(screen.getByTestId('mins').innerHTML);
  let secs = parseInt(screen.getByTestId('sec').innerHTML);
  let timeToCompare = changtime(days, hours, mins, secs);
  timerCheck.push(timeToCompare);

  expect(days >= 0).toBeTruthy();
  expect(hours >= 0 && hours <= 23).toBeTruthy();
  expect(mins >= 0 && mins <= 59).toBeTruthy();
  expect(secs >= 0 && secs <= 59).toBeTruthy();
});

it('time is left', async () => {
  const history = createMemoryHistory();
  const route = '/home';
  history.push(route);
  const mockDate = new Date().getTime() + 10000;
  const spyDate = jest.spyOn(Date, 'now');
  spyDate.mockImplementationOnce(() => {
    return mockDate;
  });
  result.push(mockDate);

  render(
    <AppStateContext.Provider value={timerMock}>
      <Router history={history}>
        <Timer />
      </Router>
    </AppStateContext.Provider>
  );
  let days = parseInt(screen.getByTestId('day').innerHTML);
  let hours = parseInt(screen.getByTestId('hour').innerHTML);
  let mins = parseInt(screen.getByTestId('mins').innerHTML);
  let secs = parseInt(screen.getByTestId('sec').innerHTML);
  let timeToCompare = changtime(days, hours, mins, secs);
  timerCheck.push(timeToCompare);
  expect(timerCheck[0] - timerCheck[1] <= 10000).toBeTruthy();

  console.log(timerCheck[0], timerCheck[1]);
  console.log(timerCheck[0] - timerCheck[1]);
  console.log(parseInt(result[1] - result[0]));
});

function changtime(days, hours, mins, secs) {
  const d = days * 24 * 60 * 60;
  const h = hours * 60 * 60;
  const m = mins * 60;
  return (d + h + m + secs) * 1000;
}
