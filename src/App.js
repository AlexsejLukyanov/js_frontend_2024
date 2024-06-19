import React from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import List from './List';
import ClientAdd from './ClientAdd';
import { todoAddAll } from './actions';


class App extends React.Component {
	componentDidMount() {
		fetch('tasks').then(function(res) {
			return res.json();
		}).then((data) => {
			this.props.dispatch(todoAddAll(data));
		});
	}
	
	render() {
		return (
			<div className="row-d-flex justify-content-center container">
				<div className="col-md-8">
					<Provider store={this.props.store}>
						<Router>
							<Routes>
								<Route path='/' element={<List />} />
								<Route path='/add' element={<ClientAdd />} />
							</Routes>
						</Router>
					</Provider>
				</div>
			</div>
		);
	}
}

export default connect()(App);