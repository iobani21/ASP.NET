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
class AddMaestros extends React.Component {
	constructor (props) {
		super(props);

		// mantiene el estado del formulario
		this.state = {
			nombre: '',
			app: '',
			apm: '',
			idpuesto: '',
			rfc: '',
			direccion:'',
			correo:'',
			telefono:'',
			clave:''
		}
	}

	// función de envío de datos al backend
	Add = () => {
		const data = {
			"nombre":this.state.nombre,
			"app":this.state.app,
			"apm":this.state.apm,
			"idpuesto":parseInt(this.state.idpuesto),
			"rfc":this.state.rfc,
		    "direccion":this.state.direccion,
			"correo":this.state.correo,	
			"telefono":this.state.telefono,
			"clave":this.state.clave,
			"gender":"F"
		}
		axios.post ('http://localhost:64800/api/ControladorMaestro/', JSON.stringify(data), {
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		}).then (json => {
			if (json.data.status === 'Success') {
				alert("Data saved!");
				//this.props.history.push('/employeesList');
			} else {
				alert('Data not saved!');
				//debugger;
				//this.props.history.push('employeesList');
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
				<h4 className="PageHeading">Ingresa la Informacion del Nuevo Trabajador</h4>
				<Form className="form">
					<Col>
						<FormGroup row>
							<Label for="name" sm={2}>Nombre</Label>
							<Col sm={2}>
								<Input type="text" name="nombre" onChange={this.handleChange} value={this.state.nombre} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Apellido Paterno</Label>
							<Col sm={2}>
								<Input type="text" name="app" onChange={this.handleChange} value={this.state.app} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Apellido Materno</Label>
							<Col sm={2}>
								<Input type="text" name="apm" onChange={this.handleChange} value={this.state.apm} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>ID Puesto</Label>
							<Col sm={2}>
								<Input type="text" name="idpuesto" onChange={this.handleChange} value={this.state.idpuesto} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>RFC</Label>
							<Col sm={2}>
								<Input type="text" name="rfc" onChange={this.handleChange} value={this.state.rfc} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Direccion</Label>
							<Col sm={2}>
								<Input type="text" name="direccion" onChange={this.handleChange} value={this.state.direccion} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Correo</Label>
							<Col sm={2}>
								<Input type="text" name="correo" onChange={this.handleChange} value={this.state.correo} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Telefono</Label>
							<Col sm={2}>
								<Input type="text" name="telefono" onChange={this.handleChange} value={this.state.telefono} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Clave</Label>
							<Col sm={2}>
								<Input type="text" name="clave" onChange={this.handleChange} value={this.state.clave} />
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

export default AddMaestros;