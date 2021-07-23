import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

import {FaUserCog} from 'react-icons/fa';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const url="http://localhost:64800/api/ControladorSalon/";
const url2="http://localhost:64800/api/ControladorMaestro/";
class MenuSalones extends React.Component {

state={
	data:[],
	data2:[],
	modalInsertar:false,
	modalEliminar:false,
	form:{
		idsalon:'',
		salon:'',
		horario:'',
		nommaestro:'',
		appmaestro:'',
		apmmaestro:'',
		idmaestro:'',
		idhorario:''	
	}
}


selecionarSalon=(i)=>{
	
	this.setState({
		tipoModal:'actualizar',
		form:{
			idsalon:i.idsalon,
			salon:i.salon,
			idhorario:i.idhorario,
			idmaestro:i.idmaestro
		}
	})
}


Validar=()=>{
	alert("Entro al metodo ");
}

putSalon=()=>{
		//console.log(this.state.modalInsertar);
		//console.log(this.state.form);
	let string = this.state.form.idhorario;
    let a = parseInt(string);
    let string2 = this.state.form.idmaestro;
    let b = parseInt(string2);


this.state = {
   form:{ 
   	salon:this.state.form.salon,
   	idsalon:this.state.form.idsalon,
   	idhorario:a,
   	idmaestro:b,
   },
  modalInsertar:true
}


	axios.put(url+this.state.form.idsalon,this.state.form).then(response=>{
		this.modalInsertar();
		this.getSalones();
		alert("Salon Modificado!");
	}).catch(error=>{
    alert("Error al Modificar Salon *Verifique los campos*");
		console.log(error.message);
	})
}

postSalon=async()=>{

	let string = this.state.form.idhorario;
    let a = parseInt(string);
    let string2 = this.state.form.idmaestro;
    let b = parseInt(string2);


this.state = {
   form:{ 
   	salon:this.state.form.salon,
   	idsalon:this.state.form.idsalon,
   	idhorario:a,
   	idmaestro:b,
   },
  modalInsertar:true
}
	await axios.post(url,this.state.form).then(responde=>{
		this.modalInsertar();
		this.getSalones();
	alert("Salon Creado!");
	}).catch(error=>{
    alert("Error al crear Salon *Verifique los campos*");
		console.log(error.message);
	})
}

deleteMaestro=()=>{
	
	axios.delete(url+this.state.form.idsalon).then(response=>{
		this.setState({modalEliminar: false});
		this.getSalones();
		alert("Salon Eliminado!");
	}).catch(error=>{
    alert("Error al Eliminar Salon");
		console.log(error.message);
	})
}

getSalones=()=>{
	axios.get(url).
	then(response=>{
		this.setState({data:response.data});
	
	}).catch(error=>{
		console.log(error.message);
	})

	axios.get(url2).
	then(response=>{
		this.setState({data2:response.data});
			//console.log(this.state.data2);
	}).catch(error=>{
		console.log(error.message);
	})

}
	componentDidMount () {
	this.getSalones();
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
				<div  className="App">
					
				<table className="table table stripped">
			
					<thead className="listHeader">
						<tr>
							<th>Profesor</th>
							<th>Horario</th>
							<th>Salon</th>
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.data.map(i => 

								 <If condition={ i.idsalon!="0"}>
									  <Then>
         							  <tr>
										<td>{i.nommaestro} {i.appmaestro}</td>
										
										<td>{i.horario}</td>
										<td>{i.salon}</td>
										<td><button type="button" className="btn btn-primary" onClick={()=>{this.selecionarSalon(i) ;this.modalInsertar()}}>Editar</button></td>
										<td><button type="button" onClick={()=>{this.selecionarSalon(i); this.setState({modalEliminar:true})}} className="btn btn-danger">Eliminar</button></td>
										</tr>
         							   </Then>
         							  
         								   </If>	

									
							)

						}
							<button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}>Nuevo Salon</button>
				    </tbody>
				</table>
				 <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                  
                 

                  
                     <label htmlFor="salon">Salon</label>
                    <input className="form-control" type="text" name="salon" id="salon" onChange={this.handleChange} value={form?form.salon:''}/>
                    <br />
               			  <label htmlFor="idhorario">Turno</label>
               			  <br />

                   	   <select  className="form-control" name="idhorario" onChange={this.handleChange} >				                 
                   		{
						<If condition={this.state.form!=null && this.state.form.idhorario=="1"}>
									  <Then>
         							  <option selected="true" value="1" >Matutino</option>
         							  <option  value="2" >Vespertino</option>
         							  </Then>
         							 <ElseIf  condition={this.state.form!=null && this.state.form.idhorario=="2"}>
         							  <option  value="1" >Matutino</option>
         							  <option  selected="true" value="2" >Vespertino</option>
         							  </ElseIf>
         							      <ElseIf condition={ this.state.form==null || this.state.tipoModal=='insertar'}>
         							   <option  value="1" > Matutino </option>
         							   <option  value="2"> Vespertino </option>
         							     </ElseIf>
         				</If>				
					}		
  						</select>
                      <br />

                      <br /><br />
                      	<label htmlFor="idmaestro">Maestro</label>
                      	<br />
					 <select  className="form-control" name="idmaestro" onChange={this.handleChange}  >				                 
                   {

						this.state.data2.map(k =>	
						 <If condition={this.state.form!=null && k.idmaestro== this.state.form.idmaestro}>
									  <Then>
         							  <option selected="true" value={k.idmaestro} >{k.nombre} {k.app}</option>
         							   </Then>
         							   <ElseIf condition={this.state.form!=null &&this.state.form.idmaestro!=k.idmaestro}>
         							  <option  value={k.idmaestro} >{k.nombre}</option>
         							   </ElseIf>
         							    <ElseIf condition={ this.state.form==null}>
         							   <option  value={k.idmaestro} >{k.nombre} </option>
         							   </ElseIf>
         								   </If>				
					
							)
		
					}		
  						</select>







                  </div>
                </ModalBody>
                <ModalFooter>
                {
                	this.state.tipoModal=='insertar'?
 					<button className="btn btn-success" onClick={()=>this.postSalon()}>
                	Insertar
					</button>:<button className="btn btn-primary" onClick={()=>this.putSalon()}>
					actualizar
					</button>
            	}
               
				<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Regresar</button>
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

 


export default MenuSalones;