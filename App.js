import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import MealDetailScreen from './screens/MealDetailScreen' ;
import MealsOverviewScreen from './screens/MealsOverviewScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName='CategoriesScreen'>
        <Stack.Screen name='CategoriesScreen' component={CategoriesScreen}/>
        <Stack.Screen name='FavouriteScreen' component={FavouriteScreen}/>
        <Stack.Screen name='MealsOverviewScreen' component={MealsOverviewScreen}/>
        <Stack.Screen name='MealDetailScreen' component={MealDetailScreen}/>
      </Stack.Navigator>
      
    }</NavigationContainer>
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
