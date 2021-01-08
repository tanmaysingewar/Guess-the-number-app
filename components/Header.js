import React from 'react'
import { View, StyleSheet , Text, Platform} from 'react-native'
import color from '../Constants/color'
import TitleText from './TitleText'

const Header = (props) => {
    return (
       <View style={{...styles.headerBase,...Platform.select({ios : styles.headerIOS, android : styles.headerAndroid})}}>
           <TitleText style={styles.title} >{props.title}</TitleText>
       </View>
    )
}

const styles = StyleSheet.create({
    headerBase : {
        width : '100%',
        height : 90,
        paddingTop : 36,
        alignItems : 'center',
        justifyContent : 'center',
      },
    headerIOS : {
        backgroundColor : 'white',
        borderBottomColor : '#ccc' ,
        borderWidth :  1 
    },
    headerAndroid :{
        backgroundColor :  color.primary ,
    },
    title : {
        color : Platform.OS === 'ios' ? color.primary : 'white'
    }
})

export default Header
