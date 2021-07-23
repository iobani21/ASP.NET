

import ListaMaestros from './maestros/ListaMaestros.js';
import MenuEstudiantes from './estudiantes/MenuEstudiantes.js';
import MenuSalones from './salones/MenuSalones.js';
import ListaAlumnosXSalon from './salones/ListaAlumnosXSalon.js';
import MenuTutores from './tutores/MenuTutores.js';
import Login from './login/login.js';

import Maestro from './Maestro.js';
import Director from './Director.js';
import Secretaria from './Secretaria.js';
import './App.css'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route
} from 'react-router-dom'; 



function App () {
 var Correo = localStorage.getItem('Correo');
 var Clave = localStorage.getItem('Clave');
 var menu = localStorage.getItem('menu');

 console.log(" el correo es :"+ Correo);
 console.log(" el clave es :"+ Clave);
  console.log(" el clave es :"+ menu);

	return (
		
	<Router>
			<div className="container">
			 <If condition={ Correo===null  && Clave ===null }>
			<Then>
			<Login />
			</Then>
			<ElseIf condition={ Correo!=null && menu==1  && Clave!=null}>
         			<Director />				 
         </ElseIf>
         <ElseIf condition={ Correo!=null && menu==2  && Clave!=null}>
         			<Secretaria />				 
         </ElseIf>
         <ElseIf condition={ Correo!=null && menu==3  && Clave!=null}>
         			<Maestro />				 
         </ElseIf>
		</If>


			<Switch>
					<Route path='/Maestro' component={Maestro} /> 
					<Route path='/Director' component={Director} /> 
					<Route path='/Secretaria' component={Secretaria} /> 
				</Switch>
			
				
			</div>

 	
		</Router>
	
	
			
	);
}

export default App;
