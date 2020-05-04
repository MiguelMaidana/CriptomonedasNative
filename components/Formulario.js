import React, {useState,useEffect} from "react"
import * as Font from "expo-font"
//import {Picker} from "@react-native-community/picker"
import {Text, View, StyleSheet,Picker } from "react-native"

const Formulario =()=>{
   
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [moneda, guardarMoneda] = useState("");
    const [criptomoneda, guardarCriptomoneda] = useState("");

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
    const obtenerMoneda =(moneda)=>{
        guardarMoneda(moneda)
    }

                    return (
                        <View>
                            <Text style={styles.label}>Moneda</Text>
                           <Picker
                           selectedValue={moneda}
                             onValueChange={moneda => obtenerMoneda(moneda)}
                           >
                               <Picker.Item label="-Seleccione-" value=""/>
                               <Picker.Item label="-Dolar de Estados Unidos" value="USD"/>
                               <Picker.Item label="-Peso Mexicano" value="MXN"/>
                               <Picker.Item label="-Euro" value="EUR"/>
                               <Picker.Item label="-Libra Esterlina" value="GBP"/>

                           </Picker>
                            <Text style={styles.label}>Criptomoneda</Text>
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