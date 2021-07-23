import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import {FaUsers} from 'react-icons/fa';

import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const url="http://localhost:64800/api/ControladorSalon/";
const url2="http://localhost:64800/api/ControladorMaestro/";
const url3="http://localhost:64800/api/ControladorAlumno/";
class ListaAlumnosXSalon extends React.Component {

state={
	data:[],
	data2:[],
	data3:[],
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
	
	}).catch(error=>{
		console.log(error.message);
	})
}

deleteMaestro=()=>{
	
	axios.delete(url+this.state.form.idsalon).then(response=>{
		this.setState({modalEliminar: false});
		this.getSalones();
	})
}

QuitarAlumno=(i)=>{
		
	axios.get(url3+i.idalumno).then(response=>{
		this.setState({modalEliminar: false});
		this.getSalones();
	})
}

getAlumnosXSalon=(i)=>{

	axios.get(url+i.idsalon).
	then(response=>{
		this.setState({data3:response.data});

	}).catch(error=>{
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
		var idmaestro = localStorage.getItem('idmaestro');
		var menu = localStorage.getItem('menu');
		const {form}=this.state;
			return (
				<div className="App">
					
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
								<If condition={ idmaestro==i.idmaestro || menu=="1" || menu=="2"}>
								<Then>	
								 <If condition={ i.idsalon!="0"}>
									  <Then>
         							  <tr>
										<td>{i.nommaestro} {i.appmaestro}</td>
										
										<td>{i.horario}</td>
										<td>{i.salon}</td>
										<td><button type="button" className="btn btn-primary" onClick={()=>{this.getAlumnosXSalon(i) ;this.modalInsertar()}}>Abrir Lista</button></td>
									
										</tr>
         							   
										</Then>
         							  	</If>
         							   </Then>

         								   </If>	

									
							)

						}
				    </tbody>
				</table>
				 <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                <h1><FaUsers />  </h1>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
            <table className="table table stripped">
			
					<thead className="listHeader">
						<tr>
							<th>Alumno</th>
				
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.data3.map(i => 

								 <If condition={ i.idsalon!="0"}>
									  <Then>
         							  <tr>
										<td>{i.nombre} {i.app} {i.apm}</td>
								
										<td><button type="button" className="btn btn-danger" onClick={()=>{this.QuitarAlumno(i) ;this.modalInsertar()}}>Sacar de Salon </button></td>
									
										</tr>
         							   </Then>
         							  
         								   </If>	

									
							)

						}
				    </tbody>
				</table>
                </ModalBody>
                <ModalFooter>
                {
                
            	}
               
				<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Regresar</button>
				</ModalFooter>
				</Modal>


				</div>				
			);
		} 
		
	} 

 


export default ListaAlumnosXSalon;