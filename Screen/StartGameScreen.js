import React,{useEffect, useState} from 'react'
import {View, Text ,StyleSheet , Button, TouchableWithoutFeedback , Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import color from '../Constants/color'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

function StartGameScreen(props) {
    const [enteredValue, setEnteredValue] = useState('')
    const [conformed, setconformed] = useState(false)
    const [selecterNumber, setselecterNumber] = useState()

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 5)

    
    useEffect(() => {
        const updateLayout = () =>{
            setButtonWidth(Dimensions.get('window').width / 5)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () =>{
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const numberInputHandler = inputText =>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }

    const resetInputHandler = () =>{
        setEnteredValue('')
        setconformed(false)
    }

    

    const confirmInputHandler =  () =>{
        const choserNumber = parseInt(enteredValue)
        if( isNaN(choserNumber) || choserNumber <= 0 || choserNumber > 99){
            Alert.alert('Invalide number', 'Number has to be number betweent 1 and 99' ,[{text: 'Okey', style : 'destructive', onPress : resetInputHandler()}])
            return;
        }
        setconformed(true)
        setselecterNumber(parseInt(enteredValue))
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let conformOutput;

    if(conformed){
        conformOutput = 
        <Card style={styles.summeryContainer}>
            <BodyText>Your selected No.</BodyText>
            <NumberContainer>{selecterNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selecterNumber)}>Start Game</MainButton>
        </Card>
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
            <TitleText>Start A New Game</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select A Number</BodyText>
                <Input style={styles.input} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} 
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={{width : buttonWidth}}>
                    <Button
                        title="Reset"
                        onPress={resetInputHandler}
                        color={color.accent}
                    />
                    </View>
                    <View style={{width : buttonWidth}}>
                    <Button
                        title="Confirm"
                        onPress={confirmInputHandler}
                        color={color.primary}
                    />
                    </View>
                </View>
            </Card>
            {conformOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 10,
        alignItems :'center'
    },
    inputContainer : {
        width : 400,
        maxWidth : '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     width: Dimensions.get('window').width / 4
    // },
    input :{
        width : 50,
        textAlign  : "center"
    },
    summeryContainer : {
        marginTop : 20,
        alignItems :'center'
    },
    text:{
        fontFamily : 'open-sans',
    }
})

export default StartGameScreen