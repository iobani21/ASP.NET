import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FaUserCog} from 'react-icons/fa';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import "./ListaMaestros.css";
const url="http://localhost:64800/api/ControladorMaestro/";
class ListaMaestros extends React.Component {

state={
	data:[],
	modalInsertar:false,
	modalEliminar:false,
	form:{
		idmaestro:'',
		nombre:'',
		app:'',
		apm:'',
		puesto:'',
		rfc:'',
		direccion:'',
		correoeletronico:'',
		telefono:'',
		clave:'',
		tipoModal:'',
		idpuesto:'',
	}
}


selecionarMaestro=(i)=>{
	
	this.setState({
		tipoModal:'actualizar',
		form:{
			idmaestro:i.idmaestro,
			nombre: i.nombre,
			app: i.app,
			apm: i.apm,
			puesto: i.puesto,			
			rfc: i.rfc,
			direccion: i.direccion,
			correo: i.correo,
			telefono: i.telefono,
			clave: i.clave,
			idpuesto: i.idpuesto
			
		}
	})
}

putMaestro=()=>{
 var num = this.state.form.idpuesto;
 var n = num.toString();
 
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


	axios.put(url+this.state.form.idmaestro,this.state.form).then(response=>{
		this.modalInsertar();
		this.getMaestros();
		alert("Maestro Modificado!");
	}).catch(error=>{
    alert("Error al Modificar Maestro *Verifique los campos*");
		console.log(error.message);
	})
}

postMaestro=async()=>{
	await axios.post(url,this.state.form).then(responde=>{
		this.modalInsertar();
		this.getMaestros();
	
		alert("Maestro Dado de Alta!");
	}).catch(error=>{
    alert("Error al dar de alta *Verifique los campos*");
		console.log(error.message);
	})
}

deleteMaestro=()=>{
	axios.delete(url+this.state.form.idmaestro).then(response=>{
		this.setState({modalEliminar: false});
		this.getMaestros();

		alert("Maestro Eliminado!");
	}).catch(error=>{
    alert("Error al Eliminar");
		console.log(error.message);
	})
}

getMaestros=()=>{
	axios.get(url).
	then(response=>{
		this.setState({data:response.data});
	
	}).catch(error=>{
		console.log(error.message);
	})
}
	componentDidMount () {
	this.getMaestros();
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




	

	render () {
		const {form}=this.state;
		 var nivel = localStorage.getItem('menu');
		  var maestro = localStorage.getItem('idmaestro');
			return (
				<div className="App">
					
				<table  className="table table stripped">
			
					<thead className="listHeader">
						<tr>
							<th>Nombre</th>
							<th>Apellido Pat</th>
							<th>Apellido Mat</th>
							<th>Puesto</th>
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.data.map(i => 
 							<If condition={ nivel=="2" && i.idpuesto!="1" && maestro!=i.idmaestro}>	
 							<Then>
								 <If condition={ i.idmaestro!="0"}>
									  <Then>
									<tr>
										<td>{i.nombre}</td>
										<td>{i.app}</td>
										<td>{i.apm}</td>
										<td>{i.puesto}</td>
										 <If condition={ nivel=="1" }>
										  <Then>
										<td><button type="button" className="btn btn-primary" onClick={()=>{this.selecionarMaestro(i) ;this.modalInsertar()}}>Editar</button></td>
										<td><button type="button" onClick={()=>{this.selecionarMaestro(i); this.setState({modalEliminar:true})}} className="btn btn-danger">Eliminar</button></td>
									 </Then>   
									       		  <ElseIf condition={nivel=="2"}>
         							 <td><button type="button" className="btn btn-primary" onClick={()=>{this.selecionarMaestro(i) ;this.modalInsertar()}}>Ver Informacion</button></td>
         							  </ElseIf>					  
         								  </If>

									</tr>

									   </Then>
         							   </If>
         							  </Then>
         					 

         							 <ElseIf condition={nivel=="1"  &&  maestro!=i.idmaestro}>
         							  <If condition={ i.idmaestro!="0"}>
									  <Then>
									<tr>
										<td>{i.nombre}</td>
										<td>{i.app}</td>
										<td>{i.apm}</td>
										<td>{i.puesto}</td>
										 <If condition={ nivel=="1"}>
										  <Then>
										<td><button type="button" className="btn btn-primary" onClick={()=>{this.selecionarMaestro(i) ;this.modalInsertar()}}>Editar</button></td>
										<td><button type="button" onClick={()=>{this.selecionarMaestro(i); this.setState({modalEliminar:true})}} className="btn btn-danger">Eliminar</button></td>
									 </Then>   
									       		  <ElseIf condition={nivel=="2"}>
         							 <td><button type="button" className="btn btn-primary" onClick={()=>{this.selecionarMaestro(i) ;this.modalInsertar()}}>Editar</button></td>
         							  </ElseIf>					  
         								  </If>

									</tr>

									   </Then>
         							   </If>
         							 </ElseIf>

         					 </If>
							)
						}
							<button  className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}> Agregar Maestro</button>
				    </tbody>
				</table>
				 <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                <h3 aling="center"> <FaUserCog /></h3>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                  
                 

                      <input className="form-control"  type="hidden" name="idmaestro" id="idmaestro" onChange={this.handleChange} value={form?form.idmaestro:''}/>
                    <br />
                     <label htmlFor="nombre">nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre:''}/>
                    <br />
                    <label htmlFor="app">Apellido Pat</label>
                    <input className="form-control" type="text" name="app" id="app" onChange={this.handleChange} value={form?form.app:''}/>
                    <br />
                     <label htmlFor="apm">Apellido</label>
                    <input className="form-control" type="text" name="apm" id="apm" onChange={this.handleChange} value={form?form.apm:''}/>
                    <br />




           	<label htmlFor="idpuesto">Puesto</label>
                      	<br />
       					<select  className="form-control" name="idpuesto" onChange={this.handleChange}  >				                 
                   		{
						<If condition={this.state.form!=null && this.state.form.idpuesto=="1"}>
									  <Then>
         							  <If condition={nivel==1}>
         							  <Then>
         							  <option select="true" value="1" >Director</option>
         							  </Then>
         							  </If>
         							  <option  value="2" >Secretario</option>  
         							  <option  value="3" >Maestro</option>
         						
         							  </Then>
         							  <ElseIf condition={this.state.form!=null && this.state.form.idpuesto=="2"}>
         							  <If condition={nivel==1}>
         							  <Then>
         							  <option  value="1" >Director</option>
         							  </Then>
         							  </If>
         							  <option selected="true" value="2" >Secretario</option>
         							  <option  value="3" >Maestro</option>
         							  </ElseIf>
         							  <ElseIf condition={ this.state.form!=null && this.state.form.idpuesto=="3"}>
         							   <If condition={nivel==1}>
         							  <Then>
         							  <option  value="1" >Director</option>
         							  </Then>
         							  </If>
         							  <option  value="2" >Secretario< /option>
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

                      <label htmlFor="rfc">RFC</label>
                    <input className="form-control" type="text" name="rfc" id="rfc" onChange={this.handleChange} value={form?form.rfc:''}/>
                    <br />
                     <label htmlFor="direccion">Direccion</label>
                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form?form.direccion:''}/>
                    <br />
                    <label htmlFor="correo">Correo</label>
                    <input className="form-control" type="text" name="correo" id="correo" onChange={this.handleChange} value={form?form.correo:''} />
                    <br />
                     <label htmlFor="telefono">Telefono</label>
                    <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono:''}/>
                    <br />
                     <label htmlFor="clave">Contraseña</label>
                    <input className="form-control" type="text" name="clave" id="clave" onChange={this.handleChange}  value={form?form.clave:''}/>
                    <br />
                  </div>
                </ModalBody>
                <ModalFooter>
                {
                	this.state.tipoModal=='insertar'?
 					<button className="btn btn-success" onClick={()=>this.postMaestro()}>
                	Guardar
					</button>:<button className="btn btn-primary" onClick={()=>this.putMaestro()}>
					actualizar
					</button>
            	}
               
				<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
				</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.modalEliminar}>
					<ModalBody>
					Estas seguro de eliminar el Maestro: {form && form.nombre}
					</ModalBody>
					<ModalFooter>
					<button className="btn btn-danger" onClick={()=>this.deleteMaestro()} >Si</button>
					<button className="btn btn-secundary"  onClick={()=>this.setState({modalEliminar:false})} >No</button>
					</ModalFooter>
					</Modal>


				</div>				
			);
		} 
		
	} 

 


export default ListaMaestros;