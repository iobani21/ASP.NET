

import ListaMaestros from './maestros/ListaMaestros.js';
import MenuEstudiantes from './estudiantes/MenuEstudiantes.js';
import MenuSalones from './salones/MenuSalones.js';
import ListaAlumnosXSalon from './salones/ListaAlumnosXSalon.js';
import EditarInformacion from './maestros/EditarInformacion.js';
import MenuTutores from './tutores/MenuTutores.js';
import './App.css'
import { FaRegUserCircle} from 'react-icons/fa';
import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route
} from 'react-router-dom'; 

function metodo() {
	localStorage.clear();
}



function Secretaria () {
	 var nombre = localStorage.getItem('nombre');
	return (
		<Router>
			<div className="container">
			  <nav>
        <h3><nav>
        <ul>
            <li><FaRegUserCircle /> {nombre}<ul>
                <li><Link to={'/EditarInformacion'} className="nav-link">Mis Datos</Link></li>  
                <li><a   className="nav-link" onClick={metodo} href="javascript:location.reload()">Cerrar Sesion</a></li>
                                
            </ul></li>
           
        </ul>
</nav></h3>
        <ul>
            <li><Link to={'/ListaMaestros'}  className="nav-link">Maestros</Link></li>
            <li><Link to={'/MenuEstudiantes'} className="nav-link">Estudiantes</Link></li>
            <li><Link to={'/MenuSalones'} className="nav-link">Salones</Link>
                <ul>
                    <li> <Link to={'/ListaAlumnosXSalon'} className="nav-link">Listas de Salones</Link> </li>
                 
                </ul>
            </li>
              <li><Link to={'/MenuTutores'} className="nav-link">Tutores</Link></li>
          
        </ul>
    </nav>
				<br />
				<Switch>
					<Route path='/MenuSalones' component={MenuSalones} /> 
					<Route path='/ListaMaestros' component={ListaMaestros} /> 
					<Route path='/MenuEstudiantes' component={MenuEstudiantes} /> 
					<Route path='/MenuTutores' component={MenuTutores} /> 
					<Route path='/ListaAlumnosXSalon' component={ListaAlumnosXSalon} /> 
					<Route path='/EditarInformacion' component={EditarInformacion} /> 
				</Switch>	
			</div>

 
		</Router>
		
	);
}

export default Secretaria;
