import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';

import  Header  from './components/Header';
import GameOverScreen from './Screen/GameOverScreen';
import GameSceen from './Screen/GameSceen';
import StartGameScreen from './Screen/StartGameScreen';

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans' : require ('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require ('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setguessRounds] = useState(0)

  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)}
    onError={(err)=> console.log(err)}
    />
  }

  const configureNewGameHandler =() =>{
    setguessRounds(0)
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) =>{
    setUserNumber(selectedNumber)
    setguessRounds(0)
  }

  const gameOverHandler = (numOfRounds) =>{
    setguessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if(userNumber && guessRounds<= 0){
    content =  <GameSceen userChoice={userNumber} onGameOver={gameOverHandler} />
  }else if(guessRounds > 0){
    content =  <GameOverScreen  roundNumber={guessRounds}  userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }
  return (
    <View style={styles.screen}>  
      <Header title="Guess the number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen : {
    flex : 1
  }
});
