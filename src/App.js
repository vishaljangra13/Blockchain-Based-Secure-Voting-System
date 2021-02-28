import React, { Component } from 'react'
import Web3 from 'web3'
import Election from './abis/Election.json'
import Navbar from './Navbar'
import Main from './Main'
import Voter from './Voter'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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


  vote = (candidateId) => {
    if(this.state.voter[this.state.account]){   
      this.setState( {msg : "Already Voted"})
    }
    else{ 
      this.state.voter[this.state.account] = true;
      this.setState({ loading:true })
      this.state.election.methods.vote(candidateId).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading:false })
      })
     }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      election: {},
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main 
      candidatesCount={this.state.candidatesCount}
      candidates={this.state.candidates}
      vote={this.vote}
      msg = {this.msg}
      />
    }

    return (
      <div>
        <Navbar/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

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