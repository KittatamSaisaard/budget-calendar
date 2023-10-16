import React from 'react';
import Table from 'react-bootstrap/Table';

class Day extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            transaction: []
        };
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
        if (this.props.transactions[index] !== undefined) {
            if ((this.props.transactions[index].item === "") && (this.props.transactions[index].amount === "")) {
                return <span style={{color: "white"}}>0</span>;
            }  
            return (this.props.transactions[index].amount);
        }
        return <span style={{color: "white"}}>0</span>;
    }

    transaction_item = (index) => {
        if (this.props.transactions[index] !== undefined) {
            if ((this.props.transactions[index].item === "") && (this.props.transactions[index].amount === "")) {
                return <span style={{color: "white"}}>0</span>;
            }  
            return (this.props.transactions[index].item);
        }
        return <span style={{color: "white"}}>0</span>;
    }

    render() {
        return (
            <Table className='date_cell' borderless onClick={this.props.handleShow}>
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
        );
    }
}

export default Day;