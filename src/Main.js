import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import bjp from './images/bjp.png'
import aap from './images/aap.jpg'
import sp from './images/sp.png'
import congress from './images/congress.png'
import shivsena from './images/shivsena.jpg'
import './Main.css'

class Main extends Component {

	render(){
		return(
			<div>
				<h3> Double Click On Logo to select </h3>
				<div class="card-deck">

				 	<img class={[this.props.highlight1, "card"].join(' ')} src={bjp} alt="BJP"
			        	onClick={(event) => {
			        		{this.props.select(1)}
			        }} />
				  
				 	<img class={[this.props.highlight2, "card"].join(' ')} src={aap} alt="AAP"
			        	onClick={(event) => {
			        		{this.props.select(2)}
			        }} />

				 	<img class={[this.props.highlight3, "card"].join(' ')} src={sp} alt="SP"
			        	onClick={(event) => {
			        		{this.props.select(3)}
			        }} />

				 	<img class={[this.props.highlight4, "card"].join(' ')} src={congress} alt="Congress"
			        	onClick={(event) => {
			        		{this.props.select(4)}
			        }} />

					<img class={[this.props.highlight5, "card"].join(' ')} src={shivsena} alt="ShivSena"
			        	onClick={(event) => {
			        		{this.props.select(5)}
			        }} />			
			</div>


				      
				<div class="vote-button">

			        <button 
			        	type="submit" 
			        	className="btn btn-primary btn-block btn-sm" 
			        	onClick={(event) => {
			        		
			        		{this.props.vote(this.props.selected)}
			        }}>
			        Vote 
			        </button>




				</div>
			</div>
		);
	}
}

export default Main;