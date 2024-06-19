import React from 'react';
import { connect } from 'react-redux';
import { todoDelete, todoUpdateState } from './actions';


class ClientInfo extends React.Component {
	constructor(props) {
		super(props);
		
		this.onStatusClick = this.onStatusClick.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}
		
	onStatusClick(e) {
		e.preventDefault();	
		
		fetch(`tasks/${this.props.task._id}`,{
			method: 'PATCH',
			body: JSON.stringify({
				done: !this.props.task.done
			}),
			headers: {
				'Content-Type':'application/json'
			}
		}).then((res) => {
			if (res.status === 200) {
				console.log('Updated');
				this.props.dispatch(todoUpdateState(this.props.task._id));
			}
			else {
				console.log('Not Updated');
			}
		});
	}
	
	onDeleteClick(e) {
		e.preventDefault();
		
		fetch(`tasks/${this.props.task._id}`,{
			method: 'DELETE'
			}).then((res) => {
			if (res.status === 200) {
				console.log('Deleted');
				this.props.dispatch(todoDelete(this.props.task._id));
			}
			else {
				console.log('Not deleted');
			}
		});
	}
	
	render() {
		return (
			<li className="list-group-item">
				{this.props.task.done ? <div className="todo-indicator bg-success"></div> : <div className="todo-indicator bg-focus"></div>}
				<div className="widget-content p-0">
				    <div className="widget-content-wrapper">
						<div className="widget-content-left">
						    <div className="widget-heading"><p>Имя: {this.props.task.name ? <div>{this.props.task.name}</div> : <div>Не указано</div> }</p></div>
							<div className="widget-heading"><p>Фамилия: {this.props.task.surname ? <div>{this.props.task.surname}</div> : <div>Не указано</div> }</p></div>
						    <div className="widget-subheading">
								<div><p>Возраст: {this.props.task.age ? <div>{this.props.task.age}</div> : <div>Не указано</div> }</p></div>
								<div><p>Мед полис:{this.props.task.med_polis ? <div>{this.props.task.med_polis}</div> : <div>Не указано</div> }</p></div>
						  </div>
						</div>
						<div className="widget-content-right">
						<div align="right">
						<span onClick={this.onStatusClick}><b>{this.props.task.done ? 'Застрахован' : 'Не Застрахован'}</b></span>
						</div>
						<div align="left">
						   <button className="border-0 btn-transition btn btn-outline-danger" onClick={this.onDeleteClick}>
								<i className="fa fa-trash"> </i>
						   </button>
						</div>
						</div>
				    </div>
				</div>
			</li>
		)
	}
}

export default connect()(ClientInfo);
