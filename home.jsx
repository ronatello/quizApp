import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import * as Colors from '@material-ui/core/colors';
import '../styles/home.css';

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};

const styles = theme => ({

	root: {
		backgroundColor: theme.palette.background.paper,
	},

	tabs: {
        backgroundColor: Colors.indigo[900],
		primary: theme.palette.background.paper,
		secondary: Colors.pink['A400'],
		color: '#FFFFFF',
    },
});


class Home extends Component {
	
	constructor() {
		super();

		this.state = {
			admin: 0,
			value: 0,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeIndex = this.handleChangeIndex.bind(this);

		this.createQuiz = this.createQuiz.bind(this);

		this.logout = this.logout.bind(this);
	}
	
	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	createQuiz(event) {
		if(this.admin === 1)
		{
			this.props.history.push('/createquiz');
		}
	}

	logout(event)
	{
		event.preventDefault();
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('firstname');
		sessionStorage.removeItem('lastname');
		sessionStorage.removeItem('admin');
		this.props.history.push('/');
	}

	componentDidMount() {
		if(sessionStorage.getItem('admin') == 1)
			{
				this.setState({admin: 1});
			}
	}

	render()
	{
		if(sessionStorage.getItem('name') === null)
		{
			this.props.history.push('/');
			return null;
		}

		else {
			const { classes, theme } = this.props;

			return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs className={classes.tabs}
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="secondary"
						fullWidth
					>
						<Tab label="Categories" />
						<Tab label="Leaderboard" />
						<Tab label="Profile" />
						{this.state.admin == 1 && 
							<Tab label="Admin Panel" />
						}
					</Tabs>
				</AppBar>

				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.value}
					onChangeIndex={this.handleChangeIndex}
				>
					<TabContainer dir={theme.direction}>
						Item One
					</TabContainer>

					<TabContainer dir={theme.direction}>
						Item Two
					</TabContainer>

					<TabContainer dir={theme.direction}>
						Item Three
					</TabContainer>

					<TabContainer dir={theme.direction}>
						<a href="" onClick={this.createQuiz}>Create Quiz</a>
						<br />
					</TabContainer>

				</SwipeableViews>

				<button type="button" className="btn btn-default" onClick={this.logout}>Logout</button>
			</div>
			)
		}
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);