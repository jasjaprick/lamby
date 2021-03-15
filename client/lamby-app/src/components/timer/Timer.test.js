import ReactDom from 'react-dom';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-test-renderer/shallow';
import Timer from './Timer';

const timerMock = {
  data: {
    match: {
    id: 0,
    homeTeam: 'barca',
    awayTeam: 'madrid',
    formation: '4-3-3',
    venue: 'Old Trafford',
    date:"2021-04-14T15:00:00.000Z" ,
   
    }
   
  
  }
}



it('should log a user in', () => {
const AppStateContext = React.createContext(timerMock);
    const { getByText } = render(
    < MyContext.Provider; value={data}>
    <Timer />
  </ MyContext.Provider>
  );
    
 })


afterEach(cleanup);

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

test('mock hook', () => {
  timerContextMock.mockReturnValue(AppStateContext);
  const { getByTestId } = new ShallowRenderer().render(<Timer />);
  const time = getByTestId('day');
  console.log(time.innerHTML);
  console.log();
});
