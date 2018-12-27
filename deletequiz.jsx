import React, { Component } from 'react';
import update from 'immutability-helper';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import '../styles/createquiz.css';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},

	table: {
		minWidth: 700,
		width: '100%',
	},

	
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	
	dense: {
		marginTop: 19,
	},

	menu: {
		width: 200,
	},
	
	button: {
		margin: theme.spacing.unit,
	},
	
	input: {
		display: 'none',
	},

	formControl: {
		margin: theme.spacing.unit * 3,
	},
	
	group: {
		margin: `${theme.spacing.unit}px 0`,
	},
});


class DeleteQuiz extends Component {

	constructor() {
		super();

		this.state = {

			data: [],

		}

		this.redirect = this.redirect.bind(this)
	}

	componentDidMount() {
		const request = new Request('http://localhost:8080/adminquizzes');
		fetch(request)
		.then(response => response.json())
		.then(data => this.setState({data: data}));
	}

	redirect = id => event => {
		event.preventDefault();

		const req = new Request('http://localhost:8080/adminquiz/' + [id]);
		fetch(req, 
		{
			method: 'DELETE',
		})
	}

	render()
	{
		if(sessionStorage.getItem('name') === null)
		{
			this.props.history.push('/');
			return null;
		}

		if(sessionStorage.getItem('admin') !== "1")
		{
			//window
			this.props.history.push('/home');
			return null;
		}

		else {
			const { classes, theme } = this.props;

			return (
			
			<div className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Quiz Name</TableCell>
							<TableCell>Genre</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.data.map(function(item, key) {
							return (
								<TableRow key = {item.id}>
									<TableCell>{item.id}</TableCell>
									<a role="button" href="" onClick={this.redirect(item.id)}>
									<TableCell>{item.quizname}</TableCell></a>
									<TableCell>{item.genre}</TableCell>
								</TableRow>
							)
						}, this)}
					</TableBody>
				</Table>
			</div>
		)
	}
}

/*CreateQuiz.propTypes = {
{
	classes: PropTypes.object.isRequired,
};
}*/
}

export default withStyles(styles, { withTheme: true })(DeleteQuiz);