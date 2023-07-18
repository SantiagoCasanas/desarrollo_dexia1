import React, { useState, useEffect } from 'react';
import { api } from '../../api/register_api';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function Sesiones_list() {
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [sesiones, setSesiones] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchSesiones();
  }, [selectedDate, initialLoad]);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const fetchSesiones = async () => {
    try {

      const formattedDate = selectedDate.toISOString().split('T')[0]; // Formatear la fecha como YYYY-MM-DD
      if (initialLoad) {
        const response = await api.get('sesiones/listar_sesiones/');
        setSesiones(response.data);

      } else {
        const response = await api.get(`sesiones/listar_sesiones/?fecha=${formattedDate}`);
        console.log(selectedDate)
        setSesiones(response.data);
      }

    } catch (error) {
      console.error('Error al obtener las sesiones:', error);
    }
  };


  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '500px',
          marginTop: '50px',
        }}
      >
        
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="YYY-MM-dd"
          className="form-control"
          style={{
            display:'block',
            width: '200px',
            marginBottom: '15px',
          }}

        />
      </div>

      <section className="intro" style={{ marginLeft: '300px', marginTop: '70px' }}>
        <div className="bg-image h-100" style={{ backgroundColor: 'white' }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div
                        className="table-responsive table-scroll"
                        data-mdb-perfect-scrollbar="true"
                        style={{
                          position: 'relative',
                          height: '400px',
                          weight: '700px',
                        }}
                      >
                        <table className="table table-striped mb-0">
                          <thead style={{ backgroundColor: '#D02424' }}>
                            <tr>
                            <th scope="col">Estudiante</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Hora</th>
                              <th scope="col">Tipo de sesión</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sesiones.map((sesion) => (
                              <tr key={sesion.id}>
                                <td>{sesion.estudiante}</td>
                                <td>{new Date(sesion.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                <td>{new Date(sesion.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</td>
                            
                                <td>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    style={{ width: '85px', fontSize: '20px' }}
                                    onClick={() => {
                                      handleModalOpen();
                                    }}
                                  >
                                    Aplicar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Modal crear sesion */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Crear sesión</Modal.Title>
          <Button variant="danger" onClick={handleModalClose}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form>

            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Riesgo individual:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>

            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="motivo_consulta">Riesgo individual:</label>
              <input
                type="text"
                id="motivo_consulta"
                name="motivo_consulta"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>


            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Riesgo familiar:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>


            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Riesgo academico:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>


            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Riesgo economico:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>


            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Riesgo universitario:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>

            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Riesgo psicólogico:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>


            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Estimación media:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>


            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="estimacion_media">Motivo consulta:</label>
              <input
                type="text"
                id="estimacion_media"
                name="estimacion_media"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>

            {/* Agrega los demás campos de entrada aquí */}

            <div
              style={{
                background: "mistyrose",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="fecha_proxima_sesion">
                Fecha Próxima Sesión:
              </label>
              <input
                type="text"
                id="fecha_proxima_sesion"
                name="fecha_proxima_sesion"
                style={{ background: "lightcoral", border: "none" }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="danger"
            onClick={() => {
              handleModalClose();
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
