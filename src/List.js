import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import ClientInfo from './ClientInfo';


class List extends React.Component {
	render() {
		return (
		<div>
			<div className="card-header-shadow-2x mb-3 card">
				<div className="card-header-tab card-header">
					<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
						<i className="fa fa-tasks"></i>&nbsp;Clients
					</div>
				</div>
					<div className="scroll-area-sm">
						<perfect-scrollbar className="ps-show-limits">
						<div style={{position: "static"}} className="ps ps--active-y">
						  <div className="ps-content">
								<ul className=" list-group list-group-flush">
								{
									this.props.tasks.map((task) => {
										return (
											<ClientInfo task={task} key={task._id} />
										)
									})
								}
								</ul>
							</div>
						</div>
					</perfect-scrollbar>
				</div>
			</div>
			<div align="right" >
				<NavLink to='/add' className="btn btn-primary">Add Client</NavLink >
				<p></p>
			</div>
		</div>
		);
	}
}

function mapStateToProps(state)  {
	return {
		tasks: [...state.tasks]
	}
}

export default connect(mapStateToProps)(List);
