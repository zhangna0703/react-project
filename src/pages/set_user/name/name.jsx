import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {modifyUserInfo} from '@/store/action'
import './name.scss'

class Name extends Component {
  static propTypes = {
    modifyUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  }
  state = {
    name: '',
    activeInput: '',
    activeText: '',
    fontopacity: ''
  }
  handleInput = (e) => {
    let value = e.target.value 
    this.setState({
      name: value   // 是一个异步的过程, 不要在里面用e.target
    })
    this.inputValidate()
  }
  inputValidate = () => {
    let name = this.state.name
    if (name.length < 5 || name.length > 24) {
      this.setState({
        activeInput: 'active-input',
        activeText: 'active-text',
        fontopacity: ''
      })
      return false
    } else {
      this.setState({
        activeInput: '',
        activeText: '',
        fontopacity: 'fontopacity'
      })
      return true
    }
  }
  resetName = () => {
    let checkResult = this.inputValidate()
    if (!checkResult) {
      return
    }
    this.props.modifyUserInfo('username', this.state.name)
    this.props.history.goBack()
  }
  render () {
    return (
        <section className='setname'>
        <section className='setname-top'>
          <input type="text" placeholder='输入用户名' value={this.state.name} onChange={this.handleInput.bind(this)} className={this.state.activeInput}/>
          <div>
            {!this.state.activeText?<p>用户只能修改一次(5~24字符之间)</p>:
            <p className={this.state.activeText}>用户名长度在5到24位之间</p>}
          </div>
        </section>
        <section className='reset'>
          <button className={this.state.fontopacity} onClick={this.resetName}>确认修改</button>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    modifyUserInfo: (key, value) => dispatch(modifyUserInfo(key, value))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Name)