import React from "react";
import "./styles/flashReply.css";
import { listaCienciaQuiz } from "./components/CienciaQuiz";
import { listaDeporteQuiz } from "./components/DeporteQuiz";
import { listaEntretenimientoQuiz } from "./components/EntreteniQuiz";
import { listaRandomQuiz } from "./components/RandomQuiz";
import { useState } from "react";

export default function FlashReply() {

  // Sirve como referencia, conoce cuantas preguntas hiciste
  const [preguntaActual, setPreguntaActual] = React.useState(0);
  // Se usa para el puntaje, determina cuantas preguntas correctas hiciste
  const [puntaje, setPuntaje] = React.useState(0);
  // Variable booleana usada para mostrar cuantas respuestas correctas tuviste
  const [mostrarPuntos, setMostrarPuntos] = React.useState(false);
  // Contiene 1 de las 4 listas de preguntas, primero contiene ciencias
  const [generoQuiz, setGeneroQuiz] = useState(listaCienciaQuiz);
  // Indica que genero de pregunta estas haciendo
  const [genero, setGenero] = useState("");
  /* Determina si el boton de obtener pregunta es presionado 
  y te impide presionarlo nuevamente si es que no respondiste la pregunta */
  const [pushButton, setPushButton] = useState(true);
  // Numero aleatorio que sirve como indice usado para asignar una lista de preguntas
  const [randomQuiz, setRandomQUiz] = useState(0);

  // Realiza acciones luego de responder una pregunta
  const opcionElegida = (isCorrect) => {

    if (isCorrect) {
      setPuntaje(puntaje + 1); // aumenta el puntaje
    }

    // cuenta las preguntas que hiciste
    const siguienteQuiz = preguntaActual + 1;
    console.log("Siguiente Pregunta :)");

    setPushButton(true); // habilita el boton para lanzar otra pregunta

    /* Pregunta si se completaron 10 preguntas, se no se asi se pasa a 
    la siguiente pregunta, se ser asi te indica el puntaje */
    if (siguienteQuiz < 10) {
      setPreguntaActual(siguienteQuiz);
    } else {
      setMostrarPuntos(true);
    }

  };

  // Te otorga un numero al azar, este es igual a un indice de tematica de pregunta
  const generoAzar = () => {

    var x = Math.ceil(Math.random() * 4); // Elige un numero CON EL 1 COMO MINIMO y MAXIMO 4
    console.log(x);

    setRandomQUiz(Math.floor(Math.random() * 10)); // Elige una pregunta aleatoria de la lista asiganada
    console.log(randomQuiz);
    console.log("la pregunta de indice " + randomQuiz);

    // Asigna el genero segun el indice otorgado por la variable x
    if (x === 1) {
      setGeneroQuiz(listaCienciaQuiz);
      setGenero("CIENCIA");
      console.log("preguntas de ciencia");
    }

    if (x === 2) {
      setGeneroQuiz(listaDeporteQuiz);
      setGenero("DEPORTE");
      console.log("preguntas de Ciencia");
    }

    if (x === 3) {
      setGeneroQuiz(listaEntretenimientoQuiz);
      setGenero("ENTRETENIMIENTO");
      console.log("preguntas de entretenimiento");
    }

    if (x === 4) {
      setGeneroQuiz(listaRandomQuiz);
      setGenero("SUPER RANDOM");
      console.log("preguntas totalmente Random");
    }

    setPushButton(false);

  }

  return (
    <>
      <div className="genero-conteiner">
        <h2 className="genero">Genero: </h2>{genero}
      </div>
      <div className="app-conteiner">
        <button className="buttonGame" disabled={pushButton === false} onClick={() => generoAzar()}> Lanzar pregunta </button>
        {mostrarPuntos ? (<section className="showScore-section"> Tú respondiste {puntaje} de {10/**generoQuiz.length*/} preguntas </section>) :
          (<div className="app">
            {pushButton ? (<h3 className="h3-bienvenida">Habras respondido Bien??? Elige el genero de la siguiente pregunta </h3>) :
              (<>
                <section className="question-section">
                  <h2 className="pregunta"> Pregunta {preguntaActual + 1} de {10/*generoQuiz.length*/} </h2>
                  <p className="opciones"> {generoQuiz[randomQuiz/*preguntaActual*/].textoPregunta} </p>
                </section>

                <section className="answer-section">
                  {generoQuiz[randomQuiz/*preguntaActual*/].opcionesRespuesta.map((item) => (
                    <button className="buttonGame" disabled={pushButton === true} onClick={() => opcionElegida(item.isCorrect)}> -O- {item.textoOpcion} </button>))}
                </section>
              </>)
            }
          </div>)
        }
      </div>
    </>
  );
}
