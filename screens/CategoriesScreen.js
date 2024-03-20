import { View, Text, StyleSheet, Button, FlatList, Pressable, Platform } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from '../data/dummy-data';


const CategoriesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesString = await AsyncStorage.getItem('favorites');
                if (favoritesString) {
                    const favoritesData = JSON.parse(favoritesString);
                    setFavorites(favoritesData);
                }
                console.log(favorites)
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);
    return (
        <View style={styles.container}>
            
            <View style={styles.flatlistContainer}>
            <FlatList data={CATEGORIES}
            numColumns='2'
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({ item }) => (<Pressable onPress={() => {navigation.navigate('MealsOverviewScreen', {category: item.id})}} style={[styles.categoriesContainer, {backgroundColor: item.color}]}>
                <Text style={styles.categoryTitle}>{item.title}</Text>
            </Pressable>)}>
                
            </FlatList>
            </View>
            <Pressable style={styles.favourites} onPress={() => {navigation.navigate('FavouriteScreen', { favorites: favorites });
                console.log(favorites)}}>
            
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        
        backgroundColor: 'white',
        paddingTop: (Platform.OS === 'ios') ? 35 : 20,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    flatlistContainer:{
       height: '100%'
    },
    categoriesContainer:{  
      width: '45%',
      height: 160,
      margin: 10,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      padding: 10,
      borderRadius: 5,
      shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
        },
    categoryTitle: {
        fontWeight: '800',
        fontSize: 25,
        color: 'black'
    },
    lifter:{
        backgroundColor: 'rgba(52, 52, 52, 0.)',

        height: 89,
    },
    favourites:{
        height: 60,
        margin: 10,
        borderRadius: 20,
        width: 60,
        backgroundColor: 'black',
        position: 'absolute',
        top: (Platform.OS === 'ios') ? 35 : 20,
        right: 0
    }
  });

export default CategoriesScreen;