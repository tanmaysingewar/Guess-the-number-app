import React from 'react'
import { View  ,StyleSheet} from 'react-native'

function Card(props) {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        shadowColor: 'black',
        shadowOffset : {width : 0, height : 1},
        shadowRadius : 0,
        shadowOpacity : 0.26,
        backgroundColor: 'white',
        elevation : 8,
        padding: 20,
        borderRadius: 10
    }
})

export default Card
