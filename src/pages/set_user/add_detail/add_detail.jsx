import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {saveAttrInfo} from '@/store/action'
import QueueAnim from 'rc-queue-anim'
import './add_detail.scss'
import API from '../../../api/api'

class AddDetail extends Component {
  static propTypes = {
    saveAttrInfo: PropTypes.func.isRequired,
    addressList: PropTypes.array
  }
  state = {
    inputAddress: '',
    isShow: true
  }
  handleSearch = async () => {
    let obj = {
      type: 'nearby',
      keyword: this.state.inputAddress
    }
    let res = await API.searchPois(obj)
    this.props.saveAttrInfo('addressList', res)
  }
  handleChange = (e) => {
    let value = e.target.value
    this.setState({
      inputAddress: value,
      isShow: false
    })
  }
  handleChoose = (name) => {
    this.props.saveAttrInfo('addressName', name)
    this.props.history.push('/setuser/add/adddetail')
  }
  render () {
    return (
      <div>
        <QueueAnim >
          <div className="add-detail" key='o1'>
            <input type="text"  placeholder="请输入小区/写字楼/学校等" value={this.state.inputAddress} onChange={this.handleChange}/>
            <button onClick={this.handleSearch}>确认</button>
          </div>
          <div className="warnpart" key='o2'>为了满足商家的送餐要求，建议您从列表中选择地址</div>
          {this.state.isShow&&<div className="point" key='o3'>
              <p>找不到地址？</p>
              <p>请尝试输入小区、写字楼或学校名</p>
              <p>详细地址（如门牌号）可稍后输入哦。</p>
          </div>}
          <div className="poisearch-container" key='o4'>
            <ul>
              {this.props.addressList.map((item, index) => {
                return (
                  <li onClick={this.handleChoose.bind(this, item.name)} key={index}>
                    <p>{item.name}</p>
                    <p>{item.address}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </QueueAnim>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addressList: state.addressList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveAttrInfo: (attr, addressList) => dispatch(saveAttrInfo(attr, addressList))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddDetail)