import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaUserEdit} from 'react-icons/fa';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
	Container,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';

const url="http://localhost:64800/api/ControladorMaestro/";
class EditarInformacion extends React.Component {

state={
	data:[],
	modalInsertar:false,
	modalEliminar:false,
	form:{
		idmaestro:'',
		nombre:'',
		app:'',
		apm:'',
		idpuesto:'',
		rfc:'',
		direccion:'',
		correoeletronico:'',
		telefono:'',
		clave:'',
		tipoModal:''
		
	}
}

 Cerrar() {
	localStorage.clear();
	window.location.reload();
}

	componentDidMount () {
	this.MiInf();
	}
	modalInsertar=()=>{

		this.setState({modalInsertar: !this.state.modalInsertar});
	}
	handleChange=async e=>{
		e.persist();
		await this.setState({
			form:{
				...this.state.form,
				[e.target.name]:e.target.value
			}
		});
			}


MiInf=()=>{
	 var idmaestro = localStorage.getItem('idmaestro');
	axios.get(url+idmaestro).
	then(response=>{
		this.setState({
			data:response.data
		}

			);
console.log(this.state.data);

	this.state.data.map(i => 
		this.setState({
		form:{
			idmaestro:i.idmaestro,
			nombre: i.nombre,
			app: i.app,
			apm: i.apm,
			idpuesto: i.puesto,			
			rfc: i.rfc,
			direccion: i.direccion,
			correo: i.correo,
			telefono: i.telefono,
			clave: i.clave
			
		}
	})
				 )


	}).catch(error=>{
		console.log(error.message);
	})

}


putMaestro=()=>{
 var idmaestro = this.state.form.idpuesto;
 var n=idmaestro;
 if(idmaestro=="Secretaria")
 	n="2";
  if(idmaestro=="Director")
 	n="1";
  if(idmaestro=="Maestro")
 	n="3";
this.state = {
   form:{ 
   	idmaestro:this.state.form.idmaestro,
   	nombre:this.state.form.nombre,
   	app:this.state.form.app,
   	apm:this.state.form.apm,
   	idpuesto:n,
   	rfc:this.state.form.rfc,
    direccion:this.state.form.direccion,
    correo:this.state.form.correo,
    telefono:this.state.form.telefono,
    clave:this.state.form.clave,





   },
  modalInsertar:true
}

	console.log(this.state.form);
	axios.put(url+this.state.form.idmaestro,this.state.form).then(response=>{
			console.log(this.state.form);
			this.Cerrar();
	})
}

	

	render () {
		 var nivel = localStorage.getItem('menu');
		const {form}=this.state;
			return (
			<Container  className="App" >
				<h4 className="PageHeading"><FaUserEdit /> Modifica Tu Informacion</h4>
				<Form className="form" >
					<Col  >
							<FormGroup row >
							<Label for="name" sm={2}>Nombre</Label>
							<Col sm={2}>
								<Input type="text" name="nombre" onChange={this.handleChange} value={form.nombre} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Apellido Paterno</Label>
							<Col sm={2}>
								<Input type="text" name="app" onChange={this.handleChange} value={form.app} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Apellido Materno</Label>
							<Col sm={2}>
								<Input type="text" name="apm" onChange={this.handleChange} value={form.apm} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Puesto</Label>
							<Col sm={2}>
     					
                      	<br />
       					<select  className="form-control" name="idpuesto" onChange={this.handleChange}  >				                 
                   		{
						<If condition={this.state.form!=null && nivel==1}>
									  <Then>
         							  <option selected="true" value="1" >Director</option>
         							  <option  value="2" >Secretario</option>
         							  <option  value="3" >Maestro</option>
         						
         							  </Then>
         							  <ElseIf condition={this.state.form!=null && nivel==2}>        							
         							  <option selected="true" value="2" >Secretario</option>
         							  <option  value="3" >Maestro</option>
         							  </ElseIf>
         							  <ElseIf condition={ this.state.form!=null && nivel==3}>
         							  <option selected="true" value="3" >Maestro</option>
         							 
         							  </ElseIf>
         							   <ElseIf condition={this.state.form==null || this.state.tipoModal=='insertar' }>
 									 <option  value="0" >Sin Especificar</option>
         							  <option  value="1" >Director</option>
         							  <option  value="2" >Secretario< /option>
         							  <option  value="3" >Maestro</option>
         							</ElseIf>

         				</If>				
					}
</select>


							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>RFC</Label>
							<Col sm={2}>
								<Input type="text" name="rfc" onChange={this.handleChange} value={form.rfc} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Direccion</Label>
							<Col sm={2}>
								<Input type="text" name="direccion" onChange={this.handleChange} value={form.direccion} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Correo</Label>
							<Col sm={2}>
								<Input type="text" name="correo" onChange={this.handleChange} value={form.correo} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Telefono</Label>
							<Col sm={2}>
								<Input type="text" name="telefono" onChange={this.handleChange} value={form.telefono} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="name" sm={2}>Clave</Label>
							<Col sm={2}>
								<Input type="password" name="clave" onChange={this.handleChange} value={form.clave} />
							</Col>
						</FormGroup>

					</Col>
					<Col>
						<FormGroup row>
							<Col sm={5}>
							</Col>
							<Col sm={1}>
								<button type="button" onClick={this.putMaestro}  className="btn btn-success">Guardar</button>
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

 


export default EditarInformacion;