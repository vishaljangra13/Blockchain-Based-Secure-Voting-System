import React, { Component } from 'react'
import Navbar from './Navbar'

class Login extends Component {

	render(){
		return(
			<form onSubmit={this.props.login}>
				<h1> Please Log In to Vote </h1>
				<div>
					<label> Enter Your Aadhar Number </label>
				</div>
				<div class="form-group">
					<input type="text" class="form-control" onChange={this.props.check} /></div>
				<div >
					<button type="submit" class="btn btn-primary">Log In</button></div>
			</form>
        );
	}

	
}

export default Login;