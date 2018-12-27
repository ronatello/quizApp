import React, { Component } from 'react';
import Login from './components/login';
import Home from './components/home';
import CreateQuiz from './components/createquiz';
import EditQuiz from './components/editquiz';
import DeleteQuiz from './components/deletequiz';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



class App extends Component 
{
	render() 
	{
		return (
		
			<div>
				<Router>
					<div>
						<Switch>
							<Route exact path='/' component={Login} />
							<Route exact path='/home' component={Home} />
							<Route exact path='/createquiz' component={CreateQuiz} />
							<Route exact path='/editquiz' component={EditQuiz} />
							<Route exact path='/deletequiz' component={DeleteQuiz} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;

