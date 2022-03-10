import React from 'react';

// Screens
import ProgramsList from './app/screens/ProgramsList';
import TracksList from './app/screens/TracksList';

// Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Programs'}>
        <Stack.Screen name="Programs" component={ProgramsList} />
        <Stack.Screen name="Tracks" component={TracksList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
