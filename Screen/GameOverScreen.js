import React from 'react'
import { View ,Text , StyleSheet, Dimensions , Image, ScrollView } from 'react-native'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'


const  GameOverScreen = (props) => {
    return (
        <ScrollView>
        <View style={styles.screen}>
            <TitleText style={styles.title}>The Game is Over!</TitleText>
            
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                fadeDuration={1000}
                 source={require('../assets/success.png')} 
                // source={{uri : 'https://picsum.photos/200'}}
                 resizeMode='cover' />
            </View>
            <NumberContainer>{props.roundNumber}</NumberContainer>
                <BodyText style={styles.heading}>Number of rounds</BodyText>
                <NumberContainer>{props.userNumber}</NumberContainer>
                <BodyText style={styles.heading}>Your Number</BodyText>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen :{
        flex : 1,
        justifyContent : 'center',
        alignItems: 'center',
        paddingVertical : 20
    },
    image : {
        width : '100%',
        height : '100%'
    },
    imageContainer:{
        borderRadius : (Dimensions.get('window').width * 0.7) / 2,
        borderWidth : 3,
        width : Dimensions.get('window').width * 0.7,
        height : Dimensions.get('window').width * 0.7,
        borderColor : 'black',
        overflow : 'hidden',
        marginVertical : Dimensions.get('window').height / 30
    }
})

export default GameOverScreen