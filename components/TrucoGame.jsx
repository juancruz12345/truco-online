// TrucoGame.js

import './TrucoGame.css';
import { useTrucoGame } from '../services/useTrucoGame';
import { Carta } from './Carta.jsx';

import { useState, useEffect } from 'react';

export function TrucoGame() {
  
  const [cartaJ2EnMesa, setCartaJ2EnMesa] = useState([])

  
  const {
    partidaTerminada,
    puntosj1,
    puntosj2,
    rondasGanadasJ1,
    rondasGanadasJ2,
    setJugadorInicial,
    manejarReparto,
    turno,
   
    ganadorPartida,
   
    envidoGanador,
    rondaActual,
    cartaJugadaJ1,
    cartaSeleccionadaJ1,
    cartaSeleccionadaJ2,
    cartasJugadas,
    msg,
    setCartaSeleccionadaJ1,
    jugador1,
    jugador2,
    jugadorInicial,
    trucoCantado, 
    aceptarTruco, 
    manejarCantoTrucoJ1, 
    manejarRespuestaTruco, 
    preguntaVisible,
    reTrucoCantado, 
    aceptarReTruco,
     manejarRespuestaReTruco, 
     preguntaReTrucoVisible,
     valeCuatroCantado, 
     aceptarValeCuatro, 
     manejarRespuestaValeCuatro, 
     preguntaValeCuatroVisible,
     setEnvidoGanador, calcularEnvido, setPuntosJ1, setPuntosJ2,setEnvidoCantado, envidoCantado
    
  } = useTrucoGame();



  const [preguntaEnvidoVisible, setPreguntaEnvidoVisible] = useState(false);
  const [aceptarEnvido, setAceptarEnvido] = useState(null);
  const [tipoEnvido, setTipoEnvido] = useState(null); // 2: Envido, 4: Envido Envido, 6: Real Envido, 99: Falta Envido
  const [envidoMsg, setEnvidoMsg] = useState('')
   
  // Función para manejar el canto de envido, real envido o falta envido por parte del jugador 1 o la IA
  const manejarEnvido = (jugador, tipo) => {
    setEnvidoCantado(true);
    setTipoEnvido(tipo);
  
    if (jugador === 1) {
      const decisionIA = Math.random();
  
      //  Si ya se cantó Falta Envido, la IA solo puede aceptar o rechazar
      if (tipo === 99 || tipoEnvido === 99) {
        if (decisionIA < 0.5) {
          const puntosAGanar = puntosPorRechazo(99);
          setPuntosJ1((prev) => prev + puntosAGanar);
          setEnvidoMsg(`Jugador 2 rechazó el Falta Envido, Jugador 1 gana ${puntosAGanar} puntos`);
          console.log("IA rechazó el Falta Envido");
        } else {
          setEnvidoMsg('Jugador 2 aceptó el Falta Envido');
          setAceptarEnvido(true);
          manejarResolucionEnvido(99);
        }
        return; //  Detenemos la función aquí para evitar que la IA cante otro envido
      }
  
      //  Si NO es Falta Envido, la IA decide normalmente
      if (decisionIA < 0.2) {
        const puntosAGanar = puntosPorRechazo(tipo);
        setPuntosJ1((prev) => prev + puntosAGanar);
        setEnvidoMsg(`Jugador 2 rechazó el envido, Jugador 1 gana ${puntosAGanar} puntos`);
        console.log("IA rechazó el envido");
      } else if (decisionIA < 0.4) {
        setEnvidoMsg('Jugador 2 aceptó el envido');
        setAceptarEnvido(true);
        manejarResolucionEnvido(tipo);
      } else if (decisionIA < 0.6) {
        manejarEnvido(2, 4); // La IA canta Envido Envido
        console.log("IA canta Envido Envido");
        setEnvidoMsg('Jugador 2 cantó Envido Envido');
      } else if (decisionIA < 0.8) {
        manejarEnvido(2, 6); // La IA canta Real Envido
        console.log("IA canta Real Envido");
        setEnvidoMsg('Jugador 2 cantó Real Envido');
      } else {
        manejarEnvido(2, 99); // La IA canta Falta Envido
        console.log("IA canta Falta Envido");
        setEnvidoMsg('Jugador 2 cantó Falta Envido');
      }
    } else {
      setPreguntaEnvidoVisible(true);
      setEnvidoMsg('');
    }
  };
  
  
  const puntosPorRechazo = (tipoEnvido) => {
    switch (tipoEnvido) {
      case 2: return 1; // Envido
      case 4: return 2; // Envido Envido
      case 6: return 1; // Real Envido
      case 99: return 1; // Falta Envido
      case "2-6": return 2; // Envido, Real Envido
      case "2-99": return 2; // Envido, Falta Envido
      case "6-99": return 3; // Real Envido, Falta Envido
      case "4-6": return 4; // Envido Envido, Real Envido
      case "4-99": return 4; // Envido Envido, Falta Envido
      case "2-6-99": return 5; // Envido, Real Envido, Falta Envido
      case "4-6-99": return 7; // Envido Envido, Real Envido, Falta Envido
      default: return 0; // Si por alguna razón el tipoEnvido no está en la tabla, no suma puntos
    }
  };
  // Verificar si la IA es mano y tiene 50% de probabilidad de cantar Envido
  useEffect(() => {
    if (turno === 2 && jugadorInicial === 2 && rondaActual === 1 && !envidoCantado) {
      manejarEnvido();
    }
  }, [turno, jugadorInicial, rondaActual, envidoCantado]);

  // Función para manejar la respuesta del jugador 1 al envido
  const manejarRespuestaEnvido = (respuesta) => {
    setPreguntaEnvidoVisible(false);

    
  if (!respuesta) { // Si el jugador rechaza el envido
    const puntosAGanar = puntosPorRechazo(tipoEnvido);
    
    // Sumar puntos al otro jugador
    if (turno === 1) {
      setPuntosJ2((prev) => prev + puntosAGanar);
      setEnvidoMsg(`Jugador 1 rechazó el envido, Jugador 2 gana ${puntosAGanar} puntos`);
    } else {
      setPuntosJ1((prev) => prev + puntosAGanar);
      setEnvidoMsg(`Jugador 2 rechazó el envido, Jugador 1 gana ${puntosAGanar} puntos`);
    }
    
    return;
  }
  
    // Si ya se cantó Falta Envido, no se puede cantar otro envido
    if (tipoEnvido === 99) {
      console.log("No se puede cantar otro envido después de Falta Envido");
      return;
    }
  
    if (tipoEnvido === 2) {
      if (respuesta === 'envidoenvido') {
        manejarEnvido(1, 4);
      } else if (respuesta === 'realenvido') {
        manejarEnvido(1, 6);
      } else if (respuesta === 'faltaenvido') {
        manejarEnvido(1, 99);
      } else {
        setAceptarEnvido(respuesta);
        if (respuesta) manejarResolucionEnvido(tipoEnvido);
        else console.log("Jugador 1 rechazó el envido");
      }
    } else {
      setAceptarEnvido(respuesta);
      if (respuesta) manejarResolucionEnvido(tipoEnvido);
      else console.log("Jugador 1 rechazó el envido");
    }
  };

  // Función para resolver el envido según el tipo
  const manejarResolucionEnvido = (puntos) => {
    const envidoJ1 = calcularEnvido(jugador1);
    const envidoJ2 = calcularEnvido(jugador2);
    console.log(envidoJ1, '/', envidoJ2);
    let puntosAGanar = puntos;
    if (puntos === 99) {
      puntosAGanar = Math.max(15 - puntosj1, 15 - puntosj2); // Falta Envido da los puntos necesarios para ganar
    }
    if (envidoJ1 > envidoJ2) {
      setEnvidoGanador('Jugador 1');
      setPuntosJ1((prev) => prev + puntosAGanar);
    } else if (envidoJ2 > envidoJ1) {
      setEnvidoGanador('Jugador 2');
      setPuntosJ2((prev) => prev + puntosAGanar);
    } else {
      if (jugadorInicial === 1) {
        setEnvidoGanador('Jugador 1');
        setPuntosJ1((prev) => prev + puntosAGanar);
      } else {
        setEnvidoGanador('Jugador 2');
        setPuntosJ2((prev) => prev + puntosAGanar);
      }
    }
  };


  useEffect(() => {
    if (cartaSeleccionadaJ2 !== null) {
      setCartaJ2EnMesa(prevCartas => [...prevCartas, cartaSeleccionadaJ2]);
    }
    if(partidaTerminada){
      setCartaJ2EnMesa([])
    }
  
  }, [cartaSeleccionadaJ2, partidaTerminada]);
  

  

  return (
    <div className='game'>
      <div className="tablero">
        {envidoMsg!==''
          && (
            <h4>{envidoMsg}</h4>
          )
        }
       
        <h1>Juego de Truco</h1>
        <h2>Puntos j1: {puntosj1}</h2>
        <h2>Puntos j2: {puntosj2}</h2>
        {preguntaEnvidoVisible && !ganadorPartida && rondaActual===1 && (
          <div className="pregunta-envido">
            <h3>¿Qué deseas hacer?</h3>
            <button onClick={() => manejarRespuestaEnvido(true)}>Aceptar</button>
            <button onClick={() => manejarRespuestaEnvido(false)}>Rechazar</button>
            {tipoEnvido === 2 && <button onClick={() => manejarRespuestaEnvido('envidoenvido')}>Cantar Envido Envido</button>}
            {tipoEnvido === 2 && <button onClick={() => manejarRespuestaEnvido('realenvido')}>Cantar Real Envido</button>}
            {tipoEnvido === 2 && <button onClick={() => manejarRespuestaEnvido('faltaenvido')}>Cantar Falta Envido</button>}
          </div>
        )}
        
        
       
        <button
          onClick={() => {
            const nuevoJugadorInicial = jugadorInicial === 1 ? 2 : 1;
            setJugadorInicial(nuevoJugadorInicial); // Actualiza el estado global
            manejarReparto(nuevoJugadorInicial); // Pasa el valor actualizado
          }}
        >
          Repartir Cartas
        </button>
        {turno === 2 && !envidoCantado && !ganadorPartida && rondaActual === 1 && (
          <button onClick={()=>{manejarEnvido(2)}}>Cantar Envido IA</button>
        )}
        {turno === 1 && !envidoCantado && !ganadorPartida && rondaActual === 1 && jugadorInicial === 2 && (
          
         <div>
           <button disabled={
            turno !== 1 || 
            ganadorPartida || 
            preguntaVisible
          } onClick={() => manejarEnvido(1, 2)}>Cantar Envido</button>
            <button disabled={
            turno !== 1 || 
            ganadorPartida || 
            preguntaVisible
          } onClick={() => manejarEnvido(1, 6)}>Cantar Real Envido</button>
            <button disabled={
            turno !== 1 || 
            ganadorPartida || 
            preguntaVisible
          } onClick={() => manejarEnvido(1, 99)}>Cantar Falta Envido</button>
         </div>
        )}
        {envidoGanador && <h2>Ganador del Envido: {envidoGanador}</h2>}
        {ganadorPartida ? (
          <h2>Ganador de la partida: {ganadorPartida}</h2>
        ) : (
          <h2>Ronda {rondaActual}</h2>
        )}
       <button
  onClick={cartaJugadaJ1}
  disabled={
    turno !== 1 || 
    !cartaSeleccionadaJ1 || 
    ganadorPartida || 
    preguntaVisible || 
    preguntaReTrucoVisible || 
    preguntaValeCuatroVisible
  }
>
  Jugar Carta
</button>
        
        {msg !== undefined && <h2>{msg}</h2>}

        <div className="jugador">
          <h2>Jugador 1</h2>
          <div className="cartas">
            <div className='cartas-j1'>
              <div className="container">
                {jugador1.map((carta) => (
                  <Carta
                    key={`${carta.valor}${carta.palo}`}
                    carta={carta}
                    seleccionada={carta === cartaSeleccionadaJ1}
                    onClick={() => {
                      setCartaSeleccionadaJ1(carta);
                      console.log(cartasJugadas);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="jugador">
          <h2>Jugador 2</h2>
          <div className="cartas">
            {jugador2.map((carta, index) => (
              <Carta
                key={index}
                carta={carta}
                seleccionada={carta === cartaSeleccionadaJ2}
              />
            ))}
          </div>
        </div>

        {turno === 1 && !trucoCantado && jugador1.length>0 && jugador2.length>0 && (
          <button onClick={manejarCantoTrucoJ1}>Cantar Truco</button>
        )}

        {trucoCantado && preguntaVisible && !aceptarTruco && (
          <div className="pregunta-truco">
            <h3>¿Qué deseas hacer?</h3>
            <button onClick={() => manejarRespuestaTruco(true)}>Aceptar</button>
            <button onClick={() => manejarRespuestaTruco(false)}>Rechazar</button>
            <button onClick={() => manejarRespuestaTruco('retruco')}>Cantar Re Truco</button>
          </div>
        )}

        {reTrucoCantado && preguntaReTrucoVisible && !aceptarReTruco && (
          <div className="pregunta-retruco">
            <h3>¿Qué deseas hacer?</h3>
            <button onClick={() => manejarRespuestaReTruco(true)}>Aceptar</button>
            <button onClick={() => manejarRespuestaReTruco(false)}>Rechazar</button>
            <button onClick={() => manejarRespuestaReTruco('valecuatro')}>Cantar Vale Cuatro</button>
          </div>
        )}

        {valeCuatroCantado && preguntaValeCuatroVisible && !aceptarValeCuatro && (
          <div className="pregunta-valecuatro">
            <h3>¿Aceptas el Vale Cuatro?</h3>
            <button onClick={() => manejarRespuestaValeCuatro(true)}>Aceptar</button>
            <button onClick={() => manejarRespuestaValeCuatro(false)}>Rechazar</button>
          </div>
        )}
      </div>

      <div className='aside'>
        <div>
          <span>cantos</span>
          {aceptarTruco && (<h4>acepto truco</h4>)}
        {aceptarReTruco && (<h4>acepto REtruco</h4>)}
        {aceptarValeCuatro && (<h4>acepto vale4</h4>)}
        </div>
        <div>
       
        </div>
        
          <div className='cartas-jugadas'>
            <div className='cartas-col'>
            <h2>Rondas ganadas j1: {rondasGanadasJ1}</h2>
              <h4>Cartas j1</h4>
              <ul>
                {cartasJugadas?.map((carta, index) => (
                  <Carta
                    key={index}
                    carta={carta.cartaJ1}
                  />
                ))}
              </ul>
            </div>
            <br></br>
            <div className='cartas-col'>
            <h2>Rondas ganadas j2: {rondasGanadasJ2}</h2>
              <h4>Cartas j2</h4>
              <ul>
                {cartaJ2EnMesa?.map((carta, index) => (
                  <Carta
                    key={index}
                    carta={carta}
                  />
                ))}
              </ul>
            </div>
          </div>
       
          <></>
       
      </div>
    </div>
  );
}
