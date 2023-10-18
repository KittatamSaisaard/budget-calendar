import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import './main.scss';
import Day from './Day.js';

//Might use in the future
function round2dec(value){
  return (Math.round(value * 100) / 100).toFixed(2);
}

function Main() {

  const dates_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
  let dates = [];
  let weeks = [];

  let day = 1;
  for (let week= 0; week < 6; week++) {
    for (day; day <= dates_numbers.length; day++) {
      dates.push(<td key={day}><Day date={dates_numbers[day-1]}></Day></td>);
      if (day % 7 === 0) {
        day++;
        break;
      }
    }
    weeks.push(<tr key={week}>{dates}</tr>);  
    dates = [];
  }
  
  return (
    <>
      <Navbar className="bg-dark-subtle bg-gradient">
        <Container>
          <Navbar.Brand href="#home" className="text-secondary">Budget Calendar</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="p-3">
        <Table>
          <thead>
            <tr>
              <th><div className="days_of_week">Monday</div></th>
              <th><div className="days_of_week">Tuesday</div></th>
              <th><div className="days_of_week">Wednesday</div></th>
              <th><div className="days_of_week">Thursday</div></th>
              <th><div className="days_of_week">Friday</div></th>
              <th><div className="days_of_week">Saturday</div></th>
              <th><div className="days_of_week">Sunday</div></th>
            </tr>
          </thead>
          <tbody>
            {weeks}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Main;
