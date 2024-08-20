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
      foto: "https://opem.b-cdn.net/wp-content/uploads/2022/10/foto-curriculum.jpg",
      nombre: "Vicente Millan",
      puesto: "CTO",
      fav: true,
    },
    {
      id: uuid(),
      equipo: "Administración",
      foto: "https://cdn-images.livecareer.es/pages/foto_cv_lc_es_4.jpg",
      nombre: "Matias Donantueno",
      puesto: "Gerente",
      fav: false,
    },
    {
      id: uuid(),
      equipo: "Marketing",
      foto: "https://cdn-images.livecareer.es/pages/foto_cv_lc_es_3.jpg",
      nombre: "Linda Gonzalez",
      puesto: "Analista",
      fav: false,
    },
    {
      id: uuid(),
      equipo: "E-commerce",
      foto: "https://cdn-images.resumelab.com/pages/15_foto_rles.jpg",
      nombre: "Kimberly Soto",
      puesto: "Lider del sector",
      fav: true,
    },
    {
      id: uuid(),
      equipo: "Recursos Humanos",
      foto: "https://www.molinarifoto.com.ar/wp-content/uploads/2019/09/Foto-CV-Hombre.jpg",
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
