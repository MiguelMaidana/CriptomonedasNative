import React ,{useState,useEffect}from "react"
import * as Font from "expo-font"
import {Text, StyleSheet, Platform, View} from "react-native"

const Header =()=>{
    const [fontsLoaded, setFontsLoaded] = useState(false)

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


    return (

    <Text style={styles.encabezado}>Criptomonedas</Text>
    )
}

const styles = StyleSheet.create({
    encabezado:{
        paddingTop : Platform.OS ==="ios" ? 50 :10,
        fontFamily : "lato-black",
        backgroundColor : "#5E49E2",
        paddingBottom :10,
        textAlign : "center",
        textTransform : "uppercase",
        fontSize :20,
        color:"#FFF",
        marginBottom:30

       
        
    }
})

export default Header