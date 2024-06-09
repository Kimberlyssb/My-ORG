import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./componentes/header/header";
import Formulario from "./componentes/formulario/formulario";
import MiOrg from "./componentes/miORG";
import Equipo from "./componentes/equipo";
import Footer from "./componentes/footer";
import "./App.css"

function App() {
  const [mostrarFormulario, setMostrar] = useState(false);
  const [colaboradores, setColaboradores] = useState([
    {
      id: uuid(),
      equipo: "IT",
      foto: "https://media.licdn.com/dms/image/C4D03AQEzVq-D3hYj9g/profile-displayphoto-shrink_800_800/0/1658874663558?e=1723075200&v=beta&t=U_0-Z2TpDvXRljtD8Hy5dlmU9JM6kCUd-OT6knnrrhI",
      nombre: "Vicente Millan",
      puesto: "CTO",
      fav: true,
    },
    {
      id: uuid(),
      equipo: "Administración",
      foto: "https://media.licdn.com/dms/image/D4E35AQH37RSvnOGQRw/profile-framedphoto-shrink_800_800/0/1716591186541?e=1718492400&v=beta&t=bb7IHUc_feppkqc0-IDt6mvxjdAwL7uWr8Ge3U_sY5A",
      nombre: "Matias Donantueno",
      puesto: "Gerente",
      fav: false,
    },
    {
      id: uuid(),
      equipo: "Marketing",
      foto: "https://media.licdn.com/dms/image/D4D03AQFtZCh0gct0og/profile-displayphoto-shrink_800_800/0/1714415938299?e=1723075200&v=beta&t=giJb3r_EC8V3zqKnBshrznT6DSOzExFU8pCf-igiaKI",
      nombre: "Linda Gonzalez",
      puesto: "Analista",
      fav: false,
    },
    {
      id: uuid(),
      equipo: "E-commerce",
      foto: "https://media.licdn.com/dms/image/D4D03AQGW5yPBa4K7mQ/profile-displayphoto-shrink_800_800/0/1711125149274?e=1723075200&v=beta&t=WHWuhh7fRDmZnFBHWrj4c-n8jVPaSih7XCwYRFDGDjU",
      nombre: "Kimberly Soto",
      puesto: "Lider del sector",
      fav: true,
    },
    {
      id: uuid(),
      equipo: "Recursos Humanos",
      foto: "https://media.licdn.com/dms/image/D4E03AQHfnPvtBGu9Xg/profile-displayphoto-shrink_800_800/0/1703610686164?e=1723075200&v=beta&t=jJKuttASKa0FHy0APPdNZS3d-Py58KPXjy7D9fTHiHM",
      nombre: "Jaiberd Rengel",
      puesto: "Director",
      fav: false,
    },
  ]);

  const [equipos, setEquipos] = useState([
    {
      id: uuid(),
      titulo: "IT",
      colorPrimario: "#254341",
    },
    {
      id: uuid(),
      titulo: "Administración",
      colorPrimario: "#af8168",
    },
    {
      id: uuid(),
      titulo: "Marketing",
      colorPrimario: "#cba92a",
    },
    {
      id: uuid(),
      titulo: "E-commerce",
      colorPrimario: "#315c62",
    },
    {
      id: uuid(),
      titulo: "Operarios de Depposito",
      colorPrimario: "#759194",
    },
    {
      id: uuid(),
      titulo: "Comex",
      colorPrimario: "#c76439",
    },
    {
      id: uuid(),
      titulo: "Recursos Humanos",
      colorPrimario: "#bcba90",
    },
  ]);

  const cambiarMostrar = () => {
    setMostrar(!mostrarFormulario);
  };

  //Registrar colaborador
  const RegistrarColaborador = (colaborador) => {
    //Spread operator
    setColaboradores([...colaboradores, { ...colaborador, id: uuid() }]);
  };

  //Eliminar colaborador
  const eliminarColaborador = (id) => {
    const nuevosColaboradores = colaboradores.filter(
      (colaborador) => colaborador.id !== id
    );
    setColaboradores(nuevosColaboradores);
  };

  //set color de equipo
  const setColor = (color, id) => {
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        equipo.colorPrimario = color;
      }

      return equipo;
    });

    setEquipos(equiposActualizados);
  };

  //Crear equipo
  const crearEquipo = (nuevoEquipo) => {
    setEquipos([...equipos, { ...nuevoEquipo, id: uuid() }]);
  };

  //Eliminar equipo
  const eliminarEquipo = (id) => {
    const nuevoEquipo = equipos.filter((equipos) => equipos.id !== id);
    setEquipos(nuevoEquipo);
  };

  //like
  const like = (id) => {
    const colaboradoresActualizados = colaboradores.map((colaborador) => {
      if (colaborador.id === id) {
        colaborador.fav = !colaborador.fav;
      }
      return colaborador;
    });

    setColaboradores(colaboradoresActualizados);
  };

  return (
    <div className="app">
      <Header />
      {/*mostrarFormulario === true ?  <Formulario /> : <></> */}
      {mostrarFormulario && (
        <Formulario
          equipos={equipos.map((equipo) => equipo.titulo)}
          registrarColaborador={RegistrarColaborador}
          crearEquipo={crearEquipo}
          todosLosEquipos={equipos}
          eliminarEquipo={eliminarEquipo}
        />
      )}

      <MiOrg cambiarMostrar={cambiarMostrar} />

      {equipos.map((equipo) => (
        <Equipo
          datos={equipo}
          key={equipo.titulo}
          colaboradores={colaboradores.filter(
            (colaborador) => colaborador.equipo === equipo.titulo
          )}
          eliminarColaborador={eliminarColaborador}
          setColor={setColor}
          like={like}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
