import React from 'react';
import Table from 'react-bootstrap/Table';

class Day extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formValues: this.props.transactions
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.transactions !== prevProps.transactions) {
          this.setState({formValues: this.props.transactions})
        }
       }

    parse_transaction_amount = (amount) => {
        if (isNaN(+amount)) {
            return 0;
        } else {
            return parseFloat(amount);
        }
    }

    // end_amount = () => {
    //     let end_amount = 0

    //     this.state.formValues[String(this.props.date)+"012000"]?.forEach(transaction => {
    //         end_amount += this.parse_transaction_amount(transaction.amount)
    //     });

    //     if(this.props.day_totals[String(this.props.date-1)+"012000"] !== undefined) {
    //         for (let date = this.props.date-1; date >= 1; date--) {
    //             end_amount += this.props.day_totals[String(date)+"012000"]
    //         }
    //     } else {
    //         for (let date = this.props.date-1; date >= 1; date--) {
    //             if (this.props.day_totals[String(date)+"012000"] !== undefined) {
    //                 for (let definedDate = date; definedDate >= 1; definedDate--) {
    //                     end_amount += this.props.day_totals[String(definedDate)+"012000"]
    //                 }
    //                 // end_amount = this.props.day_totals[String(date)+"012000"]
    //                 break;
    //             }
    //         }
    //     }
        
    //     if (end_amount === 0 || isNaN(+end_amount)) {
    //         return 0;//<span style={{color: "rgb(242,242,242)"}}>0</span>;
    //     } else {
    //         return end_amount.toFixed(2);
    //     }
    // }

    // transaction_amount = (index) => {
    //     if (this.state.formValues[String(this.props.date)+"012000"] !== undefined && this.state.formValues[String(this.props.date)+"012000"][index] !== undefined) {
    //         if ((this.state.formValues[String(this.props.date)+"012000"][index].item === "") && (this.state.formValues[String(this.props.date)+"012000"][index].amount === "")) {
    //             return <span style={{color: "white"}}>0</span>;
    //         }  
    //         return (this.parse_transaction_amount(this.state.formValues[String(this.props.date)+"012000"][index].amount).toFixed(2));
    //     }
    //     return <span style={{color: "white"}}>0</span>;
    // }

    // transaction_item = (index) => {
    //     if (this.state.formValues[String(this.props.date)+"012000"] !== undefined && this.state.formValues[String(this.props.date)+"012000"][index] !== undefined) {
    //         if ((this.state.formValues[String(this.props.date)+"012000"][index].item === "") && (this.state.formValues[String(this.props.date)+"012000"][index].amount === "")) {
    //             return <span style={{color: "white"}}>0</span>;
    //         }
    //         return (this.state.formValues[String(this.props.date)+"012000"][index].item);
    //     }
    //     return <span style={{color: "white"}}>0</span>;
    // }

    render() {
        return (
            <Table className='date_cell' borderless>
                <tbody>
                <tr>
                    <td className='date_cells date'>{parseInt(this.props.date.slice(0, 2))}</td>
                    <td className='date_cells date_bill text-end'>-</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.props.financialData?.transactions[0]?.item || <span style={{color: "white"}}>0</span>}</td>
                    <td className='date_cells text-end' style={{color: this.props.financialData?.transactions[0]?.amount < 0 ? "red" : "black"}}>{this.props.financialData?.transactions[0]?.amount}</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.props.financialData?.transactions[1]?.item || <span style={{color: "white"}}>0</span>}</td>
                    <td className='date_cells text-end' style={{color: this.props.financialData?.transactions[1]?.amount < 0 ? "red" : "black"}}>{this.props.financialData?.transactions[1]?.amount}</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.props.financialData?.transactions[2]?.item || <span style={{color: "white"}}>0</span>}</td>
                    <td className='date_cells text-end' style={{color: this.props.financialData?.transactions[2]?.amount < 0 ? "red" : "black"}}>{this.props.financialData?.transactions[2]?.amount}</td>
                </tr>
                <tr>
                    <td className='date_cells'>{this.props.financialData?.transactions[3]?.item || <span style={{color: "white"}}>0</span>}</td>
                    <td className='date_cells text-end' style={{color: this.props.financialData?.transactions[3]?.amount < 0 ? "red" : "black"}}>{this.props.financialData?.transactions[3]?.amount}</td>
                </tr>
                <tr>
                    <td className='date_cells date_end_amount'><span style={{color: "rgb(242,242,242)"}}>0</span></td>
                    <td className='date_cells date_end_amount text-end' style={{color: this.props.financialData?.availableFunds < 0 ? "red" : "black"}}>{this.props.financialData?.availableFunds}</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}

export default Day;