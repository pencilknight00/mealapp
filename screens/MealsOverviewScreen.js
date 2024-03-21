import { View, Text, FlatList, StyleSheet, Pressable, ImageBackground, Platform, useWindowDimensions} from "react-native"; //this
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEALS } from '../data/dummy-data';
import { CATEGORIES } from '../data/dummy-data';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useState, useEffect } from "react";


const MealsOverviewScreen = ({ route, navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [columnsCount, setColumnsCount] = useState('1')
    
    useEffect(() => {
        
        loadFavorites();
    }, []);

    useEffect(() => {
        if(windowWidth < 500){
            setColumnsCount('1');
        } else {
            setColumnsCount('2');
        }
        
    }, [windowHeight]);

    const loadFavorites = async () => {
        try {
            const favoritesString = await AsyncStorage.getItem('favorites');
            if (favoritesString) {
                setFavorites(JSON.parse(favoritesString));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const toggleFavorite = async mealId => {
        const index = favorites.findIndex(item => item === mealId);
        if (index === -1) {
            const updatedFavorites = [...favorites, mealId];
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            console.log(favorites + "+ 1")
        } else {
            const updatedFavorites = favorites.filter(item => item !== mealId);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            console.log(favorites + "- 1")
        }

    };

    // Function to check if a meal is favorite
    const isFavorite = mealId => {
        return favorites.includes(mealId);
    };
    
    const categoryId = route.params.category;
        function filterMealsByCategoryId(categoryId) {
            return MEALS.filter(meal => meal.categoryIds.includes(categoryId));
        }
        const mealsFiltered = filterMealsByCategoryId(categoryId);

        function findCategoryTitle(categoryId) {
            const category = CATEGORIES.find(cat => cat.id === categoryId);
            return category ? category.title : 'Uncategorized';
        }

        
    return (
        <View style={[styles.container, {paddingTop: (Platform.OS === 'ios') ? (windowWidth < 500 ? 35 : 0) : 25,}]}>
            <FlatList data={mealsFiltered}
            key={columnsCount}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={columnsCount}
            keyExtractor={item => `${columnsCount}${item.id}`}
            renderItem={({ item }) => (
                <View style={styles.shadow}> 
                 <Pressable onPress={() => {navigation.navigate('MealDetailScreen', {meal: item})}}>
                    <ImageBackground source={{uri: item.imageUrl}} style={styles.mealContainer}>
                        <Pressable onPress={() => toggleFavorite(item.id)} style={styles.favoriteIcon}>
                            <FontAwesome name={isFavorite(item.id) ? 'heart' : 'heart-o'} size={20} color="pink" />
                        </Pressable>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.MealTitle}>{item.title}</Text>
                            <View style={styles.categories}>
                                <FontAwesome6 name="list-ul" size={15}></FontAwesome6>
                                {item.categoryIds.map(categoryId => (
                                    
                                    <Text key={categoryId} style={styles.categoryTitle}>
                                    {findCategoryTitle(categoryId)}
                                    </Text>
                                ))}
                            </View>
                            <View style={styles.detailsContainer}>
                                <FontAwesome6 style={styles.detailIcon} name="money-check-dollar" size={15}></FontAwesome6>
                                <Text style={styles.detailText}>{item.affordability}</Text>
                                <FontAwesome6 style={styles.detailIcon} name="clock" size={15}></FontAwesome6>
                                <Text style={styles.detailText}>{item.duration} min</Text>
                                <FontAwesome6 style={styles.detailIcon} name="chart-simple" size={15}></FontAwesome6>
                                <Text style={styles.detailText}>{item.complexity}</Text>
                            </View>
                            
                        </View>
                    </ImageBackground>
                </Pressable>
                </View>
             )}>

            </FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: (Platform.OS === 'ios') ? 35 : 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 9,
        zIndex:999,
    },
    mealContainer: {  
        margin: 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 9,
        zIndex:999,
        
        backgroundColor: 'white',
        overflow: 'hidden',

      justifyContent: 'flex-end',
      borderRadius: 4,
      resizeMode: 'stretch',
      width: 350,
      height: 240,
      
    },
    favoriteIcon:{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: 'white'
    },
    MealTitle: {
        color: 'black',
        fontWeight: '800',
        fontSize: 23,
    },
    categoryContainer:{
        // marginHorizontal: 10,
        
        maxHeight: 170,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: 'white',
        padding: 10
    },
    mealInfo:{
        
    },
    categoryTitle:{

    },
    categories: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
        
    },
    categoryTitle: {
        color: 'gray',
        marginHorizontal: 5,
        fontWeight: '400'
    },
    detailsContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    detailIcon:{
        marginRight: 5,
        color: 'gray',
    },
    detailText: {
        marginRight: 20,
        color: 'gray',
    }
  });

export default MealsOverviewScreen;