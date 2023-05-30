import "bootstrap/dist/css/bootstrap.css";
import "../Scss/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAnchor, faHome, faTachometerAlt, faFileUpload, faPhotoVideo, faBuildingColumns, faUsers, faMoneyCheckAlt, faCogs, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React, { useEffect, useState } from 'react';
import { mobileScreen } from '../api/navbar'; // Importa mobileScreen desde el archivo navbar.js
import axios, { all } from 'axios';
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useLocation  } from 'react-router-dom';
import { api } from "../api/register_api";

export function NavbarAdmin() {
  const storedCel = sessionStorage.getItem('nombre');
  const [isMobileScreen, setIsMobileScreen] = useState(mobileScreen.matches);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(mobileScreen.matches);
    };

    mobileScreen.addEventListener('change', checkScreenSize);

    return () => {
      mobileScreen.removeEventListener('change', checkScreenSize);
    };
  }, []);

  const toggleNavDropdown = (event) => {
    const dropdown = event.currentTarget.closest('.dashboard-nav-dropdown');
    dropdown.classList.toggle('show');

    const siblingDropdowns = dropdown.parentNode.querySelectorAll('.dashboard-nav-dropdown.show');
    siblingDropdowns.forEach((siblingDropdown) => {
      if (siblingDropdown !== dropdown) {
        siblingDropdown.classList.remove('show');
      }
    });
  };

  const toggleMenu = () => {
    if (isMobileScreen) {
      const dashboardNav = document.querySelector('.dashboard-nav');
      dashboardNav.classList.toggle('mobile-show');
    } else {
      const dashboard = document.querySelector('.dashboard');
      dashboard.classList.toggle('dashboard-compact');
    }
  };

  const handleLogout = () => {
    const cedulaUser = sessionStorage.getItem("cedula");
    console.log(cedulaUser)

    axios
      api.post("/logout/", { cedula: cedulaUser })
      .then((response) => {
        console.log("Logout exitoso");
        sessionStorage.removeItem("cedula");
        sessionStorage.removeItem(all)
        navigate('/login')
      })
      .catch((error) => {
        console.error("Error al realizar el logout", error);
      });
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redireccionar = () => {
    navigate('/registro'); // Redireccionar a la página de registro
  };

  const redireccionarInicio = () => {
    navigate('/inicio'); // Redireccionar a la página de registro
  };

  useEffect(() => {
    // Verificar si la ubicación actual es la página de registro
    if (location.pathname === '/registro') {
      setShowAdditionalContent(true);
    } else {
      setShowAdditionalContent(false);
    }
  }, [location]);

  return (
    <div className='dashboard'>
      <div className='dashboard-nav'>
        <header>
          <a href='#!' className='menu-toggle'>
            <FontAwesomeIcon icon={faBars} />
          </a>
          <a href='#!' className='brand-logo'>
            <FontAwesomeIcon icon={faBuildingColumns} style={{ color: "#ffffff", marginRight: "16px"}} /> <span>DEXIA</span>
          </a>
        </header>
        <nav className='dashboard-nav-list'>
          <a onClick={redireccionarInicio} className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faHome} style={{ color: "#ffffff", marginRight: "16px"}} /> Inicio
          </a>
          <a href='#!' className='dashboard-nav-item active'>
            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "#ffffff", marginRight: "16px"}}  /> Informes
          </a>
          <a href='#!' className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faFileUpload} style={{ color: "#ffffff", marginRight: "16px"}}  /> Carga masiva
          </a>
          <div className='dashboard-nav-dropdown'>
            <a  onClick={redireccionar} href='#!' className='dashboard-nav-item'>
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", marginRight: "16px"}}  /> Registrar usuario
            </a>
          </div>
          <div className='dashboard-nav-dropdown'>
            <a href='#!' className='dashboard-nav-item dashboard-nav-dropdown-toggle'>
              <FontAwesomeIcon icon={faUsers} style={{ color: "#ffffff", marginRight: "16px"}} /> Usuarios
            </a>
            <div className='dashboard-nav-dropdown-menu'>
              <a href='#!' className='dashboard-nav-dropdown-item'>Todos</a>
              <a href='#!' className='dashboard-nav-dropdown-item'>Estudiantes</a>
              <a href='#!' className='dashboard-nav-dropdown-item'>Consejeros</a>
            </div>
          </div>
          <a href='#!' className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faCogs} style={{ color: "#ffffff", marginRight: "16px"}}  /> Perfil
          </a>
          <div className='nav-item-divider'></div>
          <a  onClick={handleModalOpen} className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#ffffff", marginRight: "16px"}} /> Salir
          </a>
        </nav>
      </div>


      
     {/*    <div className='dashboard-app'>
          <header className='dashboard-toolbar'>
            <a href='#!' className='menu-toggle'>
              <FontAwesomeIcon icon={faBars} />
            </a>
          </header>
          <div className='dashboard-content'>
            <div className='container'>
              <div className='card'>
                <div className='card-header'>
                  <h1>Bienvenid@ {storedCel}</h1>
                </div>
                <div className='card-body'>
                  <p>Estás dentro del sistema como: Administrador</p>
                </div>
              </div>
            </div>
          </div>
  </div> */}
    
              <Modal show={showModal} onHide={handleModalClose} centered backdrop="static">
  <Modal.Header>
    <Modal.Title>Salir de la sesión</Modal.Title>
    <Button variant="danger" onClick={handleModalClose}>
      <span aria-hidden="true">&times;</span>
    </Button>
  </Modal.Header>
  <Modal.Body>¿Deseas finalizar la sesión?</Modal.Body>
  <Modal.Footer>
    <Button type="submit" variant="danger" onClick={() => { handleModalClose(); handleLogout(); }}>
      Salir
    </Button>
  </Modal.Footer>
</Modal>

            </div>
          
  );
}
