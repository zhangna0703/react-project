import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./shop.scss";
import PropTypes from "prop-types";
import { is, fromJS  } from 'immutable';  // 保证数据的不可变
import {imgUrl} from "@/config/envconfig";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import API from "@/api/api"
import AlertTip from '@/components/alert_tip/alert_tip'
import {getImgPath} from '@/utils/commons'

class Shop extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    geohash: PropTypes.array.isRequired
  };
  state = {
    shopId: "",
    shopDetailData: "",
    show: false,
    miniMoney: 0,
    alertText: '请在手机APP中打开',
    active: 'food',
    activeIndex: 0,
    initList: [],
    isShowCart: false,
    totalPrice: 0,
    foodList: [],
    animate: 'cart-icon-container active-icon',
    displayList: [],
    timer: null
  };
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  CartFirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  // 激活购物车
  activeMenu = (index) => {
    this.setState({
      activeIndex: index,
      displayList: this.state.menuList[index].foods
    })
  }
  setFoodList = (menu) => {
    let list = []
    menu.forEach(item => {
      list.push(...item.foods)
    })
    return list
  }
  setNumOfMenu = (menu) => {
    var count = 0
    menu.forEach((outer, o)=> {
        if (menu.length) {
          outer.foods.forEach((inner, i) => {
            inner.num = count
            inner.qty = 0
            count++
          }
      )}
    })
    return menu
  }
  handleClick = (type) => {
    let alertText
    switch (type){
      case 'download':
        alertText = '请到官方网站下载'
        break
      case 'unfinished':
        alertText = '功能尚未开发'
        break
      default:
    }
    this.setState({
      hasAlert: !this.state.hasAlert,
      alertText,
    })
  }
  calculateMoney = () => {
    let totalPrice = 0
    this.state.foodList.forEach(item => {
      totalPrice += item.qty * item.specfoods[0].price
    })
    this.setState({
      totalPrice,
      miniMoney: this.state.shopDetailData.float_minimum_order_amount - totalPrice
    })
  }
  // 清空购物车
  clearCart = () => {
    this.setState({
      foodList: fromJS(this.state.initList).toJS(),
      totalPrice: 0,
      count: 0,
      isShowCart: false,
      miniMoney: 20
    })
  }
  // 初始化数据
  initData = async id => {
    let obj = {
      latitude: this.props.geohash[0],
      longitude: this.props.geohash[1]
    };
    let res = await API.shopDetails(id, obj);
    let menu = await API.getfoodMenu({restaurant_id: id})
    menu = this.setNumOfMenu(menu)
    let foodList = this.setFoodList(menu)
    this.setState({
      shopDetailData: res,
      miniMoney: res.float_minimum_order_amount,
      shopId: id,
      show: !this.state.show,
      menuList: menu,
      initList: fromJS(foodList).toJS(),
      foodList,
      displayList: menu.length?menu[0].foods:[],
      count: 0,
    })
  };
  // 添加, 减少商品
  handleAddFoodCount = (index, type) => {
    let foodList = this.state.foodList
    let nextFoodQty = foodList[index].qty + type
    if (nextFoodQty >= 0) {
      foodList[index].qty += type 
    }
    let nextCount = this.state.count + type
    this.setState({
      foodList,
      count: nextFoodQty<0?this.state.count:nextCount,
      animate: this.state.animate + ' animate'
    })
    this.calculateMoney()
    var timer = setTimeout(()=> {
      this.setState({
        animate: 'cart-icon-container active-icon',
      })}, 200)
      this.setState({timer})
  }
  handleShowCart = () => {
    this.setState({
      isShowCart: !this.state.isShowCart
    })
  }
  changeShowType = (type) => {
    this.setState({
      active: type,
      show: !this.state.show
    })
  }
  goBack = () => {
    this.props.history.push('/msite')
  }
  componentDidMount () {
    let id = this.props.match.params.id;
    this.initData(id);
  }
  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }
  render() {
    return (
      <div className="shop-container">
        <div className="icon-back" onClick={this.goBack} />
        <header className="shop-detail-header">
          <img
            src={imgUrl + this.state.shopDetailData.image_path}
            alt=""
            className="header-cover-img"
          />
          <div className="description-header">
            <Link to="/shop/shopDetail" className="description-top">
              <div className="description-left">
                <img
                  src={imgUrl + this.state.shopDetailData.image_path}
                  alt=""
                />
              </div>
              <div className="description-right">
                <h4 className="description-title">
                  {this.state.shopDetailData.name}
                </h4>
                <p className="description-text">
                  商家配送 / {this.state.shopDetailData.order_lead_time}
                  分钟送达/配送费¥
                  {this.state.shopDetailData.float_delivery_fee}
                </p>
                <p className="description-promotion">
                  公告: {this.state.shopDetailData.promotion_info}
                </p>
              </div>
              <div className="icon-arrow-right" />
            </Link>
            {this.state.shopDetailData && this.state.shopDetailData.activities.length ? (
              <footer className="description-footer">
                <p className='ellipsis'>
                  <span className="tip-icon">
                    {this.state.shopDetailData.activities[0].icon_name}
                  </span>
                  <span>
                    {this.state.shopDetailData.activities[0].description}
                    (APP专享)
                  </span>
                </p>
                <p className='footer-activities'>{this.state.shopDetailData.activities.length}个活动</p>
                <p className='icon-arrow-right'></p>
              </footer>
            ) : ("")}
          </div>
        </header>
        <div className='change-show-type'>
          <div><span onClick={this.changeShowType.bind(this, 'food')} className={this.state.active==='food'?'activity-show':''}>商品</span></div>
          <div><span onClick={this.changeShowType.bind(this, 'rating')} className={this.state.active==='rating'?'activity-show':''}>评价</span></div>
        </div>
        <ReactCSSTransitionGroup
          component={this.FirstChild}
          transitionName="shop"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={300}>
               {this.state.show&&<div className='food-container'>
                <div className='menu-container'>
                    <div className="menu-left">
                      <ul>
                        {
                          this.state.menuList.map((item, index) => {
                            return (
                              <li className={this.state.activeIndex===index?'activity-menu menu-left-li': 'menu-left-li'} key={index} onClick={this.activeMenu.bind(this, index)}>
                                <img src={item.icon_url?getImgPath(item.icon_url):''} alt=""/>
                                <span>{item.name}</span>
                                <span className='category'></span>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                    <div className="menu-right">
                        <ul>
                          {
                            this.state.menuList.slice(this.state.activeIndex, this.state.activeIndex + 1 ).map((item, index) => {
                              return (
                                <li key={index}>
                                <header className='menu-detail-header'>
                                  <div className="menu-detail-header-left">
                                    <strong className="menu-item-title">{item.name}</strong>
                                    <span className="menu-item-description">{item.description}</span>
                                  </div>
                                  <span className="menu-detail-header-right"></span>
                                </header>
                                {
                                  this.state.displayList.map((food, foodIndex)=> {
                                    return (
                                      <div className='menu-detail-list' key={foodIndex}>
                                        <Link to='/shop/foodDetail' className='menu-detail-link'>
                                          <div className='menu-food-img'>
                                            <img src={imgUrl+ food.image_path} alt=""/>
                                          </div>
                                          <div className='menu-food-description'>
                                            <h3 className="food-description-head">
                                              <strong className='description-foodname'>{food.name}</strong>
                                              {
                                                food.attributes.length?<ul className='attributes-ul'>
                                                  {
                                                    food.attributes.map((attribute, fIndex) => {
                                                      return (
                                                        <li key={fIndex}  className={attribute.icon_name==='新'?'attribute-new':''}>
                                                          <p>{attribute.icon_name}</p>
                                                        </li>
                                                      )
                                                    })
                                                  }
                                                </ul>:''
                                              }
                                            </h3>
                                            <p className="food-description-content">{food.description}</p>
                                            <p className='food-description-sale-rating'>
                                              <span>月售{food.month_sales}份</span>
                                              <span>好评率{food.satisfy_rate}%</span>
                                            </p>
                                            {food.activity&&<p className='food-activity'>
                                                <span>{food.activity.image_text}</span>
                                            </p>}
                                          </div>
                                        </Link>
                                        <footer className='menu-detail-footer'>
                                              <div className="food-price">
                                                <span>¥</span>
                                                <span>{food.specfoods[0].price}</span>
                                                {food.specifications.length?<span>起</span>:''}
                                              </div>
                                              <div className='add-del-icon'>
                                                <div className='icon-wuuiconsuoxiao' onClick={this.handleAddFoodCount.bind(this, food.num, -1)}></div>
                                                <div >{this.state.foodList[food.num].qty}</div>
                                                <div className='icon-wuuiconxiangjifangda' onClick={this.handleAddFoodCount.bind(this, food.num, 1)}></div>
                                              </div>
                                        </footer>
                                      </div>
                                    )
                                  })
                                }
                                </li>
                              )
                            })
                          }
                        </ul>
                    </div>
                </div>
                <div className="buy-cart-container">
                  <div className='cart-icon-num'>
                    <div onClick={this.handleShowCart} className={this.state.count===0?"cart-icon-container":this.state.animate}>
                      <span className='cart-list-length'>{this.state.count}</span>
                      <div className='icon-ziyuan'></div>
                    </div>
                    <div className='cart-num'>
                      <div>¥{this.state.totalPrice}</div>
                      <div>配送费¥{this.state.shopDetailData.float_delivery_fee}</div>
                    </div>
                  </div>
                  <div onClick={this.handleClick.bind(this, 'unfinished')} className={this.state.miniMoney>0?"gotopay":'gotopay gotopay-active'}>
                  {this.state.miniMoney>0?<div className='gotopay-button-style'>还差¥{this.state.miniMoney}起送</div>
                      :<div  className='gotopay-button-style'>去结算</div>}
                  </div>
                </div>
                <ReactCSSTransitionGroup
                  component={this.CartFirstChild}
                  transitionName="cart"
                  transitionEnterTimeout={600}
                  transitionLeaveTimeout={300}>
                    {this.state.isShowCart&&<div className='cart-food-list'>
                      <header>
                        <h4>购物车</h4>
                        <div className='cart-food-clear' onClick={this.clearCart}>
                          <div className='icon-shanchu'></div>
                          <div>清空</div>
                        </div>
                      </header>
                      <div className='cart-food-details'>
                          <ul>
                            {this.state.foodList.map((cart, index) => {
                              return cart.qty===0?'':
                                (
                                  <li className='cart-food-li' key={index}>
                                    <div className='cart-list-num'>
                                      <p>{cart.name}</p>
                                      <p>{cart.specs}</p>
                                    </div>
                                    <div className='cart-list-price'>
                                      <span>¥</span>
                                      <span>{cart.specfoods[0].price}</span>
                                    </div>
                                    <div className='cart-list-control'>
                                        <div className='icon-wuuiconsuoxiao' onClick={this.handleAddFoodCount.bind(this, cart.num, -1)}></div>
                                        <div >{cart.qty}</div>
                                        <div className='icon-wuuiconxiangjifangda' onClick={this.handleAddFoodCount.bind(this, cart.num, 1)}></div>
                                    </div>
                                  </li>
                                )
                            })}
                          </ul>
                      </div>
                    </div>
                    }
                </ReactCSSTransitionGroup>
               </div>}
      </ReactCSSTransitionGroup>
      {this.state.hasAlert&&<AlertTip logout={()=> {return false}}  closeTip={this.handleClick} alertText={this.state.alertText}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    geohash: state.geohash
  }
}


export default connect(mapStateToProps)(Shop)
