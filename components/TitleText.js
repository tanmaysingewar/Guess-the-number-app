import React from 'react'
import { StyleSheet, Text } from 'react-native'

const TitleText =(props) => <Text style={{...styles.text, ...props.style}}>{props.children}</Text>

const styles = StyleSheet.create({
    text : {
        fontSize: 20,
        marginVertical: 10,
        fontFamily : 'open-sans-bold',
    }
})
export default TitleText