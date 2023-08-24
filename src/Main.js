import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import './main.scss';

function round2dec(value){
  return (Math.round(value * 100) / 100).toFixed(2);
}

function Day({date, handleShow}) {

  var transaction1 = round2dec(-5.03);
  var transaction2 = round2dec(-105.06);
  var transaction3 = round2dec(120.04);
  var transaction4 = round2dec(-54.20);
  var end_amount = round2dec(parseFloat(transaction1) + parseFloat(transaction2) + parseFloat(transaction3) + parseFloat(transaction4));

  return(
    <Table className='date_cell' borderless onClick={handleShow}>
      <tbody>
        <tr>
          <td className='date_cells date'>{date}</td>
          <td className='date_cells date_bill text-end'>-</td>
        </tr>
        <tr>
          <td className='date_cells'>Iced Coffee</td>
          <td className='date_cells text-end' style={{color: transaction1 < 0 ? "red" : "black"}}>{transaction1}</td>
        </tr>
        <tr>
          <td className='date_cells'>Groceries</td>
          <td className='date_cells text-end' style={{color: transaction2 < 0 ? "red" : "black"}}>{transaction2}</td>
        </tr>
        <tr>
          <td className='date_cells'>Coco's</td>
          <td className='date_cells text-end' style={{color: transaction3 < 0 ? "red" : "black"}}>{transaction3}</td>
        </tr>
        <tr>
          <td className='date_cells'>Petrol</td>
          <td className='date_cells text-end' style={{color: transaction4 < 0 ? "red" : "black"}}>{transaction4}</td>
        </tr>
        <tr>
          <td className='date_cells date_end_amount'></td>
          <td className='date_cells date_end_amount text-end' style={{color: end_amount < 0 ? "red" : "black"}}>{end_amount}</td>
        </tr>
      </tbody>
    </Table>
  );
}

// function Example() {
//   // const [show, setShow] = useState(false);

//   // const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);

//   return (
//     <>
//       {/* <Button variant="primary" onClick={handleShow}>
//         Launch static backdrop modal
//       </Button> */}

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Modal title</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           I will not close if you click outside me. Don not even try to press
//           escape key.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary">Understood</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

function Main() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dates_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
  let dates = [];
  let weeks = [];

  let day = 1;
  for (let week= 0; week < 6; week++) {
    for (day; day <= dates_numbers.length; day++) {
      dates.push(<td key={day}><Day date={dates_numbers[day-1]} handleShow={handleShow}></Day></td>);
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Monday 01/12/23</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className='date_cell' borderless hover>
            <tbody>
              <tr>
                <td className='date_cells modal_list_title'>Transactions</td>
                <td className='date_cells modal_list_title'>Amount</td>
              </tr>
              <tr>
                <td className='date_cells'>Iced Coffee</td>
                <td className='date_cells text-end' style={{color: -5.03 < 0 ? "red" : "black"}}>-5.03</td>
              </tr>
              <tr>
                <td className='date_cells'>Groceries</td>
                <td className='date_cells text-end' style={{color: -105.06 < 0 ? "red" : "black"}}>-105.06</td>
              </tr>
              <tr>
                <td className='date_cells'>Coco's</td>
                <td className='date_cells text-end' style={{color: 120.04 < 0 ? "red" : "black"}}>120.04</td>
              </tr>
              <tr>
                <td className='date_cells'>Petrol</td>
                <td className='date_cells text-end' style={{color: -54.2 < 0 ? "red" : "black"}}>-54.2</td>
              </tr>
              <tr>
                <td className='date_cells date_end_amount'></td>
                <td className='date_cells date_end_amount text-end' style={{color: -44.25 < 0 ? "red" : "black"}}>-44.25</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="col-md-3" onClick={handleClose}>Save</Button>
        </Modal.Footer>
      </Modal>
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
            {/* <tr>
              <td><Day date={1} handleShow={handleShow}></Day></td>
              <td><Day date={2}></Day></td>
              <td><Day date={3}></Day></td>
              <td><Day date={4}></Day></td>
              <td><Day date={5}></Day></td>
              <td><Day date={6}></Day></td>
              <td><Day date={7}></Day></td>
            </tr>
            <tr>
              <td><Day date={8}></Day></td>
              <td><Day date={9}></Day></td>
              <td><Day date={10}></Day></td>
              <td><Day date={11}></Day></td>
              <td><Day date={12}></Day></td>
              <td><Day date={13}></Day></td>
              <td><Day date={14}></Day></td>
            </tr>
            <tr>
              <td><Day date={15}></Day></td>
              <td><Day date={16}></Day></td>
              <td><Day date={17}></Day></td>
              <td><Day date={18}></Day></td>
              <td><Day date={19}></Day></td>
              <td><Day date={20}></Day></td>
              <td><Day date={21}></Day></td>
            </tr>
            <tr>
              <td><Day date={22}></Day></td>
              <td><Day date={23}></Day></td>
              <td><Day date={24}></Day></td>
              <td><Day date={25}></Day></td>
              <td><Day date={26}></Day></td>
              <td><Day date={27}></Day></td>
              <td><Day date={28}></Day></td>
            </tr>
            <tr>
              <td><Day date={29}></Day></td>
              <td><Day date={30}></Day></td>
              <td><Day date={31}></Day></td>
              <td><Day date={32}></Day></td>
              <td><Day date={33}></Day></td>
              <td><Day date={34}></Day></td>
              <td><Day date={35}></Day></td>
            </tr>
            <tr>
              <td><Day date={36}></Day></td>
              <td><Day date={37}></Day></td>
            </tr> */}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Main;
