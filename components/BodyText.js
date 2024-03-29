import React from 'react'
import { StyleSheet, Text } from 'react-native'

const BodyText =(props) => <Text style={{...styles.text, ...props.style}}>{props.children}</Text>

const styles = StyleSheet.create({
    text : {
        fontFamily : 'open-sans-bold'
    }
})
export default BodyText
