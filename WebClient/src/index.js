import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Director from './Director';
import Maestro from './Maestro';
import Secretaria from './Secretaria';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);