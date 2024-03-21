import { View, Text, StyleSheet, Button, FlatList, Pressable, Platform, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from '../data/dummy-data';
import FontAwesome from '@expo/vector-icons/FontAwesome'


const CategoriesScreen = ({ navigation }) => {
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesString = await AsyncStorage.getItem('favorites');
                if (favoritesString) {
                    const favoritesData = JSON.parse(favoritesString);
                    setFavorites(favoritesData);
                }
                console.log(windowWidth)
                console.log(windowHeight)
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);
    return (
        <View style={[styles.container, {paddingTop: (Platform.OS === 'ios') ? (windowWidth < 500 ? 35 : 0) : 20,}]} >
            
            <View style={styles.flatlistContainer}>
            <FlatList data={CATEGORIES}
            numColumns='2'
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={ ({ item }) => (<Pressable onPress={() => {navigation.navigate('MealsOverviewScreen', {category: item.id})}} style={[styles.categoriesContainer, {backgroundColor: item.color, width: windowWidth < 500 ? '45%' : '47.5%',}]}>
                <Text style={styles.categoryTitle}>{item.title}</Text>
            </Pressable>)}>
                
            </FlatList>
            </View>
            <Pressable style={styles.favourites} onPress={() => {navigation.navigate('FavouriteScreen', { favorites: favorites });
                }}>
                   <FontAwesome name={'heart'} size={30} color="pink" /> 
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
    },
    categoriesContainer:{  
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
        margin: 20,
        borderRadius: 10,
        width: 60,
        backgroundColor: 'white',
        position: 'absolute',
        top: (Platform.OS === 'ios') ? 35 : 20,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

export default CategoriesScreen;