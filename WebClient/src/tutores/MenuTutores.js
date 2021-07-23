import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const url="http://localhost:64800/api/ControladorTutor/";
class MenuTutores extends React.Component {

state={
	data:[],
	modalInsertar:false,
	modalEliminar:false,
	form:{
		idtutor:'',
		nombre:'',
		app:'',
		apm:'',
		idparentesco:'',
		parentesco:'',
	 	correo:'',
		telefono:'',		
	}
}


selecionarTutor=(i)=>{
	
	this.setState({
		tipoModal:'actualizar',
		form:{
			idtutor:i.idtutor,
			nombre: i.nombre,
			app: i.app,
			apm: i.apm,
			idparentesco: i.idparentesco,			
			correo: i.correo,
			telefono: i.telefono
		
			
		}
	})
}

putTutor=()=>{

	let string = this.state.form.idparentesco;
    let a = parseInt(string);


this.state = {
   form:{ 
   	idtutor:this.state.form.idtutor,
   	nombre:this.state.form.nombre,
   	app:this.state.form.app,
   	apm:this.state.form.apm,
   	correo:this.state.form.correo,
   	idparentesco:a,
   	telefono:this.state.form.telefono
   },
  modalInsertar:true
}


	axios.put(url+this.state.form.idtutor,this.state.form).then(response=>{
		this.modalInsertar();
		this.getTutor();
	})
}

postTutor=async()=>{

	let string = this.state.form.idparentesco;
    let a = parseInt(string);


this.state = {
   form:{ 
   	idtutor:this.state.form.idtutor,
   	nombre:this.state.form.nombre,
   	app:this.state.form.app,
   	apm:this.state.form.apm,
   	correo:this.state.form.correo,
   	idparentesco:a,
   	telefono:this.state.form.telefono
   },
  modalInsertar:true
}


	await axios.post(url,this.state.form).then(responde=>{
		this.modalInsertar();
		this.getTutor();
	
	}).catch(error=>{
		console.log(error.message);
	})
}

deleteTutor=()=>{

	axios.delete(url+this.state.form.idtutor).then(response=>{
		this.setState({modalEliminar: false});
		this.getTutor();
	})
}

getTutor=()=>{
	axios.get(url).
	then(response=>{
		this.setState({data:response.data});
	
	}).catch(error=>{
		console.log(error.message);
	})
}
	componentDidMount () {
	this.getTutor();
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
			return (
				<div className="App">
					
				<table className="table table stripped">
			
					<thead className="listHeader">
						<tr>
							<th>Nombre</th>
							<th>Apellidos</th>
							<th>Parentesco</th>
							<th>Correo</th>
							<th>Telefono</th>
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.data.map(i => 
								 <If condition={ i.idtutor!="0"}>
									  <Then>
									<tr>
										<td>{i.nombre}</td>
										<td>{i.app} {i.apm}</td>
										
										<td>{i.parentesco}</td>
										<td>{i.correo}</td>
										<td>{i.telefono}</td>
										<td><button type="button" className="btn btn-primary" onClick={()=>{this.selecionarTutor(i) ;this.modalInsertar()}}>Editar</button></td>
										<td><button type="button" onClick={()=>{this.selecionarTutor(i); this.setState({modalEliminar:true})}} className="btn btn-danger">Eliminar</button></td>
									</tr>

									   </Then>
         							  
         								   </If>
							)
						}
							<button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}> Agregar Tutor</button>
				    </tbody>
				</table>
				 <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                  
                 

                      <input className="form-control"  type="hidden" name="idtutor" id="idtutor" onChange={this.handleChange} value={form?form.idtutor:''}/>
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

				<select  className="form-control" name="idparentesco" onChange={this.handleChange}  >				                 
                   		{
						<If condition={this.state.form!=null && this.state.form.idparentesco=="1"}>
									  <Then>
         							  <option selected="true" value="1" >Padre</option>
         							  <option  value="2" >Madre</option>
         							  <option  value="3" >Familiar</option>
         							  <option  value="4" >Conocido</option>
         							  </Then>
         							  <ElseIf condition={this.state.form!=null && this.state.form.idparentesco=="2"}>
         							  <option  value="1" >Padre</option>
         							  <option  value="2" selected="true" >Madre</option>
         							  <option  value="3" >Familiar</option>
         							  <option  value="4" >Conocido</option>
         							  </ElseIf>
         							  <ElseIf condition={ this.state.form!=null && this.state.form.idparentesco=="3"}>
         							  <option  value="1" >Padre</option>
         							  <option  value="2" >Madre</option>
         							  <option  selected="true" value="3" >Familiar</option>
         							  <option  value="4" >Conocido</option>
         							  </ElseIf>
         							  <ElseIf condition={this.state.form!=null && this.state.form.idparentesco=="4"}>
         							  <option selected="true" value="1" >Padre</option>
         							  <option  value="2" >Madre</option>
         							  <option  value="3" >Familiar</option>
         							  <option  selected="true" value="4" >Conocido</option>
         							  </ElseIf>
         							  <ElseIf condition={ this.state.form==null || this.state.tipoModal=='insertar'}>
         							  <option selected="true"   value="0" >Sin Definir</option>
         							  <option  value="1" >Padre</option>
         							  <option  value="2" >Madre</option>
         							  <option  value="3" >Familiar</option>
         							  <option  value="4" >Conocido</option>
         							  </ElseIf>

         				</If>				
					}		
  						</select>
  						<br />
                      <label htmlFor="correo">Correo</label>
                    <input className="form-control" type="text" name="correo" id="correo" onChange={this.handleChange} value={form?form.correo:''}/>
                    <br />
                     <label htmlFor="telefono">Telefono</label>
                    <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono:''}/>
                    <br />
                  </div>
                </ModalBody>
                <ModalFooter>
                {
                	this.state.tipoModal=='insertar'?
 					<button className="btn btn-success" onClick={()=>this.postTutor()}>
                	Insertar
					</button>:<button className="btn btn-primary" onClick={()=>this.putTutor()}>
					actualizar
					</button>
            	}
               
				<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
				</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.modalEliminar}>
					<ModalBody>
					Estas seguro de eliminar el Tutor: {form && form.nombre}
					</ModalBody>
					<ModalFooter>
					<button className="btn btn-danger" onClick={()=>this.deleteTutor()} >Si</button>
					<button className="btn btn-secundary"  onClick={()=>this.setState({modalEliminar:false})} >No</button>
					</ModalFooter>
					</Modal>
				</div>				
			);
		} 
		
	} 

 


export default MenuTutores;