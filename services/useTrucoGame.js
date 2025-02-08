import { useEffect, useState } from "react";
import { Carts } from "./Carts";

export function useTrucoGame(){

    /*const mazoPruebaJ1 = [ { valor: 1, palo: 'copa', jerarquia: 1 },
    { valor: 12, palo: 'copa', jerarquia: 8 },
    { valor: 12, palo: 'copa', jerarquia: 8 },
 
  ]
  const mazoPruebaJ2 = [ { valor: 1, palo: 'copa', jerarquia: 1 },
    { valor: 12, palo: 'copa', jerarquia: 8 },
    { valor: 12, palo: 'copa', jerarquia: 8 },
  
  ]*/


      const {MAZO} = Carts()
      
      const [jugador1, setJugador1] = useState([]);
      const [jugador2, setJugador2] = useState([]);
      const [cartaSeleccionadaJ1, setCartaSeleccionadaJ1] = useState(null);
      const [cartaSeleccionadaJ2, setCartaSeleccionadaJ2] = useState(null);
      const [rondasGanadasJ1, setRondasGanadasJ1] = useState(0);
      const [rondasGanadasJ2, setRondasGanadasJ2] = useState(0);
      const [rondaActual, setRondaActual] = useState(1);
      const [cartasJugadas, setCartasJugadas] = useState([]);
      const [ganadorPartida, setGanadorPartida] = useState(null);
      const [msg, setMsg] = useState('')
      const [puntosj1, setPuntosJ1] = useState(0)
      const [puntosj2, setPuntosJ2] = useState(0)
      const [turno, setTurno] = useState(1);
      const [jugada, setJugada] = useState(false)
      const [jugadaIA, setJugadaIA] = useState(false)
      const [jugadorInicial, setJugadorInicial] = useState(1);
      const [cartaJ1EnMesa, setCartaJ1Mesa] = useState([])
      const [cartaJ2EnMesa, setCartaJ2Mesa] = useState([])
      const [partidaTerminada, setPartidaTerminada] = useState(false)
      const [ganadorJuego, setGanadorJuego]=useState(null)

    
    
    
  ////////////////            TRUCO     /////////////

  const [trucoCantado, setTrucoCantado] = useState(false);
  const [reTrucoCantado, setReTrucoCantado] = useState(false);
  const [valeCuatroCantado, setValeCuatroCantado] = useState(false);
  const [aceptarTruco, setAceptarTruco] = useState(null); // null: no decidido, true: aceptado, false: rechazado
  const [aceptarReTruco, setAceptarReTruco] = useState(null);
  const [aceptarValeCuatro, setAceptarValeCuatro] = useState(null);
  const [preguntaVisible, setPreguntaVisible] = useState(false);
  const [preguntaReTrucoVisible, setPreguntaReTrucoVisible] = useState(false);
  const [preguntaValeCuatroVisible, setPreguntaValeCuatroVisible] = useState(false);

    
// Función para manejar el canto de truco por parte del jugador 1
const manejarCantoTrucoJ1 = () => {
  setTrucoCantado(true);
  const decisionIA = Math.random(); // Probabilidad para IA
  if (decisionIA < 0.33) {
    setAceptarTruco(false);
    setPartidaTerminada(true)
    setGanadorPartida('Jugador 1')
    setPuntosJ1(puntosj1+1)
    setRondasGanadasJ1(0)
    setRondasGanadasJ2(0)
    console.log("IA rechazó el truco");
  } else if (decisionIA < 0.66) {
    setAceptarTruco(true);
    console.log("IA aceptó el truco");
  } else manejarCantoReTruco(2); // La IA canta re truco
};

// Función para manejar el canto de truco por parte de la IA
const manejarCantoTrucoIA = () => {
  if(!partidaTerminada){
    setTrucoCantado(true);
    setPreguntaVisible(true);
  }else{
    setTrucoCantado(false);
    setPreguntaVisible(false);
    return
  }
};

// Función para manejar la respuesta del jugador 1 al truco
const manejarRespuestaTruco = (respuesta) => {
  if (respuesta === 'retruco') {
    manejarCantoReTruco(1);
  } else {
    setAceptarTruco(respuesta);
    setPreguntaVisible(false);///setPuntosJ1((prev)=>prev+1)
    if (!respuesta){
      console.log("Jugador 1 rechazó el truco")
    setPartidaTerminada(true)
    setGanadorPartida('Jugador 2')
    setPuntosJ2(puntosj2+1)
    setRondasGanadasJ1(0)
    setRondasGanadasJ2(0)
    setPreguntaVisible(false);
    }
  }
};

// Función para manejar el canto de re truco
const manejarCantoReTruco = (jugador) => {
  setPreguntaVisible(false)
  setReTrucoCantado(true);
  if (jugador === 1) {
    const decisionIA = Math.random(); // Probabilidad para IA
    if (decisionIA < 0.33) {
      setAceptarReTruco(false);
      console.log("IA rechazó el re truco");
      setPartidaTerminada(true)
    setGanadorPartida('Jugador 1')
    setPuntosJ1(puntosj1+2)
    setRondasGanadasJ1(0)
    setRondasGanadasJ2(0)
    setPreguntaReTrucoVisible(false)
    } else if (decisionIA < 0.66) {
      setAceptarReTruco(true);
      console.log("IA aceptó el re truco");
      setPreguntaReTrucoVisible(false)
    } else manejarCantoValeCuatro(2); // La IA canta vale cuatro
  } else {
    setPreguntaReTrucoVisible(true);
  }
};

// Función para manejar la respuesta del jugador 1 al re truco
const manejarRespuestaReTruco = (respuesta) => {
  if (respuesta === 'valecuatro') {
    manejarCantoValeCuatro(1);
  } else {
    setAceptarReTruco(respuesta);
    
    if (!respuesta){
      console.log("Jugador 1 rechazó el re truco");
      setPartidaTerminada(true)
      setGanadorPartida('Jugador 2')
      setPuntosJ2(puntosj2+2)
      setRondasGanadasJ1(0)
      setRondasGanadasJ2(0)
      setPreguntaReTrucoVisible(false)

    }
  }
};

// Función para manejar el canto de vale cuatro
const manejarCantoValeCuatro = (jugador) => {
  setValeCuatroCantado(true);
  setPreguntaReTrucoVisible(false)
  if (jugador === 1) {
    const decisionIA = Math.random(); // Probabilidad para IA
    if (decisionIA < 0.5) {
      setAceptarValeCuatro(false);
      console.log("IA rechazó el vale cuatro");
      setPartidaTerminada(true)
    setGanadorPartida('Jugador 1')
    setPuntosJ1(puntosj1+3)
    setRondasGanadasJ1(0)
    setRondasGanadasJ2(0)
    setPreguntaValeCuatroVisible(false)
    } else {
      setAceptarValeCuatro(true);
      setPreguntaValeCuatroVisible(false)
      console.log("IA aceptó el vale cuatro");
    }
  } else {
    setPreguntaValeCuatroVisible(true);
  }
};

// Función para manejar la respuesta del jugador 1 al vale cuatro
const manejarRespuestaValeCuatro = (respuesta) => {
  setAceptarValeCuatro(respuesta);
  setPreguntaValeCuatroVisible(false);
  if (!respuesta) {
    console.log("Jugador 1 rechazó el vale cuatro");
    setPartidaTerminada(true)
    setGanadorPartida('Jugador 2')
    setPuntosJ2(puntosj2+3)
    setRondasGanadasJ1(0)
    setRondasGanadasJ2(0)
    
  }
  else console.log("Jugador 1 aceptó el vale cuatro");
};

// Verificar si la IA canta truco antes de jugar una carta
useEffect(() => {

  
  if (turno === 2 && !trucoCantado && Math.random() < 0.5) {
    manejarCantoTrucoIA();
  }
  if(aceptarTruco || aceptarReTruco || aceptarValeCuatro){
    setPreguntaVisible(false)
    setPreguntaReTrucoVisible(false)
    setPreguntaValeCuatroVisible(false)
  }
  

}, [turno, trucoCantado, reTrucoCantado, valeCuatroCantado, aceptarTruco, aceptarReTruco, aceptarValeCuatro]);




//////////////             ENVIDO            //////////////////////////


const [preguntaEnvidoVisible, setPreguntaEnvidoVisible] = useState(false);
const [aceptarEnvido, setAceptarEnvido] = useState(null);
const [tipoEnvido, setTipoEnvido] = useState(null); // 2: Envido, 4: Envido Envido, 6: Real Envido, 99: Falta Envido
const [envidoMsg, setEnvidoMsg] = useState('')
const [envidoCantado, setEnvidoCantado] = useState(false);
const [envidoGanador, setEnvidoGanador] = useState(null);
const [envidoJugador1, setEnvidoJugador1] = useState(0)
const [envidoJugador2, setEnvidoJugador2] = useState(0)

 
  // Función para manejar el canto de envido, real envido o falta envido por parte del jugador 1 o la IA
  const manejarEnvido = (jugador, tipo) => {
    setEnvidoCantado(true);
    setTipoEnvido(tipo);
  
    if (jugador === 1 && !envidoGanador) {
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
      if (decisionIA < 0.2 && !envidoGanador) {
        const puntosAGanar = puntosPorRechazo(tipo);
        setPuntosJ1((prev) => prev + puntosAGanar);
        setEnvidoMsg(`Jugador 2 rechazó el envido, Jugador 1 gana ${puntosAGanar} puntos`);
        console.log("IA rechazó el envido");
      } else if (decisionIA < 0.4 && !envidoGanador) {
        setEnvidoMsg('Jugador 2 aceptó el envido');
        setAceptarEnvido(true);
        manejarResolucionEnvido(tipo);
      } else if (decisionIA < 0.6 && tipo !== 2 && tipo !== 4 && tipoEnvido !== 6 && tipoEnvido !== 4 && !envidoGanador) {
        manejarEnvido(2, 4); // La IA canta Envido Envido
        console.log("IA canta Envido Envido");
        setEnvidoMsg('Jugador 2 cantó Envido Envido');
      } else if (decisionIA < 0.8 && tipo!==2 && tipo!==4 && tipo!==6 && tipoEnvido !== 6 && tipoEnvido !== 99 && !envidoGanador) {
        manejarEnvido(2, 6); // La IA canta Real Envido
        console.log("IA canta Real Envido");
        setEnvidoMsg('Jugador 2 cantó Real Envido');
      } else {
        if(!envidoGanador){
          manejarEnvido(2, 99); // La IA canta Falta Envido
        console.log("IA canta Falta Envido");
        setEnvidoMsg('Jugador 2 cantó Falta Envido');
        }
      }
    } else {
      setPreguntaEnvidoVisible(true);
      
      if(tipo===2 && !envidoGanador){
        setEnvidoMsg('Jugador 2 canto envido');
      }else if(tipo===4 && !envidoGanador){
        setEnvidoMsg('Jugador 2 canto envido envido');
      }
      else if(tipo===6 && !envidoGanador){
        setEnvidoMsg('Jugador 2 canto real envido');
      }
      else if(tipo===99 && !envidoGanador){
        setEnvidoMsg('Jugador 2 canto falta envido');
      }
      
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
    if (turno === 2 && jugadorInicial !== 2 && rondaActual === 1 && !envidoCantado && partidaTerminada===false && cartaSeleccionadaJ2===null) {
      const decisionIA = Math.random();
      if(decisionIA<0.2){
        manejarEnvido(2,2)
      }
      else if(decisionIA>0.2){
        manejarEnvido(2,99)
      }
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
    if (tipoEnvido === 99 && turno === 2 && respuesta !== true) {
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
    setEnvidoJugador1(envidoJ1)
    setEnvidoJugador2(envidoJ2)
    console.log(envidoJ1, '/', envidoJ2);
    let puntosAGanar = puntos;
    if(puntos===6){
      puntosAGanar=3
    }
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

  function calcularEnvido(cartas) {
    const palos = cartas.reduce((acc, carta) => {
      if (!acc[carta.palo]) acc[carta.palo] = [];
      acc[carta.palo].push(carta.valor > 9 ? 0 : carta.valor); // Figuras valen 0
      return acc;
    }, {});
  
    let maxEnvido = 0;
  
    Object.values(palos).forEach((grupo) => {
      const grupoOrdenado = grupo.sort((a, b) => b - a); 
  
      if (grupoOrdenado.length > 1) {
        const suma = grupoOrdenado[0] + grupoOrdenado[1] + 20;
        maxEnvido = Math.max(maxEnvido, suma);
      } else {
        maxEnvido = Math.max(maxEnvido, grupoOrdenado[0]);
      }
    });
  
    return maxEnvido;
  }
  
  





    
  function barajarMazo(mazo) {
  const nuevoMazo = [...mazo]; // Copia el mazo para no mutar el original
  for (let i = nuevoMazo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
    [nuevoMazo[i], nuevoMazo[j]] = [nuevoMazo[j], nuevoMazo[i]]; // Intercambiar cartas
  }
  return nuevoMazo;
}
      function repartirCartas(mazo) {
        const mazoBarajado = barajarMazo([...mazo])
        console.log(mazoBarajado)
        return {
          jugador1: mazoBarajado.slice(0, 3),
          jugador2: mazoBarajado.slice(3, 6),
          
        }
      }
    
  const manejarReparto = (nuevoJugadorInicial) => {
    setPreguntaReTrucoVisible(false)
    setPreguntaReTrucoVisible(false)
    setPreguntaValeCuatroVisible(false)
    setAceptarTruco(null)
    setAceptarReTruco(null)
    setAceptarValeCuatro(null)
    setTrucoCantado(false)
    setReTrucoCantado(false)
    setValeCuatroCantado(false)
    const { jugador1, jugador2 } = repartirCartas(MAZO);
    setJugador1(jugador1);
    setJugador2(jugador2);
    setCartaSeleccionadaJ1(null);
    setCartaSeleccionadaJ2(null);
    setCartaJ1Mesa([])
    setCartaJ2Mesa([])
    setRondasGanadasJ1(0);
    setRondasGanadasJ2(0);
    setRondaActual(1);
    setTurno(nuevoJugadorInicial); 
    setCartasJugadas([]);
    setGanadorPartida(null);
    setPartidaTerminada(false)
    setEnvidoCantado(false);
    
    setEnvidoGanador(null);
    
  };

  

  const cambiarTurno = () => {
    setTurno((prevTurno) => (prevTurno === 1 ? 2 : 1));
  };
  const cartaJugadaJ1 = () => {
    if(turno ===1 && cartaSeleccionadaJ1 /*&& !cartaSeleccionadaJ2*/ ){
      setCartaJ1Mesa((prev)=>[...prev,{carta:cartaSeleccionadaJ1}])
      setJugada(true)
      setCartaSeleccionadaJ1(null)
      cambiarTurno()
      
    }
   
  }
  const cartaJugadaJ2 = () =>{
    
      try{
      const cartaIA = seleccionarCartaIA(jugador2);
      setCartaSeleccionadaJ2(cartaIA);
      setCartaJ2Mesa((prev)=>[...prev,{carta:cartaIA}])
      setJugadaIA(false)  
      
      }
      catch(e){
        console.log(e)
      
      }

  }
  
  const manejarJugada = () => {
    if (jugada && cartaSeleccionadaJ2) {
     
      let cartaElegidaJ1 = cartaJ1EnMesa.pop()
      let cartaElegidaJ2 = cartaJ2EnMesa.pop()
      console.log(cartaElegidaJ1.carta, ' / ',cartaSeleccionadaJ2)
      const ganador = calcularGanadorCarta(cartaElegidaJ1.carta, cartaElegidaJ2.carta);
      setCartasJugadas((prev) => [...prev, { cartaJ1: cartaElegidaJ1.carta, cartaJ2: cartaElegidaJ2.carta, ganador }]);
  
      if (ganador === 'Jugador 1') {
        setRondasGanadasJ1(rondasGanadasJ1 + 1);
        setTurno(1)
      } else if (ganador === 'Jugador 2') {
        setRondasGanadasJ2(rondasGanadasJ2 + 1);
        setTurno(2)
      }
  
      setJugador1(jugador1.filter(carta => carta !== cartaElegidaJ1.carta))
      setJugador2(jugador2.filter(carta => carta !== cartaElegidaJ2.carta))
      setCartaSeleccionadaJ1(null)
      setCartaSeleccionadaJ2(null)
      setJugada(false)
      setRondaActual(rondaActual + 1)
     
    }
  }
  

  const reiniciar= () =>{
    setGanadorPartida(null)
    setRondaActual(0)
    setJugador1([])
    setJugador2([])
    
  }
  function reiniciarJuego(){
    setGanadorPartida(null)
    setRondaActual(0)
    setJugador1([])
    setJugador2([])
    setGanadorJuego(null)
    setPuntosJ1(0)
    setPuntosJ2(0)
    setPreguntaEnvidoVisible(false)
    setPreguntaVisible(false)
    setPreguntaReTrucoVisible(false)
    setPreguntaValeCuatroVisible(false)
    setTrucoCantado(false)
    setReTrucoCantado(false)
    setValeCuatroCantado(false)
    setAceptarEnvido(false)
    setAceptarReTruco(false)
    setAceptarTruco(false)
    setAceptarValeCuatro(false)
    setEnvidoGanador(false)
    setPartidaTerminada(true)

  }

 
  useEffect(()=>{
   
   if(turno===2 && !cartaSeleccionadaJ2){
    setJugadaIA(true)
    if(jugadaIA){
      cartaJugadaJ2()
      console.log('jugadaIA ',jugadaIA)
      cambiarTurno()
    }
   }
   
    
    if (rondasGanadasJ1 === 2) {
        if(aceptarTruco){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+2)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('el j1 gano con truco')
        }
        else if(aceptarReTruco){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+3)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('el j1 gano con REtruco')
        }
        else if(aceptarValeCuatro){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+4)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('el j1 gano con vale 4')
        }
        else{
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+1)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        }
        
      } 
    else if (rondasGanadasJ2 === 2) {
      if(aceptarTruco){
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+2)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('el j2 gano con truco')
      }
      else if(aceptarReTruco){
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+3)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('el j2 gano con retruco')
      }
      else if(aceptarValeCuatro){
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+4)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('el j2 gano con vale4')
      }
      else{
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+1)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
      }
        
      }
    
    else if(rondaActual===4 && rondasGanadasJ1===0 && rondasGanadasJ2===0){
          
      
          if(jugadorInicial===1 && !partidaTerminada){
            setPartidaTerminada(true)
            setGanadorPartida('Jugador 1')
            setPuntosJ1(puntosj1+1)
            setRondasGanadasJ1(0)
            setRondasGanadasJ2(0)
            reiniciar()
            console.log('El j1 gano por se mano')
          }
          else if(jugadorInicial===2 && !partidaTerminada){
            setPartidaTerminada(true)
            setGanadorPartida('Jugador 2')
            setPuntosJ2(puntosj2+1)
            setRondasGanadasJ1(0)
            setRondasGanadasJ2(0)
            reiniciar()
            console.log('El j2 gano por se mano')
          }
          
        }
    else if(rondaActual===4 && rondasGanadasJ1===1 && rondasGanadasJ2===1){
        
      if(jugadorInicial===1 && !partidaTerminada){
        
        if(aceptarTruco){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+2)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j1 gano por se mano y con truco')
        }
        else if(aceptarReTruco){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+3)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j1 gano por se mano y con re truco')
        }
        else if(aceptarValeCuatro){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+4)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j1 gano por se mano y con vale 4')
        }
        else{
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+1)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j1 gano por se mano')
        }
      }
      else if(jugadorInicial===2 && !partidaTerminada){
        if(trucoCantado){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+2)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j2 gano por se mano y con truco')
        }
        else if(aceptarReTruco){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+3)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j2 gano por se mano y con re truco')
        }
        else if(aceptarValeCuatro){
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+4)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j2 gano por se mano y con vale 4')
        }
        else{
          setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+1)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        reiniciar()
        console.log('El j2 gano por se mano')
        }
      }
      
      }
    else if(rondaActual===2 && rondasGanadasJ1 === 0 && rondasGanadasJ2 === 0){
        setMsg('¡Parda la mejor!')
    }
    else if(rondaActual===3 && rondasGanadasJ1 === 1 && rondasGanadasJ2 === 0){
        if(aceptarTruco){
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+2)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('El j1 gano la parda con truco')
        }
        else if(aceptarReTruco){
          setPartidaTerminada(true)
          setGanadorPartida('Jugador 1')
          setPuntosJ1(puntosj1+3)
          setRondasGanadasJ1(0)
          setRondasGanadasJ2(0)
          console.log('El j1 gano la parda con retruco')
          }
        else if(aceptarValeCuatro){
          setPartidaTerminada(true)
          setGanadorPartida('Jugador 1')
          setPuntosJ1(puntosj1+4)
          setRondasGanadasJ1(0)
          setRondasGanadasJ2(0)
          console.log('El j1 gano la parda con vale 4')
            }
        else{
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 1')
        setPuntosJ1(puntosj1+1)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        }
    }
    else if(rondaActual===3 && rondasGanadasJ1 === 0 && rondasGanadasJ2 === 1){
        if(aceptarTruco){
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+2)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('El j2 gano la parda con truco')
        }
        else if(aceptarReTruco){
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+3)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        console.log('El j2 gano la parda con retruco')
          }
        else if(aceptarValeCuatro){
          setPartidaTerminada(true)
          setGanadorPartida('Jugador 2')
          setPuntosJ2(puntosj2+4)
          setRondasGanadasJ1(0)
          setRondasGanadasJ2(0)
          console.log('El j2 gano la parda con vale4')
        }
        else{
        setPartidaTerminada(true)
        setGanadorPartida('Jugador 2')
        setPuntosJ2(puntosj2+1)
        setRondasGanadasJ1(0)
        setRondasGanadasJ2(0)
        }
    }
     else{
      setMsg('')
    }
  
   
  },[jugadaIA,jugada,turno,cartaJ1EnMesa, cartaJ2EnMesa,rondasGanadasJ1, rondasGanadasJ2, rondaActual, ganadorPartida, setGanadorPartida, puntosj1, puntosj2])

  useEffect(()=>{
    if(cartaJ1EnMesa.length>0 && cartaJ2EnMesa.length>0){
      manejarJugada()
    }
  },[cartaJ2EnMesa,cartaJ1EnMesa])
  useEffect(()=>{
    if(ganadorPartida){
      setPartidaTerminada(true)
      setTipoEnvido(null)
      setPreguntaVisible(false)
    }
  },[ganadorPartida])
  useEffect(()=>{
    if(puntosj1>=30){
      setGanadorJuego('Jugador 1')
      setPartidaTerminada(true)
      setTipoEnvido(null)
      setPreguntaVisible(false)
    }else if(puntosj2>=30){
      setGanadorJuego('Jugador 2')
      setPartidaTerminada(true)
      setTipoEnvido(null)
      setPreguntaVisible(false)
    }
  },[puntosj1, puntosj2])

      
      function calcularGanadorCarta(cartaJ1, cartaJ2) {
        if (cartaJ1.jerarquia < cartaJ2.jerarquia) {
          return 'Jugador 1';
        } else if (cartaJ1.jerarquia > cartaJ2.jerarquia) {
          return 'Jugador 2';
        }
        return 'Empate';
      }
      
      function seleccionarCartaIA(cartas) {
        
        return cartas.sort((a, b) => a.jerarquia - b.jerarquia)[0];
      }
      
      
      

      

      return{partidaTerminada, puntosj1, puntosj2, rondasGanadasJ1, rondasGanadasJ2, setJugadorInicial, manejarReparto, turno, ganadorPartida, rondaActual, cartaJugadaJ1, cartaSeleccionadaJ1,cartaSeleccionadaJ2,cartasJugadas, manejarJugada, msg, setCartaSeleccionadaJ1, jugador1, jugador2, jugadorInicial,
        trucoCantado, aceptarTruco, manejarCantoTrucoJ1, manejarRespuestaTruco, preguntaVisible,
        reTrucoCantado, aceptarReTruco, manejarRespuestaReTruco, preguntaReTrucoVisible,
        valeCuatroCantado, aceptarValeCuatro, manejarRespuestaValeCuatro, preguntaValeCuatroVisible,
        envidoMsg,preguntaEnvidoVisible, manejarRespuestaEnvido,tipoEnvido, envidoCantado, manejarEnvido,aceptarEnvido,
        envidoGanador, envidoJugador1, envidoJugador2, ganadorJuego, reiniciarJuego

      }

}