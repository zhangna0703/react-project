import React, {Component} from 'react'
import './loader.scss'

class Loader extends Component {
  handleClick = () => {
    this.props.closeTip()
  }
  handleLogout = () => {
    this.props.logout()
  }
  render () {
    return (
      <div className='loader-container'>
        <div className='loader-inner'></div>
      </div>
    )
  }
}

export default Loader