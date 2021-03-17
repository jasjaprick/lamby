import ReactDom from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import Timer from './Timer';
import { createMemoryHistory } from 'history';
import { AppStateContext } from '../../context/AppContext';
let result = [];

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

  let { getByTestId } = render(
    <AppStateContext.Provider value={timerMock}>
      <Router history={history}>
        <Timer />
      </Router>
    </AppStateContext.Provider>
  );

  let days = parseInt(getByTestId('day').innerHTML);
  let hours = parseInt(getByTestId('hour').innerHTML);
  let mins = parseInt(getByTestId('mins').innerHTML);
  let secs = parseInt(getByTestId('sec').innerHTML);

  expect(days >= 0).toBeTruthy();
  expect(hours >= 0 && hours <= 23).toBeTruthy();
  expect(mins >= 0 && mins <= 59).toBeTruthy();
  expect(secs >= 0 && secs <= 59).toBeTruthy();
});

it('rendering right time left', async () => {
  const history = createMemoryHistory();
  const route = '/home';
  history.push(route);

  const mockDate = new Date().getTime();
  const spyDate = jest.spyOn(Date, 'now');
  spyDate.mockImplementationOnce(() => {
    return mockDate;
  });
  console.log('mockDate----------', mockDate);

  let { getByTestId } = render(
    <AppStateContext.Provider value={timerMock}>
      <Router history={history}>
        <Timer />
      </Router>
    </AppStateContext.Provider>
  );

  let mins = parseInt(getByTestId('mins').innerHTML);
  let secs = parseInt(getByTestId('sec').innerHTML);
  let day = parseInt(getByTestId('day').innerHTML);
  let hour = parseInt(getByTestId('hour').innerHTML);

  //console.log('timeeeeeeeee', mins + secs);
});

it('it renders Time component', () => {
  const div = document.createElement('div');
  ReactDom.render(<Timer></Timer>, div);
  ReactDom.unmountComponentAtNode(div);
});

it('it render the time left', () => {
  const { getByTestId } = render(<Timer />);
  const day = getByTestId('day');
  expect(day).toBeInTheDocument();
  const hour = getByTestId('hour');
  expect(hour).toBeInTheDocument();
  const mins = getByTestId('mins');
  expect(mins).toBeInTheDocument();
  const sec = getByTestId('sec');
  expect(sec).toBeInTheDocument();
});

// test('mock hook', () => {
//   timerContextMock.mockReturnValue(AppStateContext);
//   const { getByTestId } = new ShallowRenderer().render(<Timer />);
//   const time = getByTestId('day');
//   console.log(time.innerHTML);
//   console.log();
// });
