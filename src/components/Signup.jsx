import React from 'react';
import Skill from './Skill';
import shortid from 'shortid';
import Select from './Select';
import stateList from '../utils/states.json';
import Modal from './Modal';
import Request from '../utils/Request';

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      skills: [{
        skill: '',
        exp: '',
        id: shortid.generate(),
      }],
      showModal: false,
    };
    this.setInfo = this.setInfo.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.editSkill = this.editSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.newSkillEntry = this.newSkillEntry.bind(this);
    this.canAdd = this.canAdd.bind(this);
    this.submit = this.submit.bind(this);
    this.doRequest = this.doRequest.bind(this);
  }

  setInfo(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  addSkill(e) {
    e.preventDefault();
    const skills = this.state.skills.slice();
    const lastEntry = skills[skills.length - 1];
    if (!lastEntry.skill || !lastEntry.exp) return;
    const entry = this.newSkillEntry();
    skills.push(entry);
    this.setState({ skills });
  }

  editSkill(e, id) {
    const name = e.target.id;
    const value = e.target.value;
    const skills = this.state.skills.slice();
    const skill = skills.find(s => s.id === id);
    skill[name] = value;
    this.setState({ skills });
  }

  deleteSkill(e, id) {
    e.preventDefault();
    const skills = this.state.skills.slice();
    skills.splice(id, 1);
    this.setState({ skills });
  }

  newSkillEntry() {
    return {
      skill: '',
      exp: '',
      id: shortid.generate(),
    };
  }

  canAdd() {
    const skills = this.state.skills.slice();
    const lastEntry = skills[skills.length - 1];
    if (!lastEntry.skill || !lastEntry.exp) {
      return false;
    } else {
      return true;
    }
  }

  submit() {
    this.setState({ showModal: !this.state.showModal });
  }

  doRequest(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    delete user.showModal;
    Request({
      body: user,
      url: '/api/user',
      method: 'POST',
    }).then(data => {
      this.setState({ showModal: !this.state.showModal });
    }).catch(err => {
      console.log('err', err);
    });
  }

  render() {
    const skills = this.state.skills.map((s, i) => (
      <Skill
        key={s.id}
        id={s.id}
        position={i}
        onChange={this.editSkill}
        delete={this.deleteSkill}
        canDelete={this.state.skills.length > 1}
      />
    ));

    return (
      <div>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder="First Name" id="firstName" onChange={this.setInfo} />
          </div>
          <div className="form-group col">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder="Last Name" id="lastName" onChange={this.setInfo} />
          </div>
          <div className="form-group col">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" id="email" onChange={this.setInfo} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="city">City</label>
            <input type="text" placeholder="city" id="city" onChange={this.setInfo} />
          </div>
          <div className="form-group col">
            <label>State</label>
            <Select data={stateList} id="state" placeholder="State" onChange={this.setInfo} />
          </div>
        </div>
        <h4>skills</h4>
        {skills}
        <div className="row">
          <div className="form-group col-12">
            <button disabled={!this.canAdd()} className="button button-secondary" onClick={this.addSkill}>add</button>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <button className="button button-secondary" onClick={this.submit}>submit</button>
          </div>
        </div>
        {this.state.showModal &&
          <Modal title="Confirm information" close={this.submit}>
            <p>first name- {this.state.firstName}</p>
            <p>last name- {this.state.lastName}</p>
            <p>email- {this.state.email}</p>
            <button className="button button-primary" onClick={this.doRequest}>confirm</button>
          </Modal>
        }
      </div>
    )
  }
};