import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

    //     meal: {
    //     id,
    //     categoryIds,
    //     title,
    //     affordability,
    //     complexity,
    //     imageUrl,
    //     duration,
    //     ingredients,
    //     steps,
    //     isGlutenFree,
    //     isVegan,
    //     isVegetarian,
    //     isLactoseFree
    //     }
    
const MealDetailScreen = ( { route }) => {
    const { meal } = route.params;
    return (
        <View>
            <Image source={{
          uri: meal.imageUrl
          
        }} style={styles.pic}></Image>
            <Text> {meal.steps}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pic:{
        width: 100,
        height: 100,
       
    }
});

export default MealDetailScreen;