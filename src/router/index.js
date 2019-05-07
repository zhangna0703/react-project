import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
const login = asyncComponent(() => import("@/pages/login/login"))
const profile = asyncComponent(() => import("@/pages/profile/profile"))
const info = asyncComponent(() => import("@/pages/info/info"))
const setUser = asyncComponent(() => import("@/pages/set_user/set_user"))
const msite = asyncComponent(() => import("@/pages/msite/msite"))
const shop = asyncComponent(() => import("@/pages/shop/shop"))
const food = asyncComponent(() => import("@/pages/food/food"))
const technology = asyncComponent(() => import("@/pages/technology/technology"))

export default class RouteConfig extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/profile" exact component= {profile}/>
          <Route path="/login" component= {login}/>
          <Route path="/info"  component= {info}/>
          <Route path="/msite" component= {msite}/>
          <Route path="/setuser"  component= {setUser}/>
          <Route path="/shop/:id"  component= {shop}/>
          <Route path="/food/:geohash/:id/:title"  component= {food}/>
          <Route path="/technology"  component= {technology}/>
          <Redirect exact from='/' to='/profile'/>
          <Route component= {profile}/>
        </Switch>
      </HashRouter>
    )
  }
}