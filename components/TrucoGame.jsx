import { useState, useEffect } from "react"
import "./TrucoGame.css"
import { useTrucoGame } from "../services/useTrucoGame"
import { Carta, CartaTapada } from "./Cartas.jsx"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Award, Coins, Message, Shield, Trophy, Cards } from "./Icons.jsx"
import { Score } from "./Score.jsx"

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
    rondaActual,
    cartaJugadaJ1,
    cartaSeleccionadaJ1,
    cartaSeleccionadaJ2,
    cartasJugadas,
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
    envidoMsg,
    preguntaEnvidoVisible,
    manejarRespuestaEnvido,
    tipoEnvido,
    envidoCantado,
    manejarEnvido,
    aceptarEnvido,
    envidoGanador, envidoJugador1, envidoJugador2,
    ganadorJuego,reiniciarJuego
  } = useTrucoGame()

  useEffect(() => {
    if (cartaSeleccionadaJ2 !== null) {
      setCartaJ2EnMesa((prevCartas) => [...prevCartas, cartaSeleccionadaJ2])
    }
    if (partidaTerminada) {
      setCartaJ2EnMesa([])
    }
  }, [cartaSeleccionadaJ2, partidaTerminada, ganadorJuego])

  

  return (
    <div className="game">

      
      <div className="tablero">
      {ganadorJuego && <div>
        <h1><strong>Ganador del juego: {ganadorJuego}</strong></h1>
        <Button onClick={reiniciarJuego}>Reiniciar</Button>
        </div>}
   
      <Row className="cartas-col">
           <div className="j2-mesa">
           <Col className="cartas">
              { jugador2?.map((carta, index) => (
                <CartaTapada key={index} carta={carta} />
              ))}
            </Col>
           </div>
          </Row>


        <div className="mesa">
      
        <Row className="cartas-col">
            <Col className="cartas">
              {cartaJ2EnMesa?.map((carta, index) => (
                <Carta key={index} carta={carta} idCardPlayer={false} />
              ))}
              {partidaTerminada && cartasJugadas?.map((carta, index) => (
                <Carta key={index} carta={carta.cartaJ2} idCardPlayer={false} />
              ))}
            </Col>
          </Row>

        <Row className="cartas-col">
            <Col className="cartas">
              {cartasJugadas?.map((carta, index) => (
                <Carta key={index} carta={carta.cartaJ1} idCardPlayer={false} />
              ))}
            </Col>
          </Row>


            </div>

       
     
          <Row className="jugador">
          
            <Col className="cartas">
              {jugador1.map((carta) => (
                <Carta
                  key={`${carta.valor}${carta.palo}`}
                  carta={carta}
                  seleccionada={carta === cartaSeleccionadaJ1}
                  onClick={() => {
                    setCartaSeleccionadaJ1(carta)
                    console.log(cartasJugadas)
                  }}
                 
                  idCardPlayer={true}
                />
              ))}
            </Col>
            


         
          
          <div className="btn-primary-div">
          {!ganadorPartida && <Button
          
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
        </Button>}
          </div>
         
          

          </Row>
          
      </div>





      <div className="aside">
        <div>
        {envidoGanador &&  <h2 className="envido-ganador">
              <Award className="icon" /> Ganador del Envido: {envidoGanador}
            </h2>}

{ganadorPartida ? (
  <h4><Trophy className='icon'/> Ganador de la partida: {ganadorPartida}</h4>
) : (
  <h4><Shield className='icon'/> Ronda {rondaActual}</h4>
)}
        </div>


        <div className="cantos">
          <Message className='icon'>Cantos</Message>
          {trucoCantado && !aceptarTruco && !aceptarReTruco && <p>Se cantó Truco</p>}
          {trucoCantado && !aceptarTruco && partidaTerminada && <p>No se aceptó Truco</p>}
          {aceptarTruco && !reTrucoCantado && <p>Se aceptó truco</p>}
          {reTrucoCantado && !aceptarReTruco && !aceptarValeCuatro && <p>Se cantó Retruco</p>}
          {aceptarReTruco && !valeCuatroCantado && <p>Se aceptó retruco</p>}
          {reTrucoCantado && !aceptarReTruco && partidaTerminada && <p>No se acepto el Retruco</p>}
          {valeCuatroCantado && !aceptarValeCuatro  && <p>Se cantó Vale Cuatro</p>}
          {aceptarValeCuatro && <p>Se aceptó vale cuatro</p>}
          {valeCuatroCantado && !aceptarValeCuatro && partidaTerminada && <p>No se acepto el vale 4</p>}
       
          
          {envidoCantado && !aceptarEnvido && <p>Se cantó envido</p>}
          {envidoCantado && aceptarEnvido && <p>Se aceptó el envido</p>}
          {envidoGanador && <p>Ganador del envido {envidoGanador}. Envido: {envidoJugador1}/{envidoJugador2}</p>}
         
        </div>

        
       <div className="btn-primary-div">
       <Button
          disabled={(jugador1.length>0 && jugador2.length>0) && !partidaTerminada}

          onClick={() => {
            const nuevoJugadorInicial = jugadorInicial === 1 ? 2 : 1
            setJugadorInicial(nuevoJugadorInicial)
            manejarReparto(nuevoJugadorInicial)
          }}
        >
          Repartir Cartas <Cards></Cards>
        </Button>
       </div>
   
      <div className="puntos">
      <div className="puntuacionj1">
        <div>Puntos j1</div>
        <Score puntos={puntosj1}></Score>
        </div>
        <div className="puntuacion">
        <div>Puntos j2</div>
        <Score puntos={puntosj2}></Score>
        </div>


      </div>
      {turno === 1 && !trucoCantado && jugador1.length > 0 && jugador2.length > 0 && (
         <div className="btn-truco"> <Button onClick={manejarCantoTrucoJ1}>Cantar Truco</Button></div>
        )}
      {turno === 1 && !envidoCantado && !ganadorPartida && rondaActual === 1 && jugadorInicial === 2 && (envidoGanador!=='Jugador 2' && envidoGanador!=='Jugador 1') && (
          <div className="envido-options">
            
            <Button  disabled={turno !== 1 || ganadorPartida || preguntaVisible} onClick={() => manejarEnvido(1, 2)}>
              Cantar Envido
            </Button>
            <Button  disabled={turno !== 1 || ganadorPartida || preguntaVisible} onClick={() => manejarEnvido(1, 6)}>
              Cantar Real Envido
            </Button>
            <Button  disabled={turno !== 1 || ganadorPartida || preguntaVisible} onClick={() => manejarEnvido(1, 99)}>
              Cantar Falta Envido
            </Button>
          </div>
        )}
        

        {trucoCantado && preguntaVisible && !partidaTerminada && !aceptarTruco && (
          <div className="pregunta-truco">
            <p>Se canto truco...¿Qué deseas hacer?</p>
            <Button onClick={() => manejarRespuestaTruco(true)}>Aceptar</Button>
            <Button onClick={() => manejarRespuestaTruco(false)}>Rechazar</Button>
            <Button onClick={() => manejarRespuestaTruco("retruco")}>Cantar Re Truco</Button>
          </div>
        )}

        {reTrucoCantado && preguntaReTrucoVisible && !partidaTerminada && !aceptarReTruco && (
          <div className="pregunta-retruco">
            <p>Se cantó retruco...¿Qué deseas hacer?</p>
            <Button onClick={() => manejarRespuestaReTruco(true)}>Aceptar</Button>
            <Button onClick={() => manejarRespuestaReTruco(false)}>Rechazar</Button>
            <Button onClick={() => manejarRespuestaReTruco("valecuatro")}>Cantar Vale Cuatro</Button>
          </div>
        )}

        {valeCuatroCantado && preguntaValeCuatroVisible && !partidaTerminada && !aceptarValeCuatro &&(
          <div className="pregunta-valecuatro">
            <p>Se cantó vale cuatro...¿Aceptas el Vale Cuatro?</p>
            <Button onClick={() => manejarRespuestaValeCuatro(true)}>Aceptar</Button>
            <Button onClick={() => manejarRespuestaValeCuatro(false)}>Rechazar</Button>
          </div>
        )}

        
        {preguntaEnvidoVisible && !ganadorPartida && (
          <div className="pregunta-envido">
            <p>{envidoMsg}...¿Qué deseas hacer?</p>
            <Button onClick={() => manejarRespuestaEnvido(true)}>Aceptar</Button>
            <Button onClick={() => manejarRespuestaEnvido(false)}>Rechazar</Button>
            {tipoEnvido === 2 && (
              <>
                <Button onClick={() => manejarRespuestaEnvido("envidoenvido")}>Cantar Envido Envido</Button>
                <Button onClick={() => manejarRespuestaEnvido("realenvido")}>Cantar Real Envido</Button>
                <Button onClick={() => manejarRespuestaEnvido("faltaenvido")}>Cantar Falta Envido</Button>
              </>
            )}
             {tipoEnvido === 4 && (
              <>
                <Button onClick={() => manejarRespuestaEnvido("realenvido")}>Cantar Real Envido</Button>
                <Button onClick={() => manejarRespuestaEnvido("faltaenvido")}>Cantar Falta Envido</Button>
              </>
            )}
             {tipoEnvido === 6 && (
              <>
                <Button onClick={() => manejarRespuestaEnvido("faltaenvido")}>Cantar Falta Envido</Button>
              </>
            )}
          </div>
        )}

       

        
      </div>
    </div>
  )
}

