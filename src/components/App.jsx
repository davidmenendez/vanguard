import React from 'react';
import Skill from './Skill';
import shortid from 'shortid';
import Select from './Select';
import stateList from '../utils/states.json';

export default class App extends React.Component {
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
    };
    this.setInfo = this.setInfo.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.editSkill = this.editSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.newSkillEntry = this.newSkillEntry.bind(this);
    this.canAdd = this.canAdd.bind(this);
  }

  setInfo(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  addSkill(e) {
    e.preventDefault();
    const skills = this.state.skills.slice();
    const lastEntry = skills[skills.length - 1];
    if (!lastEntry.skill || !lastEntry.exp) return;
    const entry =this.newSkillEntry();
    skills.push(entry);
    this.setState({ skills });
  }

  editSkill(e, id) {
    const name = e.target.name;
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

  render() {
    const canAdd = this.canAdd();
    const skills = this.state.skills.map((s, i) => (
      <Skill
        key={s.id}
        id={s.id}
        position={i}
        onChange={this.editSkill}
        delete={this.deleteSkill}
      />
    ));

    return (
      <div>
        <h3>provide your information</h3>
        <h4>personal</h4>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder="First Name" id="firstName" name="firstName" onChange={this.setInfo} />
          </div>
          <div className="form-group col">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder="Last Name" id="lastName" name="lastName" onChange={this.setInfo} />
          </div>
          <div className="form-group col">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" id="email" name="email" onChange={this.setInfo} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="city">City</label>
            <input type="text" placeholder="city" id="city" name="city" onChange={this.setInfo} />
          </div>
          <div className="form-group col">
            <label>State</label>
            <Select data={stateList} id="state" name="state" defaultValue="Florida" onChange={this.setInfo} />
          </div>
        </div>
        <h4>skills</h4>
        {skills}
        <div className="row">
          <div className="form-group col-12">
            <button disabled={!canAdd} className="button button-secondary" onClick={this.addSkill}>add</button>
          </div>
        </div>
      </div>
    )
  }
};