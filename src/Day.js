import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class Day extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formValues: [{ item: "Iced Coffee", amount: "-5"}, { item: "Groceries", amount: "-100"}, { item: "Coco's", amount: "120"}, { item: "Petrol", amount: "-75"}],
            tempFormValues: [],
            show: false
        };
    }

    handleShow = () => {
        this.setState({ tempFormValues: [...this.state.formValues]});
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({ formValues: [...this.state.tempFormValues]});
        alert(JSON.stringify(this.state.tempFormValues));
        this.setState({show: false});
    }

    handleCloseNotSave = () => {
        alert(JSON.stringify(this.state.tempFormValues));
        this.setState({show: false});
    }

    addFormFields = () => {
        this.setState({ tempFormValues: [...this.state.tempFormValues, { item: "", amount: ""}]});
    }

    removeFormFields = (i) => {
        let newFormValues = [...this.state.tempFormValues];
        newFormValues.splice(i, 1);
        this.setState({ tempFormValues: [...newFormValues]});
    }

    handleChange = (i, e) => {
        const newFormValues = this.state.tempFormValues.map((currentFormValue, index) => {
          if (index === i) {
            return {
              ...currentFormValue,
              [e.target.name]: e.target.value,
            };
          } else {
            return currentFormValue;
          }
        });
        this.setState({ tempFormValues: [...newFormValues]});
    }

    parse_transaction_amount = (amount) => {
        if (isNaN(+amount)) {
            return 0;
        } else {
            return parseFloat(amount);
        }
    }

    end_amount = () => {
        let end_amount = this.parse_transaction_amount(this.transaction_amount(0)) + this.parse_transaction_amount(this.transaction_amount(1)) + this.parse_transaction_amount(this.transaction_amount(2)) + this.parse_transaction_amount(this.transaction_amount(3));
        if (end_amount === 0 || isNaN(+end_amount)) {
            return <span style={{color: "rgb(242,242,242)"}}>0</span>;
        } else {
            return end_amount;
        }
    }

    transaction_amount = (index) => {
        if (this.state.formValues[index] !== undefined) {
            if ((this.state.formValues[index].item === "") && (this.state.formValues[index].amount === "")) {
                return <span style={{color: "white"}}>0</span>;
            }  
            return (this.state.formValues[index].amount);
        }
        return <span style={{color: "white"}}>0</span>;
    }

    transaction_item = (index) => {
        if (this.state.formValues[index] !== undefined) {
            if ((this.state.formValues[index].item === "") && (this.state.formValues[index].amount === "")) {
                return <span style={{color: "white"}}>0</span>;
            }  
            return (this.state.formValues[index].item);
        }
        return <span style={{color: "white"}}>0</span>;
    }

    render() {
        return (
            <>
            <Modal
                show={this.state.show}
                onHide={this.handleCloseNotSave}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    Monday 01/12/23
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-auto">
                {this.state.tempFormValues.map((element, index) => (
                    <div className="d-flex flex-row" key={index}>
                    <input class="form-control m-1" type="text" placeholder="Item" name="item" value={element.item} onChange={e => this.handleChange(index, e)} />
                    <input class="form-control m-1" type="text" placeholder="Amount" name="amount" value={element.amount} onChange={e => this.handleChange(index, e)} />
                    <IconButton aria-label="delete" onClick={() => this.removeFormFields(index)}><DeleteIcon fontSize="inherit" /></IconButton>
                    </div>       
                ))}       
                </Modal.Body>
                <Modal.Footer>
                <Button className="col-md-3" onClick={() => this.addFormFields()}>Add</Button>
                <Button variant="primary" className="col-md-3" onClick={this.handleClose}>Save</Button>
                </Modal.Footer>
            </Modal>
            <Table className='date_cell' borderless onClick={this.handleShow}>
                <tbody>
                <tr>
                    <td className='date_cells date'>{this.props.date}</td>
                    <td className='date_cells date_bill text-end'>-</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.transaction_item(0)}</td>
                    <td className='date_cells text-end' style={{color: this.transaction_amount(0) < 0 ? "red" : "black"}}>{this.transaction_amount(0)}</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.transaction_item(1)}</td>
                    <td className='date_cells text-end' style={{color: this.transaction_amount(1) < 0 ? "red" : "black"}}>{this.transaction_amount(1)}</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.transaction_item(2)}</td>
                    <td className='date_cells text-end' style={{color: this.transaction_amount(2) < 0 ? "red" : "black"}}>{this.transaction_amount(2)}</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.transaction_item(3)}</td>
                    <td className='date_cells text-end' style={{color: this.transaction_amount(3) < 0 ? "red" : "black"}}>{this.transaction_amount(3)}</td>
                </tr>
                <tr>
                    <td className='date_cells date_end_amount'></td>
                    <td className='date_cells date_end_amount text-end' style={{color: this.end_amount < 0 ? "red" : "black"}}>{this.end_amount()}</td>
                </tr>
                </tbody>
            </Table>
            </>
        );
    }
}

export default Day;