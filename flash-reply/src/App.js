import React from "react";
import "./App.css";
import { listaCienciaQuiz } from "./questions-1";
import { listaDeporteQuiz } from "./questions-2";
import { listaEntretenimientoQuiz } from "./questions-3";
import { listaRandomQuiz } from "./questions-4";
import { useState } from "react";

export default function App() {
  const [preguntaActual, setPreguntaActual] = React.useState(0);
  const [puntaje, setPuntaje] = React.useState(0);
  const [mostrarPuntos, setMostrarPuntos] = React.useState(false);
  const [generoQuiz, setGeneroQuiz] = useState(listaCienciaQuiz);
  const [genero, setGenero] = useState("");
  const [pushButton,setPushButton] = useState(true);
  const [randomQuiz, setRandomQUiz] = useState(0);


  const opcionElegida = ( isCorrect ) => {
    if ( isCorrect ) {
      setPuntaje( puntaje + 1 );
    }

    const siguienteQuiz = preguntaActual + 1;
    console.log("Siguiente Pregunta :)");
    
    setPushButton( true );

    if ( siguienteQuiz < 10 /**generoQuiz.length*/ ) {
      setPreguntaActual( siguienteQuiz );
    } else {
      setMostrarPuntos ( true );
    }
  };
  const generoAzar = () =>{
    var x = Math.ceil(Math.random()*4); // Elige un numero CON EL 1 COMO MINIMO y MAXIMO 4
    console.log(x);

    setRandomQUiz(Math.floor(Math.random()*10));
    console.log(randomQuiz);
    console.log("la pregunta de indice "+ randomQuiz);

    if(x ===1){
      setGeneroQuiz (listaCienciaQuiz);
      setGenero("CIENCIA");
      console.log("preguntas de ciencia");
    }
    if(x ===2){
      setGeneroQuiz (listaDeporteQuiz);
      setGenero("DEPORTE");
      console.log("preguntas de Ciencia");
    }
    if(x ===3){
      setGeneroQuiz (listaEntretenimientoQuiz);
      setGenero("ENTRETENIMIENTO");
      console.log("preguntas de entretenimiento");
    }
    if(x ===4){
      setGeneroQuiz (listaRandomQuiz);
      setGenero("SUPER RANDOM");
      console.log("preguntas totalmente Random");
    }
    setPushButton( false );
  }
  return (
    <>
    <div><button disabled = {pushButton === false} onClick={() => generoAzar()}> elegir Genero </button> {genero}</div>
    <div className="app">
      {mostrarPuntos ? (<section className="showScore-section"> Tú respondiste {puntaje} de {10/**generoQuiz.length*/} preguntas </section>) :
        (<div>  {pushButton ? (<section>Habras respondido Bien??? Elige el genero de la siguiente pregunta </section>):
        (<><section className="question-section">
           <h1> Pregunta {preguntaActual + 1} de {10/*generoQuiz.length*/} </h1>
           <p> {generoQuiz[randomQuiz/*preguntaActual*/].textoPregunta} </p>
           </section>
           
           <section className="answer-section">
             {generoQuiz[ randomQuiz/*preguntaActual*/ ].opcionesRespuesta.map((item) => (
               <button disabled = {pushButton === true} onClick={() => opcionElegida( item.isCorrect )}> -O- {item.textoOpcion} </button>))}
           </section></>)}
        </div>)
      }
    </div>
    </>
  );
}
