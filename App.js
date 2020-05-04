import React,{useState,useEffect} from 'react';
import { StyleSheet, Image,View, ScrollView,ActivityIndicator } from 'react-native';
import Header from "./components/header"
import Formulario from "./components/Formulario"
import Cotizacion from "./components/Cotizacion"
import axios from "axios"

const App = () => {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [consularApi, guardarConsultarApi] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [cargando,guardarCargando]= useState(false)

   useEffect(()=>{
     const cotizarCriptomoneda = async()=>{
      if(consularApi){
        // consultar API para obtener la cotizacion
        const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url)

        guardarCargando(true)
       // Ocultar el spinner y mostrat el resultado
       setTimeout(()=>{
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
        guardarConsultarApi(false)
        guardarCargando(false)
       },3000)
      }
     }
     cotizarCriptomoneda()
  },[consularApi])

  // mostrat el spinner o el resultado 

  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2"/> :  <Cotizacion resultado={resultado}/>
  return (
    <>
    <ScrollView>
      <Header></Header>
      <Image 
      style={styles.imagen}
      source={require("./assets/img/cryptomonedas.png")}
      />
      <View style={styles.contenido}>
    
          <Formulario 
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarMoneda={guardarMoneda}
          guardarConsultarApi={guardarConsultarApi}

          />
        


      </View>
      <View style={{marginTop:40}}>

        {componente}

      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({

  imagen : {
    width:"100%",
    height:120,
    marginHorizontal : "2.5%"
  },
  contenido:{
    marginHorizontal:"2.5%"
  }
 
});

export default App
