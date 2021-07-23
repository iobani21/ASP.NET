
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import ListaMaestros from './maestros/ListaMaestros.js';
import MenuEstudiantes from './estudiantes/MenuEstudiantes.js';
import MenuSalones from './salones/MenuSalones.js';
import ListaAlumnosXSalon from './salones/ListaAlumnosXSalon.js';
import TutoresTutorados from './tutores/TutoresTutorados.js';
import EditarInformacion from './maestros/EditarInformacion.js';
import EditMaestros from './maestros/EditMaestros.js';
import { FaRegUserCircle} from 'react-icons/fa';
import './App.css'

import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route
} from 'react-router-dom'; 

function metodo() {
	localStorage.clear();
}


function Maestro () {
	 var nombre = localStorage.getItem('nombre');
	return (
		<Router>
			<div className="container">
			  <nav>
        <h3><nav>
        <ul>
            <li><FaRegUserCircle /> {nombre}<ul>
                <li><Link to={'/EditarInformacion'} className="nav-link">Mis Datos</Link></li>    
                <li><a className="nav-link" onClick={metodo} href="javascript:location.reload()">Cerrar Sesion</a></li>
                       
            </ul></li>
           
        </ul>
		</nav></h3>
        <ul>
               <li> <Link to={'/ListaAlumnosXSalon'} className="nav-link">Listas de Salones</Link> </li>
           
          
              <li><Link to={'/TutoresTutorados'} className="nav-link">Tutores</Link></li>
        </ul>

    </nav>
				<br />
				<Switch>
			
					<Route path='/MenuSalones' component={MenuSalones} /> 
					<Route path='/ListaMaestros' component={ListaMaestros} /> 
					<Route path='/MenuEstudiantes' component={MenuEstudiantes} /> 
					<Route path='/TutoresTutorados' component={TutoresTutorados} /> 
					<Route path='/ListaAlumnosXSalon' component={ListaAlumnosXSalon} /> 
					<Route path='/EditMaestros' component={EditMaestros} /> 
					<Route path='/EditarInformacion' component={EditarInformacion} /> 
				</Switch>	
			</div>

 
		</Router>
		
	);
}

export default Maestro;
