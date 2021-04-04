import React, { Component, useState, useEffect } from 'react'
import Web3 from 'web3'
import Election from './abis/Election.json'
import Navbar from './Navbar'
import Main from './Main'
import Login from './Login'
import Result from './Result'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.startTimer()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ accounts })

    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load Election
    const electionData = Election.networks[networkId]
    if(electionData) {
      const election = new web3.eth.Contract(Election.abi, electionData.address)
      this.setState({ election })


      let candidatesCount = await election.methods.candidatesCount().call();
      this.setState({ candidatesCount })

      var candidates = [];
      var i;
      for(i=0; i<candidatesCount;i++){
        candidates[i] = await election.methods.candidates(i+1).call();
      }
      this.setState({ candidates })

      var voter = new Map()
      voter[this.state.account] = await election.methods.voters(this.state.account).call()
      this.setState({ voter })

      this.setState({ goingon : true})

      
    }else {
      window.alert('Election contract not deployed to detected network.')
    }

    this.setState({ loading: false })

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
 

  select = (candidateId) => {

      if(candidateId == 1){
        this.setState({ isClicked1:true})
        this.setState({ isClicked2:false})
        this.setState({ isClicked3:false})
        this.setState({ isClicked4:false})
        this.setState({ isClicked5:false})
  
      }else if(candidateId  == 2){
        this.setState({ isClicked1:false})
        this.setState({ isClicked2:true})
        this.setState({ isClicked3:false})
        this.setState({ isClicked4:false})
        this.setState({ isClicked5:false})
      }else if(candidateId  == 3){
        this.setState({ isClicked1:false})
        this.setState({ isClicked2:false})
        this.setState({ isClicked3:true})
        this.setState({ isClicked4:false})
        this.setState({ isClicked5:false})
      }else if(candidateId  == 4){
        this.setState({ isClicked1:false})
        this.setState({ isClicked2:false})
        this.setState({ isClicked3:false})
        this.setState({ isClicked4:true})
        this.setState({ isClicked5:false})
      }else if(candidateId  == 5){
        this.setState({ isClicked1:false})
        this.setState({ isClicked2:false})
        this.setState({ isClicked3:false})
        this.setState({ isClicked4:false})
        this.setState({ isClicked5:true})
      }

      var highlight1 = this.state.isClicked1 ? "highlighted" : "non-highlighted"
      var highlight2 = this.state.isClicked2 ? "highlighted" : "non-highlighted"
      var highlight3 = this.state.isClicked3 ? "highlighted" : "non-highlighted"
      var highlight4 = this.state.isClicked4 ? "highlighted" : "non-highlighted"
      var highlight5 = this.state.isClicked5 ? "highlighted" : "non-highlighted"
      
      this.setState({highlight1})
      this.setState({highlight2})
      this.setState({highlight3})
      this.setState({highlight4})
      this.setState({highlight5})

      var selected = candidateId
      this.setState({ selected })
      console.log(this.state.selected)
  }

  vote = (candidateId) => {
    console.log(candidateId)
    if(this.state.voter[this.state.account]){   
      this.setState( {msg : "Already Voted"})
      console.log("Already Voted")
    }
    else{ 
      this.state.voter[this.state.account] = true;
      this.setState({ loading:true })
      this.state.election.methods.vote(candidateId).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading:false })
      })
     }
  }

  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    this.setState({ hms : obj })
  }

  startTimer = () => {
    var seconds = localStorage.getItem("seconds");
    if(!seconds){
      localStorage.setItem("seconds", JSON.stringify(180));
      this.setState({ seconds })
    }

    if (this.state.timer == 0 && this.state.seconds > 0) {
      this.state.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    var seconds = this.state.seconds - 1;
    this.secondsToTime(seconds)
    this.setState({ seconds })
    this.setState({ time: this.state.hms });
    
    if (this.state.seconds == 0) { 
      clearInterval(this.state.timer);
      this.end();
    }
  }


  end = () => {
      console.log("Election Ended")
      this.setState({goingon:false})
  }

  check = (event) => {
    console.log("888032237155")
    this.setState({ aadharNumber: event.target.value });

    console.log(this.state.aadharNumber)
  }

  login = () => {
      var validator = require('aadhaar-validator')
      if(validator.isValidNumber(this.state.aadharNumber)){
          console.log("Aadhar Number :")
          this.setState({ loggedin:true });
      }
      
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      election: {},
      loading: true,
      loggedin: false,
      goingon: true,
      time: {},
      seconds: 80,
      timer : 0,
      highlight1 : "",
      highlight2 : "",
      highlight3 : "",
      highlight4 : "",
      highlight5 : "",
      isClicked1 : false,
      isClicked2 : false,
      isClicked3 : false,
      isClicked4 : false,
      isClicked5 : false
    }

    this.login = this.login.bind(this);

  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      if(this.state.loggedin && this.state.goingon){
        content = <Main 
        candidatesCount={this.state.candidatesCount}
        candidates={this.state.candidates}
        vote={this.vote}
        select={this.select}
        selected={this.state.selected}
        msg = {this.msg}
        highlight1 = {this.state.highlight1}
        highlight2 = {this.state.highlight2}
        highlight3 = {this.state.highlight3}
        highlight4 = {this.state.highlight4}
        highlight5 = {this.state.highlight5}

        />
      }
      else if(this.state.goingon){
        content = <Login
        login = {this.login} 
        check = {this.check}
        />
      }else{
        content = <Result 
        candidates={this.state.candidates}
        />
      }
    }

    return (
      <div>
        <Navbar/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
              <div className="content mr-auto ml-auto">

              <p class="timer">Election Ends in {this.state.time.m}m {this.state.time.s}s</p>
                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;