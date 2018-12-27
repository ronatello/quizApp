import React, { Component } from 'react';
import '../styles/login.css';

class Login extends Component 
{

	constructor() 
	{
	
		super();
		this.state = 
		{
			formData: 
			{
				firstname: "",
				lastname: "",
				username: "",
				password: "",
				admin: 0,
			},
	
			submitted: false,
			login: 1,
			errorR: 0,
			errorL: 0,
		}

		this.handleFChange = this.handleFChange.bind(this);
		this.handleLChange = this.handleLChange.bind(this);
		this.handleUChange = this.handleUChange.bind(this);
		this.handlePChange = this.handlePChange.bind(this);

		this.handleSubmitR = this.handleSubmitR.bind(this);
		this.handleSubmitL = this.handleSubmitL.bind(this);
		this.lSwitch = this.lSwitch.bind(this);
		this.rSwitch = this.rSwitch.bind(this);
	}


	handleSubmitR (event)
	{
	
		event.preventDefault();
		fetch('http://localhost:8080/register', 
		{
			method: 'POST',
			body: JSON.stringify(this.state.formData),
		})
	
			.then(response => {
		
				if (response.status >= 200 && response.status < 300)
					this.setState({submitted: true, errorR: 0});

				if (response.status == 400)
					this.setState({submitted: true, errorR: 1})
			
			});
		
	}

	handleSubmitL (event)
	{
	
		event.preventDefault();
		fetch('http://localhost:8080/login', 
		{
			method: 'POST',
			body: JSON.stringify(this.state.formData),
		})
	
			.then(response => {
		
				if (response.status >= 200 && response.status < 300)
				{
					this.setState({submitted: true, errorL: 0})

					return response.json();
				}

				else if (response.status == 404)
					this.setState({submitted: true, errorL: 1})
					return;

			})

				.then(data => {
					this.setState({formData: data})
						
					sessionStorage.setItem('name', this.state.formData.username);
					sessionStorage.setItem('admin', this.state.formData.admin);
					sessionStorage.setItem('firstname', this.state.formData.firstname);
					sessionStorage.setItem('lastname', this.state.formData.lastname);

					this.props.history.push('/home');
						
					});
	}

	handleFChange(event) 
	{
		const formVariable = {...this.state.formData};
		formVariable.firstname = event.target.value;
		this.setState({formData: formVariable});
	}

	handleLChange(event) 
	{
		const formVariable = {...this.state.formData};
		formVariable.lastname = event.target.value;
		this.setState({formData: formVariable});
	}

	handleUChange(event) 
	{
		const formVariable = {...this.state.formData};
		formVariable.username = event.target.value;
		this.setState({formData: formVariable});
	}

	handlePChange(event) 
	{
		const formVariable = {...this.state.formData};
		formVariable.password = event.target.value;
		this.setState({formData: formVariable});
	}

	rSwitch(event)
	{
		event.preventDefault();
		this.setState({login: 0});
		this.setState({submitted: false});
	}

	lSwitch(event)
	{
		event.preventDefault();
		this.setState({login: 1});
		this.setState({submitted: false});
	}


	render() 
	{
		return (
		
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Quiz.go</h1>
				</header>
				<br/>
				<br/>
		
				{this.state.login == 0 && 
				
					<div className="formContainer">
		
						<form onSubmit={this.handleSubmitR}>
			
							{this.state.submitted && this.state.errorR == 1 &&
							
								<h4>Username already exists.</h4>
							}

							<div className="form-group">
								<label>First Name</label>
								<input type="text" className="form-control" value={this.state.firstname} onChange={this.handleFChange}/>
							</div>
				
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" className="form-control" value={this.state.lastname} onChange={this.handleLChange}/>
							</div>
				
							<div className="form-group">
								<label>Username</label>
								<input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
							</div>

							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
							</div>
				
							<button type="submit" className="btn btn-default">Submit</button>

							<div className="form-group">
								Already have an account? <a href="" onClick={this.lSwitch}>Login</a>
							</div>
				
						</form>
		
					</div>
				}

				{this.state.login == 1 && 
				
					<div className="formContainer">
		
						<form onSubmit={this.handleSubmitL}>

							{this.state.submitted && this.state.errorL == 1 &&
							
								<h4>Username and password does not match.</h4>
							}
				
							<div className="form-group">
								<label>Username</label>
								<input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
							</div>

							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
							</div>
				
							<button type="submit" className="btn btn-default">Submit</button>

							<div className="form-group">
								Don't have an account? <a href="" onClick={this.rSwitch}>Register now</a>
							</div>
				
						</form>
		
					</div>
				}
			
			</div>
		);
	}
}

export default Login;