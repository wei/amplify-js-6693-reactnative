import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify, { Storage } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

function App() {
  const [testText, setTestText] = useState('Initial state')

  async function doStuff() {
    const putResult = await Storage.put('test.json', `{"text":"Hello ${new Date().toISOString()}"}`, { level: 'private', contentType: 'application/json' })
    const data = await Storage.get(`test.json`, { level: 'private', download: true })
    const text = (await new Response(data.Body).json()).text;
    console.log(text)
    setTestText(text)
  }

  return (
    <View style={styles.container}>
      <Text>{testText}</Text>
      <StatusBar style="auto" />
      <Button title="Do Stuff" onPress={doStuff}>Do Stuff</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App)