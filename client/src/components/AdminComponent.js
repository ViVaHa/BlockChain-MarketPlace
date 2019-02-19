import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const User = props=>(
    <tr>
        <td >{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.accountBalance}</td>    
        <td className = {props.user.accountType=="admin" ? 'hidden' : ''} >
        <DeleteButton user={props.user}/>
        </td>
        <td className = {props.user.accountType=="admin" ? '' : 'hidden'} >        
        </td>
    </tr>
)

class DeleteButton extends Component{
    constructor(props){
        super(props );
        this.state = {
            email : this.props.user.email
        }
       

    }

    deleteUser(e){
        var listLink = "http://localhost:5000/api/users/delete/" +  e.target.value;
     
        axios.get(listLink)
        .then(response =>{
           console.log("Deleted successfully");
           window.location.reload();
           
        })
        .catch(function(error){
            console.log(error);
        })

    };

    render() {
        return (
          <button onClick={this.deleteUser} value={this.state.email} type="button" className="btn btn-danger">
            delete
          </button>
        );
    }

}

export default class ListProduct extends Component{


    constructor(props){
        super(props);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.userList = this.userList.bind(this);
       
        this.state= {
            users:[],
            limit :5 
            
        };
    }

    
    componentDidMount(){
        var listLink = "http://localhost:5000/api/users/list";
        axios.get(listLink)
        .then(response =>{
            this.setState({users:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

   
    

    onLoadMore() {
        this.setState({
            limit: this.state.limit + 5
        });
        
    }

    
    userList(){
        return this.state.users.slice(0,this.state.limit).map(function(currentUser,i){

            return(
                
              <User user={currentUser} key={i}/>

            )
        });
    }
    render(){
        return (

            <div>
            <h3>Users</h3>
            <table className= "table table-striped" style={{marginTop:20}}>
                
                <tbody>
                    {this.userList()}
                    <a href="#" onClick={this.onLoadMore}>Load</a>
                </tbody>
            
            </table>
            </div>

        )
    }
}
