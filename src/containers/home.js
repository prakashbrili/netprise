import React, { Component } from 'react';
import dataSource from '../resources/dataSource';
import classNames from 'classnames';

class Home extends Component {

  constructor(props) {
      super(props);
      this.state = {
          checkoutPopup : false,
          dataSource: dataSource,
          addedEle: [],
      };
  }

  proceedToCheckout(){
    console.log(" pop up opened");
    this.setState({
        checkoutPopup : !this.state.checkoutPopup,
    })
  }
  addCount(){

  }

  addToCart(id) {
    const findObj = this.state.dataSource.find((i) => {
      return i.id === id;
    });
    findObj['added'] = true;
    // console.log('this.state.datasource', JSON.stringify(this.state.dataSource));
    this.setState({
        dataSource: this.state.dataSource,
    });
    //var addedEle = [];
    this.state.addedEle = this.state.dataSource.filter((obj) =>{
            if(obj.added){
                return obj;
            }
        }
    );
    console.log("this.state.addedEle :: " ,JSON.stringify(this.state.addedEle));
  }
  render() {
    const checkoutPopup = (
        <div className="checkoutoverlay">
            <div className="checkoutContainer clearfix">
              <div>

              </div>
              <div className="checkoutContent">
                <h4>ORDER SUMMARY <span className="edit_button">Edit</span></h4>
                <div className="line"></div>
                <div className="popup_main">
                    <nav>
                      <ul className="checkout_final">
                          {this.state.addedEle.map((obj) =>{
                              return <li>{obj.id}</li>
                          })}
                      </ul>
                    </nav>
                </div>
                <div className="popup_side">
                  <nav>
                    <ul>
                      <li>
                        <ul>
                          <li><div className="imagecheckout"></div></li>
                          <li className="pro_det">
                          </li>
                          <li>
                            <i className="fa fa-minus-circle" onClick={ this.addCount} aria-hidden="true"></i>
                            <span>1</span>
                            <i className="fa fa-plus-circle" onClick={ this.addCount} aria-hidden="true"></i>
                          </li>
                          <li>$<span>20.00</span></li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                  <div className="line"></div>
                  <div className="selected_prod">
                    <a onClick={ () => this.proceedToCheckout()} className="addtocart proceedToCheckout">Proceed to Payment</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
    return (
        <div className="home_wrapper clearfix">
          {this.state.checkoutPopup ? checkoutPopup : null}
          <div className="home_content">
            <h2>All Products</h2>
            <h4 className="line_out"><span>Complete range of products for all you need</span></h4>
          </div>

          <div className="product_container clearfix">
            <div className="column_main">
              <div className="menu_sorting">
                <ul>
                  <li>
                    <span>Short By :</span> <a className="sortButton" onClick={ () => this.sortbutton()}>Sort (A-Z)</a>
                  </li>
                  <li><i className="fa fa-list-ul" aria-hidden="true"/></li>
                  <li><i className="fa fa-th" aria-hidden="true"/></li>
                </ul>
              </div>
              <div className="line"></div>
              <nav className="product">
                <ul>

                  {this.state.dataSource.map((data) => (
                    <li key={data.key}>
                      <div className="prods">
                        <span className="prod_id">{data.id}</span>
                        <div className="prod_image_container">
                          <img src={data.img_url} className="product_image"/>
                        </div>
                        <div className="prod_details">
                          <p>{data.name}</p>
                          <p>{data.type}</p>
                          <p>Price : <span>{data.type === 'fiction' ? data.price - data.price * 15 / 100 : data.price}</span></p>
                          <p className="discount_name">Discount:
                              {data.type === 'fiction' ? <span>15%</span>: 'NA'}
                          </p>
                          {<a className={classNames('addtocart', data.added ? 'addedtocart': '' )} onClick={() => this.addToCart(data.id)}>Add to Cart</a>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="column_side">
              <div className="prod_sel">
                <h4>Total</h4>
                <div className="line"></div>
                <ul className="checkout_final">
                    {this.state.addedEle.map((obj) =>{
                      return <li>{obj.id}</li>
                    })}
                </ul>
              </div>
              <div className="line"></div>
              <div className="selected_prod">
                  <a onClick={ () => this.proceedToCheckout()} className="addtocart proceedToCheckout">Proceed to Checkout</a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
