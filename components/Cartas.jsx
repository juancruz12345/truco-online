import { Card, Image } from "react-bootstrap";

export function Carta({ carta, seleccionada, onClick, idCardPlayer }) {
    return (
      <Card
        className={`${seleccionada ? 'seleccionada' : ''}`}
        onClick={onClick}
        id={idCardPlayer ? 'cartaPlayer' : ''}
      >
     
      <Image className="img-carta" src={carta?.src}></Image>
        
      </Card>
    );
  }

  export function CartaTapada({ carta }) {
    return (
      <Card
        className="carta-tapada"
      >
        <Image src='./mazo/reves.png'></Image>
         
        
      </Card>
    );
  }


