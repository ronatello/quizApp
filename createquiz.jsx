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


import '../styles/createquiz.css';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
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


class CreateQuiz extends Component {

	constructor() {
		super();

		this.state = {
			
			quizData: {
				quizname: "",
				genre: "", 
			},

			questionData: {
				question: "",
				type: "",
				optiona: "",
				optionb: "",
				optionc: "",
				optiond: "",

				answera: false,
				answerb: false,
				answerc: false,
				answerd: false,
				quizid: 0,

			},

			quizname: "Quiz Name",
			genre: "Genre",
			qno: "5",

			proceed: 0,

			iterator: -1,

			questionname: [],
			type: [],
			answera: [],
			answerb: [],
			answerc: [],
			answerd: [],

			boolanswera: [],
			boolanswerb: [],
			boolanswerc: [],
			boolanswerd: [],

			answer: [],

			error: 0,

		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
		this.handleQuestion = this.handleQuestion.bind(this);
		this.handleAnswera = this.handleAnswera.bind(this);
		this.handleAnswerb = this.handleAnswerb.bind(this);
		this.handleAnswerc = this.handleAnswerc.bind(this);
		this.handleAnswerd = this.handleAnswerd.bind(this);
		this.handleType1Answer = this.handleType1Answer.bind(this);
		this.handleType2AnswerA = this.handleType2AnswerA.bind(this);
		this.handleType2AnswerB = this.handleType2AnswerB.bind(this);
		this.handleType2AnswerC = this.handleType2AnswerC.bind(this);
		this.handleType2AnswerD = this.handleType2AnswerD.bind(this);
		this.handleProceed = this.handleProceed.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleFront = this.handleFront.bind(this);
		this.createQuestions = this.createQuestions.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		const quizVariable = {...this.state.quizData};
		
		quizVariable.quizname = this.state.quizname;
		quizVariable.genre = this.state.genre;

		this.setState({quizData: quizVariable});

		fetch('http://localhost:8080/adminquiz', 
		{
			method: 'POST',
			body: JSON.stringify(this.state.quizData),
		})
	
			.then(response => {
		
				if (response.status >= 200 && response.status < 300)
				{
					this.setState({error: 0});

					return response.json();
				}

				else if (response.status == 404)
				{
					this.setState({error: 1});
				}
			})

				.then(data => {

					const questionVariable = {...this.state.questionData};

					for(let j = 0; j < this.state.qno; j++)
					{
						questionVariable.question = this.state.questionname[j];
						questionVariable.type = this.state.type[j];
						questionVariable.optiona = this.state.answera[j];
						questionVariable.optionb = this.state.answerb[j];
						questionVariable.optionc = this.state.answerc[j];
						questionVariable.optiond = this.state.answerd[j];
						questionVariable.answera = this.state.boolanswera[j];
						questionVariable.answerb = this.state.boolanswerb[j];
						questionVariable.answerc = this.state.boolanswerc[j];
						questionVariable.answerd = this.state.boolanswerd[j];

						questionVariable.quizid = data.id;

						this.setState({questionData: questionVariable});

						fetch('http://localhost:8080/adminquestion',
						{
							method: 'POST',
							body: JSON.stringify(this.state.questionData),
						});
					}

					this.props.history.push('/home');
				})
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleChangeType = num => event => {
		this.setState({ 
			type: update(this.state.type, {[num]: {$set: event.target.value} } )
		});
	};


	handleQuestion = num => event => {

		this.setState({
			questionname: update(this.state.questionname, {[num]: {$set: event.target.value} } )
		})
	}

	handleAnswera = num => event => {

		this.setState({
			answera: update(this.state.answera, {[num]: {$set: event.target.value} } )
		})
	}

	handleAnswerb = num => event => {

		this.setState({
			answerb: update(this.state.answerb, {[num]: {$set: event.target.value} } )
		})
	}

	handleAnswerc = num => event => {

		this.setState({
			answerc: update(this.state.answerc, {[num]: {$set: event.target.value} } )
		})
	}

	handleAnswerd = num => event => {

		this.setState({
			answerd: update(this.state.answerd, {[num]: {$set: event.target.value} } )
		})
	}

	handleType1Answer = num => event => {

		this.setState({
			answer: update(this.state.answer, {[num]: {$set: event.target.value } } )
		})

		if(event.target.value === "1")
		{
			this.setState({
				boolanswera: update(this.state.boolanswera, {[num]: {$set: true} } )
			})
			this.setState({
				boolanswerb: update(this.state.boolanswerb, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerc: update(this.state.boolanswerc, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerd: update(this.state.boolanswerd, {[num]: {$set: false} } )
			})
		}

		else if(event.target.value === "2")
		{
			this.setState({
				boolanswera: update(this.state.boolanswera, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerb: update(this.state.boolanswerb, {[num]: {$set: true} } )
			})
			this.setState({
				boolanswerc: update(this.state.boolanswerc, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerd: update(this.state.boolanswerd, {[num]: {$set: false} } )
			})
		}

		else if(event.target.value === "3")
		{
			this.setState({
				boolanswera: update(this.state.boolanswera, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerb: update(this.state.boolanswerb, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerc: update(this.state.boolanswerc, {[num]: {$set: true} } )
			})
			this.setState({
				boolanswerd: update(this.state.boolanswerd, {[num]: {$set: false} } )
			})
		}

		else if(event.target.value === "4")
		{
			this.setState({
				boolanswera: update(this.state.boolanswera, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerb: update(this.state.boolanswerb, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerc: update(this.state.boolanswerc, {[num]: {$set: false} } )
			})
			this.setState({
				boolanswerd: update(this.state.boolanswerd, {[num]: {$set: true} } )
			})
		}
	}

	handleType2AnswerA = num => event => {
		this.setState({ 
			boolanswera: update(this.state.boolanswera, {[num]: {$set: event.target.checked } } )
		})
	}

	handleType2AnswerB = num => event => {
		this.setState({ 
			boolanswerb: update(this.state.boolanswerb, {[num]: {$set: event.target.checked } } )
		})
	}

	handleType2AnswerC = num => event => {
		this.setState({ 
			boolanswerc: update(this.state.boolanswerc, {[num]: {$set: event.target.checked } } )
		})
	}

	handleType2AnswerD = num => event => {
		this.setState({ 
			boolanswerd: update(this.state.boolanswerd, {[num]: {$set: event.target.checked } } )
		})
	}

	handleProceed(event) {
		event.preventDefault();

		this.setState({proceed: 1, iterator: this.state.iterator + 1});
	}

	handleBack(event) {
		event.preventDefault();

		this.setState({iterator: this.state.iterator - 1});
	}

	handleFront(event) {
		event.preventDefault();

		this.setState({iterator: this.state.iterator + 1});
	}

	createQuestions = (num) => {
		let questions = []
		const { classes, theme } = this.props;
		const { boolanswera, boolanswerb, boolanswerc, boolanswerd } = this.state;

		for (let i=0; i<num; i++)
		{
			questions.push( <div>
							{this.state.iterator == i &&
							<div>
								<RadioGroup
									aria-label="Question Type"
									name="qtype"
									className={classes.group}
									value={this.state.type[i]}
									onChange={this.handleChangeType(i)}
								>
								
									<FormControlLabel value="1" control={<Radio />} label="MCQ Single Answer" />
									<FormControlLabel value="2" control={<Radio />} label="MCQ Multiple Answer" />
								</RadioGroup>

								<TextField
									label="Question"
									className={classes.textField}
									value={this.state.questionname[i]}
									onChange={this.handleQuestion(i)}
									margin="normal"
								/>

								<TextField
									label="Answer A"
									className={classes.textField}
									value={this.state.answera[i]}
									onChange={this.handleAnswera(i)}
									margin="normal"
								/>

								<TextField
									label="Answer B"
									className={classes.textField}
									value={this.state.answerb[i]}
									onChange={this.handleAnswerb(i)}
									margin="normal"
								/>

								<TextField
									label="Answer C"
									className={classes.textField}
									value={this.state.answerc[i]}
									onChange={this.handleAnswerc(i)}
									margin="normal"
								/>

								<TextField
									label="Answer D"
									className={classes.textField}
									value={this.state.answerd[i]}
									onChange={this.handleAnswerd(i)}
									margin="normal"
								/>

								{this.state.type[i] == 1 &&
									<div>
									<RadioGroup
									aria-label="Correct Answer"
									name="answer"
									className={classes.group}
									value={this.state.answer[i]}
									onChange={this.handleType1Answer(i)}
									>
								
										<FormControlLabel value="1" control={<Radio />} label="A" />
										<FormControlLabel value="2" control={<Radio />} label="B" />
										<FormControlLabel value="3" control={<Radio />} label="C" />
										<FormControlLabel value="4" control={<Radio />} label="D" />
									</RadioGroup>

									{this.state.iterator > -1 &&
										<Button variant="contained" className={classes.button} onClick={this.handleBack}>
											BACK
										</Button>
									}

									{this.state.iterator < this.state.qno - 1 &&
										<Button variant="contained" className={classes.button} onClick={this.handleFront}>
											PROCEED
										</Button>
									}

									{this.state.iterator == this.state.qno - 1 &&
										<div>
										<Button variant="contained" className={classes.button} onClick={this.handleSubmit}>
											DONE
										</Button>
										{this.state.error == 1 &&
										<div>
											<br />
											<h4>Error: Quiz Name already exists</h4>
										</div>
										}
										</div>
									}

									</div>

								}

								{this.state.type[i] == 2 &&

									<div>
									<FormGroup>
										<FormControlLabel
											control={
												<Checkbox checked={boolanswera[i]} onChange={this.handleType2AnswerA(i)} value="1" />
											}
											
											label="A"
										/>

										<FormControlLabel
											control={
												<Checkbox checked={boolanswerb[i]} onChange={this.handleType2AnswerB(i)} value="2" />
											}
											
											label="B"
										/>

										<FormControlLabel
											control={
												<Checkbox checked={boolanswerc[i]} onChange={this.handleType2AnswerC(i)} value="3" />
											}
											
											label="C"
										/>

										<FormControlLabel
											control={
												<Checkbox checked={boolanswerd[i]} onChange={this.handleType2AnswerD(i)} value="4" />
											}
											
											label="D"
										/>
									</FormGroup>

									{this.state.iterator > -1 &&
										<Button variant="contained" className={classes.button} onClick={this.handleBack}>
											BACK
										</Button>
									}

									{this.state.iterator < this.state.qno - 1 &&
										<Button variant="contained" className={classes.button} onClick={this.handleFront}>
											PROCEED
										</Button>
									}

									{this.state.iterator == this.state.qno - 1 &&
										<div>
										<Button variant="contained" className={classes.button} onClick={this.handleSubmit}>
											DONE
										</Button>
										{this.state.error == 1 &&
										<div>
											<br />
											<h4>Error: Quiz Name already exists</h4>
										</div>
										}
										</div>
									}

									</div>
								}

								</div>
							}

							</div>
			)
		}

		return questions
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
				<form className={classes.container} Validate autoComplete="off" onSubmit={this.handleSubmit}>
					{this.state.iterator == -1 && 
						<div>
							<TextField
								id="quiz-name"
								label="Quiz Name"
								className={classes.textField}
								value={this.state.quizname}
								onChange={this.handleChange('quizname')}
								margin="normal"
							/>

							<TextField
								id="genre"
								label="Genre"
								className={classes.textField}
								value={this.state.genre}
								onChange={this.handleChange('genre')}
								margin="normal"
							/>

							<TextField
								id="qno"
								label="Number of Questions"
								className={classes.textField}
								value={this.state.qno}
								onChange={this.handleChange('qno')}
								margin="normal"
							/>

							<Button variant="contained" className={classes.button} onClick={this.handleProceed}>
								PROCEED
							</Button>
						</div>

					}

					{this.state.proceed == 1 &&
						this.createQuestions(this.state.qno)
					}

				</form>

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

export default withStyles(styles, { withTheme: true })(CreateQuiz);