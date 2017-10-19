import React, {Component} from 'react';

import netprise from '../resources/dataSource';

class PageOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            dataSource: netprise,
            data: [],
            dataUpdate: [],
            updateUser: false,
            creditData: null,
            debitData: null,
            searchItem: null,
            isUpdatedDataView: false,
            set1: false,
            noResults: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updatPrice = this.updatPrice.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    updatPrice() {
        console.log(this.state.creditData, this.state.debitData);
        this.state.dataUpdate.transaction.credit = this.state.creditData;
        this.state.dataUpdate.transaction.debit = this.state.debitData;
        this.setState({
            isUpdatedDataView: true,
            set1: true,
        });
        console.log("dataUpdate : ", JSON.stringify(this.state.dataUpdate));
    }

    handleChange({target}) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleTextChange({target}) {
        this.setState({
            [target.name]: target.value
        });
        if(this.state.searchItem.length > 3){
            console.log("searchItem :: " ,this.state.searchItem);

            fetch('https://api.github.com/search/users?q=abc')
            .then((response) => {
                console.log("asdasd" , JSON.stringify(response));
                return response;
                console.log("asdasd" , JSON.stringify(response));
            })
            .then((data) => {
                console.log("data" , JSON.stringify(data));
                return data;
                console.log("data" , JSON.stringify(data));
            })
            .catch( () => {
                return false;
            })

        }

    }

    updatePrice(userData) {
        this.setState({
            updateUser: true,
            dataUpdate: userData,
        });
        console.log("dataUpdate :: ", JSON.stringify(this.state.dataUpdate));
    }

    handleSubmit(event) {
        let inputEntered = this.state.value.trim();
        var finalData = this.state.dataSource.filter((ele) => {
            if (ele.id == inputEntered) {
                return ele;
            }
        });
        if(finalData.length === 0){
            this.setState({
                noResults : true,
            })
        }else{
            this.setState({
                noResults : false,
            })
        }
        this.setState({
            data: finalData,
            updateUser: false,
        });
        event.preventDefault();
    }

    render() {
        const dataFound = this.state.dataSource.map((ele) => {
            return <li key={ele.id} onClick={() => this.updatePrice(ele)}>
                <div>Account Number : <span>{ele.id}</span></div>
                <div>Customer Name : <span>{ele.name}</span></div>
                <div>Account Balance : <span>{ele.credit}</span></div>
            </li>
        });
        const searchedData = this.state.data.map((ele) => {
            return <li >
                <div>Account Number : <span>{ele.id}</span></div>
                <div>Customer Name : <span>{ele.name}</span></div>
                <div>Account Balance : <span>{ele.credit}</span></div>
                <div>Credit Balance : <span>{ele.transaction.credit}</span></div>
                <div>Debit Balance : <span>{ele.transaction.credit}</span></div>
                <button  key={ele.id}  className="button--container" onClick={ () => this.updatePrice(ele)}>Update Account </button>
            </li>
        });

        return (
            <div className="container--page clearfix">
                <div className="headerwrapper">
                    <div className="center__page">
                        <h4 className="title title__light"> Netprise Task</h4>
                    </div>
                </div>
                <div className="column-main">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="input input--box">
                            <input type="text"
                                   name="value"
                                   placeholder="Enter customer id" value={this.state.value}
                                   onChange={this.handleChange}/>

                        </div>
                        <div className="submit--button">
                            <input type="submit" value="Search"/>
                        </div>
                    </form>
                    <div className="center__page center no--result">{ this.state.noResults ? (<p>No Search Results</p>) : null}</div>
                    <div className="data__found center__page pull--left">
                        <nav className="customer--details">
                            <ul>
                                {searchedData}
                            </ul>
                        </nav>
                    </div>
                    {this.state.updateUser ? (<div className="userupdate center__page">
                        <div className="form__container">

                            <div>
                                <h4>Update the Credit Amount </h4>
                                <input
                                    type="text"
                                    name="creditData"
                                    className="input--update"
                                    placeholder="Enter Credit Amount"
                                    value={ this.state.creditData }
                                    onChange={ this.handleChange }
                                />
                            </div>

                            <div>
                                <h4>Update the Debit Amount </h4>
                                <input
                                    type="text"
                                    className="input--update"
                                    name="debitData"
                                    placeholder="Enter Debit Amount"
                                    value={ this.state.debitData }
                                    onChange={ this.handleChange }
                                />
                            </div>

                            <div className="submit--button">
                                <button value="Send" onClick={ this.updatPrice }>Submit</button>
                            </div>
                        </div>
                    </div> ) : null}
                    {this.state.updateUser && this.state.isUpdatedDataView ? (
                        <div className="data__found center__page pull--left">
                            <nav className="customer--details">
                                <ul>
                                    {this.state.set1 ?
                                        <div>
                                            <h4>Update Value is </h4>
                                            <li>
                                                <div>Account Number : <span>{this.state.dataUpdate.id}</span></div>
                                                <div>Customer Name : <span>{this.state.dataUpdate.name}</span></div>
                                                <div>Account Balance : <span>{this.state.dataUpdate.credit}</span></div>
                                                <div>Credit Balance :
                                                    <span>{this.state.dataUpdate.transaction.credit}</span></div>
                                                <div>Debit Balance : <span>{this.state.dataUpdate.transaction.credit}</span>
                                                </div>
                                            </li>
                                        </div>
                                        : null }
                                </ul>
                            </nav>
                        </div>) : null}
                </div>
                <div id="abd" className="column-side">
                    <div className="searchBox">
                        <input
                            type="text"
                            name="searchItem"
                            className="input--update"
                            placeholder="Enter something"
                            value={ this.state.searchItem }
                            onChange={ this.handleTextChange }
                        />
                    </div>
                    <div>
                        <h4>Items Searched :: </h4>
                        <div>
                            aaa
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default PageOne;
