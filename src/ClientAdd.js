import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { todoAdd } from './actions'

function onGetDate() {
	const currentDate = new Date();
	
	let currentDay = currentDate.getDate();
	let currentMonth = (currentDate.getMonth() + 1)*30;
	let currentYear = currentDate.getFullYear()*12*30;
	
	let res = currentYear * currentMonth + currentDay;
		
	return res;
}

class ClientAddInner extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			name: '',
			surname: '',
			med_polis: '',
			age: '',
			date: onGetDate()
		}
		
		this.onNameChange = this.onNameChange.bind(this);
		this.onSurNameChange = this.onSurNameChange.bind(this);
		this.onMedPolisChange = this.onMedPolisChange.bind(this);
		this.onAgeChange = this.onAgeChange.bind(this);
		this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
	}
		
	onNameChange(e) {
		e.preventDefault();
		
		this.setState({
			name: e.target.value
		});
	}
	
	onSurNameChange(e) {
		e.preventDefault();
		
		this.setState({
			surname: e.target.value
		});
	}
	
	onMedPolisChange(e) {
		e.preventDefault();
		
		this.setState({
			med_polis: e.target.value
		});
	}
	
	onAgeChange(e) {
		e.preventDefault();
		
		this.setState({
			age: e.target.value
		});
	}
	
	onAddFormSubmit(e) {

		console.log(this.props.onTaskAdd)
		e.preventDefault();
		
		fetch('tasks', {
			method: 'POST',
			body: JSON.stringify({
				name: this.state.name,
				surname: this.state.surname,
				med_polis: this.state.med_polis,
				age: this.state.age,
				date: this.state.date
			}),
			headers: {
				'Content-Type':'application/json'
			}
		}).then((res) => {
			return res.json();
		}).then((data) => {
			this.props.dispatch(todoAdd(data._id, data.name, data.surname, data.med_polis, data.age, data.date));
			this.props.history('/');
			window.location.reload();
		});
	}
	
	render() {
		return (
			<div className="card-header-shadow-2x mb-3 card">
				<div className="card-header-tab card-header">
					<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
						<i className="fa fa-tasks"></i>&nbsp;Add Client
					</div>
				</div>
				<form onSubmit={this.onAddFormSubmit}>
				<div className="widget-content">
					<div className="widget-content-wrapper">
						<input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Имя" className="form-control"/>
						<p></p>
						<input type="text" value={this.state.surname} onChange={this.onSurNameChange} placeholder="Фамилия" className="form-control"/>
						<p></p>
						<input type="text" value={this.state.med_polis} onChange={this.onMedPolisChange} placeholder="Мед полис" className="form-control"/>
						<p></p>
						<input type="text" value={this.state.age} onChange={this.onAgeChange} placeholder="Возраст" className="form-control"/>
						<p></p>
						<input type="submit" value="Add" className="btn btn-primary" />
					</div>
				</div>
				</form>
				<div className="d-block text-right card-footer">
					<NavLink to='/'className="btn btn-primary">Back to list</NavLink>
				</div>
			</div>
		)
	}
}

const ClientAdd = (props) => {
	return (
		<ClientAddInner {...props} history={useNavigate()} />
	)
}

export default connect()(ClientAdd);