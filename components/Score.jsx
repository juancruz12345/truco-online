
import { Taly, Taly2, Taly3, Taly4, Taly5 } from "./Icons";

export function Score({puntos}){

    const tallyGroups = Math.floor(puntos / 5)
    const resto = puntos % 5
   
    
const tallyIcons = [<Taly/>, <Taly2/>, <Taly3/>, <Taly4/>, <Taly5/>]

return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {/* Renderizar grupos completos de 5 */}
      {[...Array(tallyGroups)].map((_, i) => (
        <div key={`group-${i}`} >{tallyIcons[4]}</div>
      ))}

      {/* Renderizar los íconos restantes */}
      {resto > 0 && (
        <div >{tallyIcons[resto - 1]}</div>
      )}
    </div>
  );
}