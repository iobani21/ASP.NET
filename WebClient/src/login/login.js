import React from "react";
import axios from "axios";

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Image1 from './FB.png';
import { FaKey } from 'react-icons/fa';
import { FaRegUser} from 'react-icons/fa';
import { FaFacebookSquare} from 'react-icons/fa';
import { 
	Form, 
	FormGroup,
	Label, 
	Input, 
	Media,
	Button 
} from "reactstrap";



import "./login.css";
class Login extends React.Component {

		state = {
			data:[],
	User:{
		correo:'',
		clave:'',
		}
		}
		
		


	doLogin=async()=>{

	
	await axios.post('http://localhost:64800/api/Login/',this.state.User).then(response=>{
	this.setState({data:response.data});
	

           if(this.state.data.length > 0) {
			this.state.data.map(i => 
			localStorage.setItem('Correo',i.correo),
				 )
				this.state.data.map(i => 
			localStorage.setItem('Clave',i.clave),
				 )
					this.state.data.map(i => 
			localStorage.setItem('menu',i.idpuesto),
				 )
						this.state.data.map(i => 
			localStorage.setItem('nombre',i.nombre),
				 )
						this.state.data.map(i => 
			localStorage.setItem('idmaestro',i.idmaestro),
				 )
						window.location.reload(); 
				}
				else{
					alert("Correo/Contraseña erroneas ");
					window.location.reload(); 
				}	
	}).catch(error=>{
		console.log(error.message);
	})
	

	
}

	handleChange=async e=>{
		e.persist();
		await this.setState({
			User:{
				...this.state.User,
				[e.target.name]:e.target.value
			}
		});
			}

	render () {

		const {User}=this.state;
		return (
		
			<div   className="Login">
			
	<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Inicio de Sesion</h3>
				<div class="d-flex justify-content-end social_icon">
					<span>  <a href="https://www.facebook.com/CentenarioDeJuarez01"><FaFacebookSquare  />  </a></span>
					<span><i class="fab fa-google-plus-square"></i></span>
					<span><i class="fab fa-twitter-square"></i></span>
				</div>
			</div>
			<div class="card-body">
				<Form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><FaRegUser  /></span>
						</div>
							<Input name="correo" type="text" onChange={this.handleChange} value={User?User.correo:''}   placeholder="Correo"/>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><FaKey  /></span>
						</div>
							<Input name="clave" type="password" onChange={this.handleChange} value={User?User.clave:''}  placeholder="Clave" />
					</div>
				
					<div class="form-group">
					
						<Button  type="button" class="btn float-right login_btn" onClick={this.doLogin}>
						login
					</Button>
					</div>
				</Form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
				SOE
				</div>
			
			</div>
		</div>
	</div>
</div>
			</div>

	


		);
	}

}

export default Login;



