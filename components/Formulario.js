import React, {useState,useEffect} from "react"
import * as Font from "expo-font"
//import {Picker} from "@react-native-community/picker"
import {Text, View, StyleSheet,Picker } from "react-native"
import axios from "axios"

const Formulario =()=>{
   
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [moneda, guardarMoneda] = useState("");
    const [criptomoneda, guardarCriptomoneda] = useState("");
    const [criptomonedas, guardarCriptomonedas] = useState("");

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
    // almacena las selcciones del usuario
    const obtenerMoneda =(moneda)=>{
        guardarMoneda(moneda)
    }
    const obtenerCriptomoneda =(moneda)=>{
        guardarCriptomoneda(moneda)
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
                        </View>
                    )
}

const styles = StyleSheet.create({
    label :{
        textTransform:"uppercase",
        fontFamily : "lato-black",

        fontSize:22,
        marginVertical :20
    }
})

export default Formulario