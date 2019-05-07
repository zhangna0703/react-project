import React, {Component} from 'react'
import ShopList from '@/components/shop_list/shop_list'
import Header from '@/components/header/header'
import './food.scss'

class Food extends Component {
  goBack = () =>{
    this.props.history.push('/msite')
  }
  render () {
    return (
      <div className='foodlist-container'>
        <Header title={this.props.match.params.title} goBack={this.goBack}/>
        <ShopList geohash={this.props.match.params.geohash.split(',')}/>
      </div>
    )
  }
}

export default Food