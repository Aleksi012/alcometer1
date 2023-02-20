import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, useColorScheme, Switch, StyleSheet } from 'react-native';
import NumericInput from 'react-native-numeric-input';



const AlcoholMeter = () => {

  const [bac, setBac] = useState(0);
  const [drinks, setDrinks] = useState(0);
  const [weight, setWeight] = useState(0);
  const [time, setTime] = useState(0);
  const [gender, setGender] = useState('male');
  const [isEnabled, setIsEnabled] = useState(false);
  

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  const handleSubmit = () => {
    let bacPercentage;
    if (gender === 'male') {
      bacPercentage = (drinks * 0.33 * 8 * 4.5 - ( weight / 10 ) * time) / (weight * 0.7)
    } else {
      bacPercentage = (drinks * 0.33 * 8 * 4.5 - ( weight / 10 ) * time) / (weight * 0.6)
    }

    if (bacPercentage < 0) {
      bacPercentage = 0
    }

    if (weight == "") { 
      Alert.alert(
        "Error",
        "Please enter weight",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );}
    
    setBac(bacPercentage.toFixed(2));
  };

  return (
    <ScrollView style={ [styles.container, isEnabled ? {backgroundColor : '#333333' } : {backgroundColor: '#fff'} ]}>

      <Switch style={styles.theme}
        trackColor={{false: 'black', true: 'black'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Text style={styles.header}>Alcohol Meter</Text>
      <Text style={styles.text}>Drinks</Text>
      <NumericInput style={styles.numericInput} onChange={e => setDrinks(e)} />
      <Text style={styles.text}>Weight</Text>
      <NumericInput style={styles.numericInput} onChange={e => setWeight(e)} />
      <Text style={styles.text}>Hours</Text>
      <NumericInput style={styles.numericInput} onChange={e => setTime(e)} />
      <Text style={styles.text}>Gender</Text>
      <TextInput
        placeholder="Gender (male or female)"
        value={gender}
        onChangeText={(e) => setGender(e)}
      />
      <Button title="Calculate" onPress={handleSubmit} />
      <Text>Your alcohol level is: {bac}%</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: 'black',
  },

  text: {
    fontSize: 25,
    textAlign: 'center',
    
  },

  header: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 10
  },

  numericInput: {
    
  },
})

export default AlcoholMeter;
