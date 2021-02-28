import React, { Component } from 'react'

class Main extends Component {

	render(){
		return(
			<div>
				<table className="table table-borderless text-center">
		          <thead>
		            <tr>
		              <th scope="col">Candidates</th>
		              <th scope="col">Party</th>
		              <th>Votes Count</th>
		            </tr>
		          </thead>
		          <tbody>
		            <tr>
		              <td>{this.props.candidates[0][1]}</td>
		              <td></td>
		              <td>{this.props.candidates[0][2]}</td>
		            </tr>
		            <tr>
		              <td>{this.props.candidates[1][1]}</td>
		              <td></td>
		              <td>{this.props.candidates[1][2]}</td>
		            </tr>
		            <tr>
		              <td>{this.props.candidates[2][1]}</td>
		              <td></td>
		              <td>{this.props.candidates[2][2]}</td>
		            </tr>
		            <tr>
		              <td>{this.props.candidates[3][1]}</td>
		              <td></td>
		              <td>{this.props.candidates[3][2]}</td>
		            </tr>
		            <tr>
		              <td>{this.props.candidates[4][1]}</td>
		              <td></td>
		              <td>{this.props.candidates[4][2]}</td>
		            </tr>
		          </tbody>
		        </table>

		        <button 
		        	type="submit" 
		        	className="btn btn-primary btn-block btn-lg" 
		        	onClick={(event) => {
		        		
		        		{this.props.vote(4)}
		        }}>
		        Vote 
		        </button>


			</div>
		);
	}
}

export default Main;