import React, { Component } from 'react'
import PersistentDrawerLeft from './page/Menu/MenuBarLeft'
import { Switch, Route } from 'react-router-dom'
import Login from './page/User/Login';
import Paper from './page/User/Register';
import View_profile from './page/User/View_profile';
import ComparePrice from './page/ComparePrice/ComparePrice'
import SearchCar from './page/Search/SearchCar';
import UserManagement from './page/UserManagement/UserManagement';
import Categories from './page/Categories/Categories';

export default class Appmain extends Component {
     render() {
          return (

               <React.Fragment>
                    {/* <PersistentDrawerLeft />
                    <br />
                    <br />
                    <br /> */}
                    <Switch>
                         <Route exact path="/" component={Categories} />
                         <Route exact path="/Categories" component={Categories} />
                         <Route exact path="/View_profile" component={View_profile} />
                         <Route exact path="/SearchCar" component={SearchCar} />
                         <Route path="/Login" component={Login} />
                         <Route path="/paper" component={Paper} />
                         <Route path="/compare-price" component={ComparePrice} />
                         <Route path="/UserManagement" component={UserManagement} />
                    </Switch>

               </React.Fragment>

          )
     }
}
