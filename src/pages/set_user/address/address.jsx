import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {saveAttrInfo} from '@/store/action'
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import {getStore} from '@/utils/commons'
import './address.scss'
import API from '../../../api/api'

class Address extends Component {
  static propTypes = {
    saveAttrInfo: PropTypes.func.isRequired,
    hasAddressList: PropTypes.array,
    operate: PropTypes.string
  }
  // 获取用户地址列表
  getAddress = async () =>{
    const res = await API.getAddress(getStore('user_id'))
    this.props.saveAttrInfo('addressList', res)
  }
  handleDelete = (index) => {
    let hasAddressList = 
      [...this.props.hasAddressList.slice(0,index),
        ...this.props.hasAddressList.slice(index + 1)]
    this.props.saveAttrInfo('hasAddressList', hasAddressList)
  }
  componentDidMount () {
    this.getAddress()
  }
  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  render () {
    return (
      <div className='address'>
          <ul className='addresslist'>
            {
              this.props.hasAddressList.map((item, index) => {
                return  (
                <li key={index}>
                <div>
                  <p>{item.address}</p>
                  <p><span>{item.telenum}</span>{item.standbytelenum&&<span>,{item.standbytelenum}</span>}</p>
                </div>
                {this.props.operate === 'edit'&&<div className='deletesite'>
                  <span onClick={this.handleDelete.bind(this, index)}>x</span>
                </div>}
                </li>
              )
              })
            }
          </ul>
          <Link to='/setuser/add/fromadd'>
            <div className='addsite'>
              <span>新增地址</span>
              <div className='icon-arrow-right'></div>
            </div>
          </Link>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    hasAddressList: state.hasAddressList,
    operate: state.operate
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveAttrInfo: (attr, addressList) => dispatch(saveAttrInfo(attr, addressList))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Address)