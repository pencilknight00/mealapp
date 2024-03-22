import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import React  from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import MealDetailScreen from './screens/MealDetailScreen' ;
import MealsOverviewScreen from './screens/MealsOverviewScreen'


const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <NavigationContainer >
      <StatusBar></StatusBar>
         <Stack.Navigator initialRouteName='CategoriesScreen' screenOptions={{headerShown: false}}>
          <Stack.Screen name='MealsOverviewScreen' component={MealsOverviewScreen}/>
          <Stack.Screen name='MealDetailScreen' component={MealDetailScreen}/>
          <Stack.Screen name='CategoriesScreen' component={CategoriesScreen}/>
          <Stack.Screen name='FavouriteScreen' component={FavouriteScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
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
