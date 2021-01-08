import React,{useState,useRef,useEffect } from 'react'
import { StyleSheet, Text, View , Alert, Dimensions, FlatList} from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../Constants/default-Style-sheet'
import MainButton from '../components/MainButton'
import color from '../Constants/color'
import { AntDesign } from '@expo/vector-icons'
import BodyText from '../components/BodyText'
import ScreenOrientation from 'expo-screen-orientation'
const generateRandomBetwen = (min, max , exclude) =>{
    min = Math.ceil(min)
    max= Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if(rndNum === exclude){
        return generateRandomBetwen(min ,max, exclude)
    }
    return rndNum
}

const GameSceen =(props) => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    const initialGuess= generateRandomBetwen(1,100,props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const [alignments, setAlignments] = useState(Dimensions.get('window').height < 500 ? true : false)

    const { userChoice, onGameOver } = props
    useEffect(() => {
        if(currentGuess === props.userChoice){
            props.onGameOver(pastGuesses.length)
        }
    }, [currentGuess,userChoice, onGameOver])

    useEffect(() => {
        const updateLayout = () =>{
            Dimensions.get('window').height < 500 ?setAlignments(true) : setAlignments(false)
            
        }
        Dimensions.addEventListener('change', updateLayout)
        return () =>{
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const nextGuesshandler = (direction) =>{
        if(currentGuess === props.userChoice){
            return;
        }
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            return Alert.alert('Don\'t lie!','You know that is wrong...',[
               {text: 'Sorry!',style : 'cancel'}
           ]) 
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }else{
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetwen(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setPastGuesses(curPastGuesser => [nextNumber,...curPastGuesser])
    }

    const renderListitems= (listLength, itemData) =>{
    return  <View  style={styles.listItem}>
                <BodyText>#{listLength - itemData.index}</BodyText>
                <BodyText>{itemData.item}</BodyText>
            </View>
    }
    let buttonAlignment ;
    if(alignments){
        buttonAlignment =<View style={styles.controls}>
        <MainButton style={{backgroundColor : color.accent}} onPress={nextGuesshandler.bind(this,'lower')}>
            <AntDesign name="caretdown" size={24} color="black" />
        </MainButton>
    <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuesshandler.bind(this,'greater')}>
            <AntDesign name="caretup" size={24} color="black" />
        </MainButton>
        </View>
    }else{
        buttonAlignment =<>
        <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.ButtonContainer}>
                <MainButton style={{backgroundColor : color.accent}} onPress={nextGuesshandler.bind(this,'lower')}>
                    <AntDesign name="caretdown" size={24} color="black" />
                </MainButton>
                <MainButton onPress={nextGuesshandler.bind(this,'greater')}>
                    <AntDesign name="caretup" size={24} color="black" />
                </MainButton>
            </Card>
        </>
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Oppenent's Guess</Text>
            {buttonAlignment}
            <View style={styles.listContiner}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListitems(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListitems.bind(this, pastGuesses.length )} 
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 10,
        alignItems : 'center'
    },
    ButtonContainer:{
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginTop : Dimensions.get('window').height > 600 ? 20 : 5 ,
        width : 300,
        maxWidth : '80%'
    },
    listItem : {
        borderColor : '#ccc',
        borderWidth : 1,
        padding : 15,
        marginVertical : 10,
        backgroundColor  : 'white',
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '100%'
    },
    listContiner : {
        flex : 1,
        width : Dimensions.get('window').width > 350 ? '60%' : '80%',

    },
    list : {
        flexGrow : 1,
        // alignItems : 'center',
        justifyContent : 'flex-end'
    },
    controls : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        width : '80%',
        alignItems : 'center'
    }
})
export default GameSceen