import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import './main.scss';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Day from './Day.js';

function Main() {

const [financialData, setFinancialData] = useState({
  "01-01-2000": {
    transactions: [
      { item: "Tea", amount: -5},
      { item: "Milk", amount: -100},
      { item: "Car", amount: 120},
      { item: "Oil", amount: -5}
    ],
    availableFunds: 10
  },
  "02-01-2000": {
    transactions: [
      { item: "asd", amount: 0}, 
      { item: "Mk", amount: 104}, 
      { item: "we", amount: 1}, 
      { item: "sdfds", amount: -35}
    ],
    availableFunds: 80
  }
});

const updateAvailableFunds = (date) => {
  setTemporaryData((prevData) => {
    const updatedData = { ...prevData };

    // Update the data for the current date
    const currentDateData = updatedData[date] || { transactions: [] };
    const updatedAvailableFunds = currentDateData.transactions.reduce((total, t) => total + parseFloat(t.amount), 0);

    updatedData[date] = {
      transactions: currentDateData.transactions,
      availableFunds: updatedAvailableFunds,
    };

    // Update the data for all dates past the current date
    const dateList = Object.keys(updatedData);
    const currentDateIndex = dateList.indexOf(date);

    console.log(dateList);

    for (let i = currentDateIndex+1; i < dateList.length; i++) {
      const currentDate = dateList[i];
      const currentData = updatedData[currentDate];
      const prevAvailableFunds = i === 0 ? 0 : updatedData[dateList[i - 1]].availableFunds;
      console.log(updatedData[dateList[i - 1]]);
      console.log(prevAvailableFunds);
      const updatedAvailableFunds = prevAvailableFunds + currentData.transactions.reduce((total, t) => total + parseFloat(t.amount), 0);

      updatedData[currentDate] = {
        transactions: currentData.transactions,
        availableFunds: updatedAvailableFunds,
      };
    }

    return updatedData;
  });
};

const updateTemporaryData = (date, transaction) => {
  setTemporaryData((prevData) => {
    const updatedData = { ...prevData };
    
    const prevDate = getPreviousDate(date);
    const prevAvailableFunds = updatedData[prevDate]?.availableFunds || 0;

    const existingData = prevData[date] || { transactions: [] };
    const newTransactions = [...existingData.transactions, transaction];
    const newAvailableFunds = prevAvailableFunds + newTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    return {
      ...prevData,
      [date]: {
        transactions: newTransactions,
        availableFunds: newAvailableFunds,
      },
    };
  });
};

const getPreviousDate = (currentDate) => {
  const [day, month, year] = currentDate.split('-').map(Number);

  const currentDateObject = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date object
  const previousDateObject = new Date(currentDateObject);
  previousDateObject.setDate(currentDateObject.getDate() - 1);

  const previousDay = String(previousDateObject.getDate()).padStart(2, '0');
  const previousMonth = String(previousDateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 as months are 0-indexed
  const previousYear = previousDateObject.getFullYear();

  return `${previousDay}-${previousMonth}-${previousYear}`;
};

const updateFinancialData = (date, transaction) => {
  setFinancialData((prevData) => {
    const updatedData = { ...prevData };

    const prevDate = getPreviousDate(date);
    const prevAvailableFunds = updatedData[prevDate]?.availableFunds || 0;
    console.log(date);
    console.log(updatedData[prevDate]?.availableFunds);

    const existingData = prevData[date] || { transactions: [] };
    const newTransactions = transaction ? [...existingData.transactions, transaction] : existingData.transactions;
    const newAvailableFunds = prevAvailableFunds + newTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);      
    return {
      ...prevData,
      [date]: {
        transactions: newTransactions,
        availableFunds: newAvailableFunds,
      },
    };
  });
};

const deleteTransaction = (date, index) => {
  setTemporaryData((prevData) => {
    const updatedData = { ...prevData };
    const transactions = [...(updatedData[date]?.transactions || [])];

    // Remove the selected transaction
    transactions.splice(index, 1);

    // Update the transactions and available funds for the selected date
    updatedData[date] = {
      ...updatedData[date],
      transactions,
      availableFunds: transactions.reduce((total, transaction) => parseFloat(total + transaction.amount), 0),
    };

    return updatedData;
  });

  updateAvailableFunds(String(clickedDate));
};

  const [temporaryData, setTemporaryData] = useState({});

  const [clickedDate, setClickedDate] = useState()

  const [show, setShow] = useState(false);

  const handleSaveData = () => {
    setFinancialData(temporaryData);
    setTemporaryData({});
    setShow(false);
  };

  let handleCloseNotSave = () => {
    alert(JSON.stringify(temporaryData));
    console.log(temporaryData);
    setShow(false);
  }
  
  const handleShow = (e) => {
    setClickedDate(e.target.parentElement.parentElement.parentElement.parentElement.id)
    setTemporaryData(JSON.parse(JSON.stringify(financialData)));
    setShow(true);
  }

  const dates_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
  let dates = [];
  let weeks = [];

  let day = 1;
  for (let week= 0; week < 6; week++) {
    for (day; day <= dates_numbers.length; day++) {
      let newfinancialData = JSON.parse(JSON.stringify(temporaryData));
      if (financialData[String(dates_numbers[day-1]).padStart(2, "0")+"-01-2000"] === undefined){
        updateFinancialData(String(dates_numbers[day-1]).padStart(2, "0")+"-01-2000", null);
        newfinancialData[String(dates_numbers[day-1]).padStart(2, "0")+"-01-2000"] = []
      }
      dates.push(<td key={day} onClick={e => handleShow(e)} id={String(dates_numbers[day-1]).padStart(2, "0")+"-01-2000"}><Day /*transactions={formValues}*/ date={String(dates_numbers[day-1]).padStart(2, "0")+"-01-2000"} /*day_totals={day_amount_total_list}*/ financialData={financialData[String(dates_numbers[day-1]).padStart(2, "0")+"-01-2000"]} updateData={updateFinancialData}></Day></td>);
      if (day % 7 === 0) {
        day++;
        break;
      }
    }
    weeks.push(<tr key={week}>{dates}</tr>);  
    dates = [];
  }

  let handleChange = (i, e) => {
    let newfinancialData = JSON.parse(JSON.stringify(temporaryData));
    const newMapfinancialData = temporaryData[String(clickedDate)].transactions.map((currentFormValue, index) => {
      if (index === i) {
        return {
          ...currentFormValue,
          [e.target.name]: e.target.value,
        };
      } else {
        return currentFormValue;
      }
    });
    newfinancialData[String(clickedDate)].transactions = newMapfinancialData;
    const prevDate = getPreviousDate(String(clickedDate));
    const prevAvailableFunds = newfinancialData[prevDate]?.availableFunds || 0;
    const newAvailableFunds = prevAvailableFunds + newMapfinancialData.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    newfinancialData[String(clickedDate)].availableFunds = newAvailableFunds;
    setTemporaryData(newfinancialData);
  }

  const handleAddData = () => {
    const newTransaction = { name: "", amount: null };

    console.log(financialData);
    
    updateTemporaryData(String(clickedDate), newTransaction);
  };

  const handleDeleteTransaction = (date, index) => {
    deleteTransaction(date, index);
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <>
      <Navbar className="bg-dark-subtle bg-gradient">
        <Container>
          <Navbar.Brand href="#home" className="text-secondary">Budget Calendar</Navbar.Brand>
        </Container>
      </Navbar>
      
      <Modal
        show={show}
        onHide={handleCloseNotSave}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Monday {String(clickedDate).replaceAll("-","/")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          {temporaryData[String(clickedDate)]?.transactions.map((element, index) => (
            <div className="d-flex flex-row" key={index}>
              <input class="form-control m-1" type="text" placeholder="Item" name="item" value={element.item} onChange={e => handleChange(index, e)} />
              <input class="form-control m-1" type="text" placeholder="Amount" name="amount" value={element.amount} onChange={e => handleChange(index, e)} />
              <IconButton aria-label="delete" onClick={() => handleDeleteTransaction(String(clickedDate), index)}><DeleteIcon fontSize="inherit" /></IconButton>
            </div>       
          ))}       
        </Modal.Body>
        <Modal.Footer>
          <Button className="col-md-3" onClick={handleAddData}>Add</Button>
          <Button variant="primary" className="col-md-3" onClick={handleSaveData}>Save</Button>
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
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Main;
