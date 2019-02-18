import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/RegisterComponent';
import Login from './components/LoginComponent';
import Logout from './components/LogoutComponent'
import CreateProduct from './components/CreateProductComponent';
import BuyProduct from './components/EditProductComponent';
import ListProduct from './components/ProductListComponent';
import UserAccount from './components/UserAccountComponent';
import './App.css'
class App extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn : false,
      user : ''
    };
    if(localStorage.getItem('login')!=''){
      var loggedInUser = localStorage.getItem('login');
      this.state={
        isLoggedIn : true,
        user : loggedInUser
      };
    }else{
      this.state={
        isLoggedIn : false,
        user : ''
      };
    }
  }
  render() {
    return (
      <Router>
        <div className='container'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">BlockChain</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                  <li className={this.state.isLoggedIn ? 'hidden' : 'nav-item'}>
                    <Link to={'/register'} className="nav-link">Register</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'hidden' : 'nav-item'}>
                    <Link to={'/login'} className="nav-link">Login</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/list'} className="nav-link">All Items For Sale</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/sell'} className="nav-link">Sell an Item</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/account'} className="nav-link">My Account</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/logout'} className="nav-link">Logout</Link>
                  </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              
              <Route exact path='/register' component={ Register } />
              <Route exact path='/account' component={ UserAccount } />
              <Route path='/login' component={ Login } />
              <Route path='/logout' component={ Logout } />
              <Route path = "/list" component={ListProduct}></Route>
              <Route path="/edit/:id" component = {BuyProduct}></Route>
              <Route path="/sell" component = {CreateProduct}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
