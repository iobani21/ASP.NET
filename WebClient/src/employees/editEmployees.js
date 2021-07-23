// import libraries
import React from 'react';
import axios from 'axios';

// import css
//import './Addemployees.css';

// import widgets
import {
	Container,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';

// clase modelo para los datos del formulario
class AddEmployees extends React.Component {
	constructor (props) {
		super(props);

		// mantiene el estado del formulario
		this.state = {
			EmpNo: '',
			FirstName: '',
			LastName: '',
			BirthDate: '',
			HireDate: '',
			ID: ''
		}
	}

	componentDidMount () {
		const id = this.props.match.params.id;

		axios.get ('http://localhost:5001/api/employees/' + id)
		.then (response => {
			if (response.status === 200) {
				this.setState (
					{
						EmpNo: response.data.empNo,
						FirstName: response.data.firstName,
						LastName: response.data.lastName,
						BirthDate: response.data.birthDate,
						HireDate: response.data.hireDate,
						ID: id
					}
				);	
			}
		})
		.catch (function (error) {
			console.log(error);
		})
	}

	// función de envío de datos al backend
	Add = () => {
		const data = {
			"empNo":parseInt(this.state.EmpNo),
			"birthDate":this.state.BirthDate,
		    "firstName":this.state.FirstName,
			"lastName":this.state.LastName,
			"gender":"F",
			"hireDate":this.state.HireDate	
		}

		axios.put ('http://localhost:5001/api/employees/'+this.state.ID, JSON.stringify(data), {
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		}).then (json => {
			console.log(json.data.status);
			if (json.data.status === 'Success') {
				alert("Data saved!");
				//this.props.history.push('/employeesList');
			} else {
				alert('Data not saved!');
				//debugger;
				//this.props.history.push('/employeesList');
			}
		})
	}

	// modifica el estado del formulario de acuerdo a los valores
	// de los campos
	handleChange = (e) => {
		this.setState ({
			[e.target.name]:e.target.value
		});
	}

	// dibuja al componente
	render () {
		return (
			<Container className="App">
				<h4 className="PageHeading">Enter employee infomation</h4>
				<Form className="form">
					<Col>
						<FormGroup row>
							<Label for="name" sm={2}>No. Employee</Label>
							<Col sm={2}>
								<Input type="text" name="EmpNo" onChange={this.handleChange} value={this.state.EmpNo} disabled />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Name</Label>
							<Col sm={2}>
								<Input type="text" name="FirstName" onChange={this.handleChange} value={this.state.FirstName} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>First Name</Label>
							<Col sm={2}>
								<Input type="text" name="LastName" onChange={this.handleChange} value={this.state.LastName} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Birth Date</Label>
							<Col sm={2}>
								<Input bsSize="lg" type="date" name="BirthDate" value={this.state.BirthDate} onChange={this.handleChange} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Hire Date</Label>
							<Col sm={2}>
								<Input type="text" name="HireDate" onChange={this.handleChange} value={this.state.HireDate} />
							</Col>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup row>
							<Col sm={5}>
							</Col>
							<Col sm={1}>
								<button type="button" onClick={this.Add} className="btn btn-success">Submit</button>
							</Col>
							<Col sm={1}>
								<Button color="danger">Cancel</Button>{' '}
							</Col>
							<Col sm={5}>
							</Col>
						</FormGroup>
					</Col>
				</Form>
			</Container>
		);
	}
}

export default AddEmployees;	