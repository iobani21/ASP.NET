import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

import {FaUserCog} from 'react-icons/fa';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const url="http://localhost:64800/api/ControladorAlumno/";
const url2="http://localhost:64800/api/ControladorTutor/";
const url3="http://localhost:64800/api/ControladorSalon/";
class MenuEstudiantes extends React.Component {

state={
	data:[], //Alumnos
	data2:[],//Tutores
	data3:[],//Salones
	modalInsertar:false,
	modalEliminar:false,
	form:{
		idalumno:'',
		nombre:'',
		app:'',
		apm:'',
		idgenero:'',
		curp:'',
		peso:'',
		estatura:'',
		direccion:'',
		idtutor:'',
		estatura:'',
		idtiposangre:'',
		idnivel:'',
		idsalon:'',
		fechanacimiento:''	
	},


}



selecionarAlumno=(i)=>{
	
	this.setState({
		tipoModal:'actualizar',
		form:{
			

			idalumno:i.idalumno,
			nombre: i.nombre,
			app: i.app,
			apm: i.apm,
			curp: i.curp,
			peso: i.peso,
			estatura: i.estatura,
			idtutor:i.idtutor,
			idsalon:i.idsalon,
			idtiposangre: i.idtiposangre,			
			idgenero:i.idgenero,
			idnivel: i.idnivel,
			salon: i.idsalon,
			fechanacimiento: i.fechanacimiento,	
			direccion :i.direccion		
		}
	})
}

putAlumno=()=>{
		//console.log(this.state.modalInsertar);
		//console.log(this.state.form);
	let string = this.state.form.idsalon;
    let a = parseInt(string);
    let string2 = this.state.form.idtutor;
    let b = parseInt(string2);
    let string3 = this.state.form.idtiposangre;
    let c = parseInt(string3);
    let string4 = this.state.form.idnivel;
    let e = parseInt(string4);
    let string5 = this.state.form.idgenero;
    let f = parseInt(string5);
    let string6 = this.state.form.peso;
    let g = parseFloat(string6);
    let string7 = this.state.form.estatura;
    let h = parseFloat(string7);

this.state = {
   form:{ 
   	idalumno:this.state.form.idalumno,
   	nombre:this.state.form.nombre,
   	app:this.state.form.app,
   	apm:this.state.form.apm,
   	curp:this.state.form.curp,
   	peso:g,
   	estatura:h,
   	idtutor:b,
   	idsalon:a,
   	idtiposangre:c,
   	idgenero:f,
   	idnivel:e,
   	fechanacimiento:this.state.form.fechanacimiento,
   	direccion:this.state.form.direccion





   },
  modalInsertar:true
}

	axios.put(url+this.state.form.idalumno,this.state.form).then(response=>{
		this.modalInsertar();
		this.getAlumnos();
      alert("Alumno Modificado!");
	}).catch(error=>{
    alert("Error al Modificar Alumno*");
    console.log(error.message);
  })
//		console.log(this.state.modalInsertar);
}

postAlumno=async()=>{
//	console.log(this.state.modalInsertar);
  	

	await axios.post(url,this.state.form).then(responde=>{

		this.modalInsertar();
		this.getAlumnos();
	alert("Alumno dado de Alta!");
	}).catch(error=>{
    alert("Error al dar de alta *Verifique los campos*");
		console.log(error.message);
	})
//		console.log(this.state.modalInsertar);
}

deleteAlumno=()=>{
	axios.delete(url+this.state.form.idalumno).then(response=>{
		this.setState({modalEliminar: false});
		this.getAlumnos();
    alert("Alumno Eliminado");
	}).catch(error=>{
    alert("Error al Eliminar  Alumno*");
    console.log(error.message);
  })
}

getAlumnos=()=>{
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

		axios.get(url3).
	then(response=>{
		this.setState({data3:response.data});
			//console.log(this.state.data3);
	}).catch(error=>{
		console.log(error.message);
	})
}
	componentDidMount () {
	this.getAlumnos();
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
							<th>App</th>
							<th>Apm</th>
							<th>Genero</th>
							<th>T-Sangre</th>
							<th>Nivel</th>
							<th>Salon</th>
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{

							this.state.data.map(i => 
									<tr>
										<td>{i.nombre}</td>
										<td>{i.app}</td>
										<td>{i.apm}</td>
										<td>{i.genero}</td>
										<td>{i.sangre}</td>
										<td>{i.nivel}</td>
										<td>{i.salon}</td>

										<td><button type="button" className="btn btn-primary" onClick={()=>{this.selecionarAlumno(i) ;this.modalInsertar()}}>Ver Informacion</button></td>
										<td><button type="button" onClick={()=>{this.selecionarAlumno(i); this.setState({modalEliminar:true})}} className="btn btn-danger">Eliminar</button></td>
									</tr>
							)

						}
						<button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}> Registrar Alumno</button>
				    </tbody>

				</table>
				 <Modal isOpen={this.state.modalInsertar}>

                <ModalHeader style={{display: 'block'}}>
                <h1><FaUserCog /> </h1>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>


                <ModalBody>

                  <div className="form-group">
                  	 

                     <input className="form-control" type="hidden" name="idalumno" id="idalumno" onChange={this.handleChange} value={form?form.idalumno:''}/>
                    <br />
                     <label htmlFor="nombre">nombre </label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre:''}/>
                    <br />
                    <label htmlFor="app">Apellido Pat</label>
                    <input className="form-control" type="text" name="app" id="app" onChange={this.handleChange} value={form?form.app:''}/>
                    <br />
                     <label htmlFor="apm">Apellido</label>
                    <input className="form-control" type="text" name="apm" id="apm" onChange={this.handleChange} value={form?form.apm:''}/>
                    <br />

                      <label htmlFor="curp">CURP</label>
                    <input className="form-control" type="text" name="curp" id="curp" onChange={this.handleChange} value={form?form.curp:''}/>
                    <br />
                      <label htmlFor="peso">peso</label>
                    <input className="form-control" type="text" name="peso" id="peso" onChange={this.handleChange} value={form?form.peso:''}/>
                    <br />
                     <label htmlFor="estatura">estatura</label>
                    <input className="form-control" type="text" name="estatura" id="estatura" onChange={this.handleChange} value={form?form.estatura:''}/>
                    <br />

                      	<label htmlFor="idtutor">Tutor</label>
                      	<br />
                       <select   className="form-control" name="idtutor" onChange={this.handleChange} requiered  >
					                 
                   {
						this.state.data2.map(j =>


						 <If condition={ this.state.form!=null && j.idtutor== this.state.form.idtutor}>
									  <Then>
         							  <option selected="true" value={j.idtutor} >{j.nombre} {j.app}</option>
         							   </Then>
         							   <ElseIf condition={this.state.form!=null && this.state.form.idtutor!=j.idtutor}>
         							  <option  value={j.idtutor} >{j.nombre} {j.app}</option>
         							   </ElseIf>
         							   <ElseIf condition={ this.state.form==null || this.state.form.idtutor==''}>
         							   <option  selected="true"  onChange={this.handleChange}  value={j.idtutor} >{j.nombre} {j.app}</option>
         							   </ElseIf>
         								   </If>									
							)		
					}		
  						</select>
						<br /><br />
                      	<label htmlFor="idsalon">Salon</label>
                      	<br />
					 <select  className="form-control" name="idsalon" onChange={this.handleChange}  >				                 
                   {

						this.state.data3.map(k =>	
						 <If condition={this.state.form!=null && k.idsalon== this.state.form.idsalon}>
									  <Then>
         							  <option selected="true" value={k.idsalon} >{k.salon}</option>
         							   </Then>
         							   <ElseIf condition={this.state.form!=null &&this.state.form.idsalon!=k.salon}>
         							  <option  value={k.idsalon} >{k.salon}</option>
         							   </ElseIf>
         							    <ElseIf condition={ this.state.form==null}>
                           <If condition={k.idsalon==0}>
                           <Then>
         							   <option selected="true"   value={k.idsalon} >{k.salon} </option>
                         </Then>
                         <ElseIf>
                                 <option   value={k.idsalon} >{k.salon} </option>
                         </ElseIf>
                         </If>

         							   </ElseIf>
         								   </If>				
					
							)
		
					}		
  						</select>
                    <br />
                    <br />
                        <br /><br />
                      	<label htmlFor="idgenero">Genero</label>
                      	<br />
                 	<select  className="form-control" name="idgenero" onChange={this.handleChange}  >				                 
                   {
						 <If condition={this.state.form!=null && this.state.form.idgenero=="1"}>
									  <Then>
         							  <option selected="true" value="1" >Masculino</option>
         							  <option  value="2" >Femenino</option>
         							   </Then>
         							   <ElseIf condition={this.state.form!=null && this.state.form.idgenero=="2"}>
         							   <option  value="1" >Masculino</option>
                         <option  selected="true" value="2">Femenino</option>
         							   </ElseIf>
         							    <ElseIf condition={this.state.form==null || this.state.tipoModal=='insertar'}>
         							  <option selected="true" value="0" >Sin Definir</option>
         							  <option  value="1" >Masculino</option>
         							  <option  value="2" >Femenino</option>
         							   </ElseIf>
         								   </If>				
					
							
		
					}		
					
  						</select>
                   		<br /><br />
                      	<label htmlFor="idtiposangre">Tipo Sangre</label>
                      	<br />
       					<select  className="form-control" name="idtiposangre" onChange={this.handleChange}  >				                 
                   		{
						<If condition={this.state.form!=null && this.state.form.idtiposangre=="1"}>
									  <Then>
         							  <option selected="true" value="1" >A+</option>
         							  <option  value="2" >A-</option>
         							  <option  value="3" >O+</option>
         							  <option  value="4" >O-</option>
         							  </Then>
         							  <ElseIf condition={this.state.form!=null && this.state.form.idtiposangre=="2"}>
         							  <option  value="1" >A+</option>
         							  <option selected="true" value="2" >A-</option>
         							  <option  value="3" >O+</option>
         							  <option  value="4" >O-</option>
         							  </ElseIf>
         							  <ElseIf condition={ this.state.form!=null && this.state.form.idtiposangre=="3"}>
         							  <option  value="1" >A+</option>
         							  <option  value="2" >A-</option>
         							  <option selected="true" value="3" >O+</option>
         							  <option  value="4" >O-</option>
         							  </ElseIf>
         							  <ElseIf condition={this.state.form!=null && this.state.form.idtiposangre=="4"}>
         							  <option  value="1" >A+</option>
         							  <option  value="2" >A-</option>
         							  <option  value="3" >O+</option>
         							  <option selected="true" value="4" >O-</option>
         							  </ElseIf>
         							  <ElseIf condition={ this.state.form==null || this.state.tipoModal=='insertar'}>
         							  <option selected="true"   value="0" >Sin Definir</option>
         							  <option  value="1" >A+</option>
         							  <option  value="2" >A-</option>
         							  <option  value="3" >O+</option>
         							  <option  value="4" >O-</option>
         							  </ElseIf>

         				</If>				
					}		
  						</select>
                      	<br /><br />
                      	<label htmlFor="idnivel">Nivel</label>
                      	<br />
       					<select  className="form-control" name="idnivel" onChange={this.handleChange} >				                 
                   		{
						<If condition={this.state.form!=null && this.state.form.idnivel=="1"}>
									  <Then>
         							  <option selected="true" value="1" >1°</option>
         							  <option  value="2" >2°</option>
         							  <option  value="3" >3°</option>
         							  <option  value="4" >4°</option>
         							  <option  value="5" >5°</option>
         							  <option  value="6" >6°</option>
         							  </Then>
         							  <ElseIf  condition={this.state.form!=null && this.state.form.idnivel=="2"}>
         							  <option  value="1" >1°</option>
         							  <option  selected="true" value="2" >2°</option>
         							  <option  value="3" >3°</option>
         							  <option  value="4" >4°</option>
         							  <option  value="5" >5°</option>
         							  <option  value="6" >6°</option>
         							  </ElseIf>
         							 <ElseIf  condition={this.state.form!=null && this.state.form.idnivel=="3"}>
         							  <option  value="1" >1°</option>
         							  <option  value="2" >2°</option>
         							  <option  selected="true" value="3" >3°</option>
         							  <option  value="4" >4°</option>
         							  <option  value="5" >5°</option>
         							  <option  value="6" >6°</option>
         							  </ElseIf>
         							  <ElseIf  condition={this.state.form!=null && this.state.form.idnivel=="4"}>
         							  <option  value="1" >1°</option>
         							  <option  value="2" >2°</option>
         							  <option  value="3" >3°</option>
         							  <option selected="true" value="4" >4°</option>
         							  <option  value="5" >5°</option>
         							  <option  value="6" >6°</option>
         							  </ElseIf>
         							  <ElseIf  condition={this.state.form!=null && this.state.form.idnivel=="5"}>
         							  <option  value="1" >1°</option>
         							  <option  value="2" >2°</option>
         							  <option  value="3" >3°</option>
         							  <option  value="4" >4°</option>
         							  <option  selected="true" value="5" >5°</option>
         							  <option  value="6" >6°</option>
         							  </ElseIf>
         							  <ElseIf  condition={this.state.form!=null && this.state.form.idnivel=="6"}>
         							  <option  value="1" >1°</option>
         							  <option  value="2" >2°</option>
         							  <option  value="3" >3°</option>
         							  <option  value="4" >4°</option>
         							  <option  value="5" >5°</option>
         							  <option  selected="true" value="6" >6°</option>
         							  </ElseIf>
         							  <ElseIf  condition={ this.state.form==null  || this.state.tipoModal=='insertar'  }>
         							  <option  value="0" >Sin Especificar</option>
         							  <option  value="1" >1°</option>
         							  <option  value="2" >2°</option>
         							  <option  value="3" >3°</option>
         							  <option  value="4" >4°</option>
         							  <option  value="5" >5°</option>
         							  <option  value="6" >6°</option>
         							  </ElseIf>

         				</If>				
					}		
  						</select>
                      <br />
           



                     <label htmlFor="fechanacimiento">fechanacimiento</label>
                    <input className="form-control" type="date" name="fechanacimiento" id="fechanacimiento" onChange={this.handleChange} value={form?form.fechanacimiento:''} />
                    <br />

                       <label htmlFor="direccion">Direccion</label>
                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form?form.direccion:''} />
                    <br />


    			</div>

                </ModalBody>


                <ModalFooter>
                {
                	this.state.tipoModal=='insertar'?
 					<button className="btn btn-success" onClick={()=>this.postAlumno()}>
                	Insertar
					</button>:<button className="btn btn-primary" onClick={()=>this.putAlumno()}>
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
					<button className="btn btn-danger" onClick={()=>this.deleteAlumno()} >Si</button>
					<button className="btn btn-secundary"  onClick={()=>this.setState({modalEliminar:false})} >No</button>
					</ModalFooter>
					</Modal>
				</div>				
			);
		} 
		
	} 

 


export default MenuEstudiantes;