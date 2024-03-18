import { View, Text, StyleSheet, Button, FlatList, Pressable } from "react-native";

import { CATEGORIES } from '../data/dummy-data';


const CategoriesScreen = ({ navigation }) => {
   

    
    return (
        <View style={styles.container}>
            <FlatList data={CATEGORIES}
            numColumns='2'
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({ item }) => (<Pressable onPress={() => {navigation.navigate('MealsOverviewScreen', {category: item.id})}} style={[styles.categoriesContainer, {backgroundColor: item.color}]}>
                <Text style={styles.categoryTitle}>{item.title}</Text>
            </Pressable>)}>

            </FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoriesContainer: {  
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
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black'
    },
  });

export default CategoriesScreen;