import React from 'react';
import { connect } from 'react-redux';
import { todoDelete, todoUpdateState } from './actions';


class ClientInfo extends React.Component {
	constructor(props) {
		super(props);
		
		this.onStatusClick = this.onStatusClick.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
		this.onTick = this.onTick.bind(this);
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

	onTick() {
		
		const current = new Date();
		
		let nowDay = current.getDate();
		let nowMonth = (current.getMonth() + 1)*30;
		let nowYear = current.getFullYear()*12*30;
		let now = nowYear * nowMonth + nowDay;
		let elapsed = now - this.props.task.date;
		let dt = 360 - elapsed;
		
		if (dt < 0) {
			return (
			<div>
			<div>Страховка просрочена</div>
			<div><b>Не застрахован</b></div>
			</div>
			)
		}
		if (dt > 0) {
			return (
			<div>
			<div>{dt}</div>
			<div><b>Застрахован</b></div>
			</div>
			)
		}
		if (isNaN(dt)) {
        return 360;
		}
		//return dt;
	}
	
	render() {
		return (
			<li className="list-group-item">
				<div className="widget-content p-0">
				    <div className="widget-content-wrapper">
						<div className="widget-content-left">
						    <div className="widget-heading">Имя: {this.props.task.name ? <div>{this.props.task.name}</div> : <div>Не указано</div> }</div>
							<div className="widget-heading">Фамилия: {this.props.task.surname ? <div>{this.props.task.surname}</div> : <div>Не указано</div> }</div>
						    <div className="widget-subheading">
								<div>Возраст: {this.props.task.age ? <div>{this.props.task.age}</div> : <div>Не указано</div> }</div>
								<div>Мед полис:{this.props.task.med_polis ? <div>{this.props.task.med_polis}</div> : <div>Не указано</div> }</div>
						  </div>
						</div>
						<div className="widget-content-right">
						<div align="right">
						<div>Дней до окончания страховки: <span>{this.onTick()}</span></div>
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
