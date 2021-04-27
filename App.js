import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      word: '',
      definition: "",
      lexicalCategory: '',
      examples:[],
      word: "",
      isSearchPressed: false,
    };
  }

  getWord=(word)=>{
    var searchKeyword=word.toLowerCase().trim()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
  }

  getWordAndSetState = (word) => {
    this.getWord(word).then((response)=> {
      var responseObject = response
      if (responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype
        this.setState({
          "word":this.state.text,
          "definition": definition,
          "lexicalCategory": lexicalCategory,
        })
      }
      else{
        this.setState({
          "word": this.state.text,
          "definition": "Not Found",
        })
      }

    });
  }

  render() {
    return (
      <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ 
              text: text,
              isSearchPressed: false,
              word: "Loading...",
              lexicalCategory: "",
              examples: [],
              definition: "",
             });
          }}
          value={this.state.text}
        />   

        <TouchableOpacity
          style={styles.searchButton}
          onPress={()=>{
            this.setState({ isSearchPressed: true })
            this.getWordAndSetState(this.state.text);
          }}>
            <Text style = {styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <View style = {styles.wordContainer}>
          <Text style = {styles.buttonText}>Word:{" "}</Text>
          <Text style ={{fontSize:33}}>{this.state.word}</Text>
        </View>
        <View style = {styles.wordContainer}>
          <Text style = {styles.buttonText}>Type:{" "}</Text>
          <Text style ={{fontSize:33}}>{this.state.lexicalCategory}</Text>
        </View>
        <View style = {styles.wordContainer}>
          <Text style = {styles.buttonText}>Definition:{" "}</Text>
          <Text style ={{fontSize:33}}>{this.state.definition}</Text>
        </View>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  wordContainer: {
    flex:1,
    flexDirection: 'row',
  }
});
