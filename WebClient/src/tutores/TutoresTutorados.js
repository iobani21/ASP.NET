import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const url="http://localhost:64800/api/ControladorTutor/";
class TutoresTutorados extends React.Component {

state={
	data3:[],
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

getTutorados=(i)=>{
	
	axios.get(url+i.idtutor).
	then(response=>{
		console.log(response.data);
		this.setState({data3:response.data});
	
	}).catch(error=>{
		console.log(error.message);
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
		this.getMaestros();
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
										<td><button type="button" className="btn btn-primary" onClick={()=>{this.getTutorados(i) ;this.modalInsertar()}}>Mostrar Tutorados</button></td>
									
									</tr>

									   </Then>
         							  
         								   </If>
							)
						}
							
				    </tbody>
				</table>
				 <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                 <table className="table table stripped">
			
					<thead className="listHeader">
						<tr>
							<th>Alumno</th>
							<th>Nivel</th>
							<th>Salon</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.data3.map(i => 

						
         							  <tr>
									
										<td>{i.nombre} {i.app} {i.apm}</td>
										<td>{i.nivel} </td>
										<td>{i.salon} </td>
									
										</tr>
         							
         							

									
							)

						}
				    </tbody>
				</table>
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

 


export default TutoresTutorados;