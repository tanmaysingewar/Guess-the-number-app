import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import color from '../Constants/color'


const MainButton =(props) => {
    return (
        <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.button,...props.style}}>
                <Text style={{...styles.buttonText,...props.styleText}}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor : color.primary,
        paddingVertical : 12,
        paddingHorizontal : 30,
        borderRadius : 25
    },
    buttonText : {
        color : 'white',
        fontFamily : 'open-sans',
        fontSize : 18
    },
    buttonContainer : {
        borderRadius : 25,
        overflow : 'hidden'
    }
})
export default MainButton
