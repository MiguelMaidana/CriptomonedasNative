import React, {useState,useEffect} from "react"
import * as Font from "expo-font"
//import {Picker} from "@react-native-community/picker"
import {Text, View, StyleSheet,Picker, TouchableHighlight,Alert } from "react-native"
import axios from "axios"

const Formulario =({moneda,criptomoneda,guardarMoneda,guardarCriptomoneda,guardarConsultarApi})=>{
   
    const [fontsLoaded, setFontsLoaded] = useState(false)
    
    const [criptomonedas, guardarCriptomonedas] = useState([]);

    useEffect(()=>{
        const consularAPI = async () =>{
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const resultado = await axios.get(url)
            guardarCriptomonedas(resultado.data.Data)

        }
        consularAPI()
    },[])

    useEffect(()=>{
        if(!fontsLoaded){
            loadFonts()
        }
    })

    const loadFonts = async () =>{
        await Font.loadAsync({
            "lato-black" : require("../assets/fonts/Lato-Black.ttf")
        })

        setFontsLoaded(true)
    }

    if(!fontsLoaded){
        return (<View>
            <Text>No salio esta vaina</Text>
        </View>)
    }
    // Almacena las selcciones del usuario
    const obtenerMoneda =(moneda)=>{
        guardarMoneda(moneda)
    }
    
    const obtenerCriptomoneda =(moneda)=>{
        guardarCriptomoneda(moneda)
    }

    const cotizarPrecio =()=>{
        if(moneda.trim() === "" || criptomoneda.trim() === ""){
            mostrarAlerta();
            return 
        }
        // se pasa la validacion, cambiar el state de consultarApi

        guardarConsultarApi(true)
    }

    const mostrarAlerta=() =>{
        Alert.alert(
            "Error...",
            "Ambos campos son obligatorios",
            [
                {text : "OK"}
            ]
        )
    }

                    return (
                        <View>
                            <Text style={styles.label}>Moneda</Text>
                           <Picker
                            selectedValue={moneda}
                            onValueChange={moneda => obtenerMoneda(moneda)}
                            itemStyle={{height:120}}
                           >
                               <Picker.Item label="-Seleccione-" value=""/>
                               <Picker.Item label="-Dolar de Estados Unidos" value="USD"/>
                               <Picker.Item label="-Peso Mexicano" value="MXN"/>
                               <Picker.Item label="-Euro" value="EUR"/>
                               <Picker.Item label="-Libra Esterlina" value="GBP"/>

                           </Picker>

                            <Text style={styles.label}>Criptomoneda</Text>
                           
                            <Picker
                                    selectedValue={criptomoneda}
                                    onValueChange={criptomoneda => obtenerCriptomoneda(criptomoneda)}
                                    itemStyle={{height:120}}
                            >
                                    <Picker.Item label="-Seleccione-" value=""/>
                                    {criptomonedas.map(cripto =>(
                                    <Picker.Item key={cripto.CoinInfo.id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>

                                    ))}
                                    

                            </Picker>
                            <TouchableHighlight style={styles.btnCotizar} onPress={()=> cotizarPrecio()}>
                                <Text style={styles.textoCotizar}>Cotizar</Text>
                            </TouchableHighlight>
                        </View>
                    )
}

const styles = StyleSheet.create({
    label :{
        textTransform:"uppercase",
        fontFamily : "lato-black",

        fontSize:22,
        marginVertical :20
    },
    btnCotizar:{
        backgroundColor :"#5E49E2",
        padding:10,
        marginTop:20
    },
    textoCotizar:{
        color:"#FFF",
        fontSize:18,
        textAlign:"center",
        fontFamily : "lato-black",


    }
})

export default Formulario