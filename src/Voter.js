import Navbar from './Navbar'

class Voter {
  
  constructor(voterId, firstName, lastName) {

    if (this.validateVoter(voterId)){

      this.voterId = voterId;
      this.hasVoted = false;
      this.firstName = firstName;
      this.lastName = lastName;
      this.type = 'voter';
      if (this.__isContract) {
        delete this.__isContract;
      }
      if (this.name) {
        delete this.name;
      }
      return this;

    } else if (!this.validateVoter(voterId)){
      throw new Error('the voterId is not valid.');
    } else {
      throw new Error('the registrarId is not valid.');
    }

  }


  async validateVoter(voterId) {
    if (voterId) {
      return true;
    } else {
      return false;
    }
  }


}

export default Voter;