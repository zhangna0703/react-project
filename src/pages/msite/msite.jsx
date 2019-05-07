import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from "@/components/header/header";
import "./msite.scss";
import Footer from '@/components/footer/footer'
import Loader from '@/components/loader/loader'
import ShopList from '@/components/shop_list/shop_list'
import API from "../../api/api";
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import Swiper from "swiper/dist/js/swiper.js";
import "swiper/dist/css/swiper.css";
import {saveAttrInfo} from '@/store/action'
import PropTypes from 'prop-types'

class Msite extends Component {
  static propTypes = {
    saveAttrInfo: PropTypes.func.isRequired,
  };
  state = {
    geohash: [],
    footTypes: [],
    title: '',
    text: 'fff',
    imgBaseUrl: "https://fuss10.elemecdn.com"
  };
  getFoodTypes = async () => {
    let data = {
      geohash: this.state.geohash,
      "flag[]": "F",
      group_type: 1
    };
    let res = await API.getFoodTypes(data);
    let resLength = res.length;
    let resArr = [...res];
    let foodArr = [];
    for (let i = 0, j = 0; i < resLength; i += 8, j++) {
      foodArr[j] = resArr.splice(0, 8);
    }
    this.setState({
      footTypes: foodArr
    });
    new Swiper(".swiper-container", {
      pagination: {
        el: '.swiper-pagination'
      },
      loop: true,
    });
  };
  // 解码url地址，求去restaurant_category_id值
  getCategoryId(url){
    let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    if (/restaurant_category_id/gi.test(urlData)) {
      return JSON.parse(urlData).restaurant_category_id.id
    }else{
      return 270
    }
  }
  // 根据经纬度获取地点信息
  getPoisSite = async (geohash) => {
    let res = await API.getPoisSite(geohash)
    this.setState({
      title: res.name
    })
  }
  cityGuess = async () => {
    let res = await API.cityGuess();
    this.setState({
      geohash: [res.latitude, res.longitude]
    });
    this.props.saveAttrInfo('geohash', [res.latitude, res.longitude])
    this.getPoisSite([res.latitude, res.longitude])
    this.getFoodTypes();
  }
  goHome = () => {
    this.props.history.push('/')
  }
  componentDidMount () {
    this.cityGuess()
  }
  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    let refresh = !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    return refresh
  }
  render() {
    return (
      <div>
        <Header title={this.state.title} signUp={true} goHome={this.goHome}/>
        <nav className="msite-nav">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {
                !this.state.footTypes.length &&<div className="food-types-container">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                  return (
                    <div className="food-item" key={index}>
                      <div className="food-item-inner" />
                    </div>
                  );
                })}
              </div>
              }
              {this.state.footTypes.map((foodItem, index) => {
                return (
                  <div className="swiper-slide food-types-container" key={index}>
                    {foodItem.map((item, index) => {
                      return (
                        <Link className="link-to-food" to={`/food/${this.state.geohash}/${this.getCategoryId(item.link)}/${item.title}`} key={index}>
                          <figure>
                            <img
                              src={this.state.imgBaseUrl + item.image_url}
                              alt=""
                            />
                            <figcaption>{item.title}</figcaption>
                          </figure>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </nav>
        <div className="shop-list-container">
          <header className="shop-header">
            <div className="icon-shangdian" />
            <span className="shop-header-title">附近商家</span>
          </header>
          {this.state.footTypes.length?<ShopList geohash={this.state.geohash}/>:
            <div className="skeleton">
            <ul>
              {[1, 2, 3, 4].map((item, index) => {
                return (
                  <li className="shop-li" key={index}>
                    <div className="shop-img" />
                    <div className="shop-progress">
                      <div />
                      <div />
                      <div />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>}
        </div>
        {!this.state.footTypes.length?<div className='site-loader'>
          <Loader/>
        </div>:''}
        <Footer/>
      </div>
    ); 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
  }
}
export default connect(()=>({}), mapDispatchToProps)(Msite)