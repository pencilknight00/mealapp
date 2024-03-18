import { View, Text, FlatList, StyleSheet, Pressable, ImageBackground } from "react-native";
import { MEALS } from '../data/dummy-data';
import { CATEGORIES } from '../data/dummy-data';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
const MealsOverviewScreen = ({ route, navigation }) => {
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
        <View style={styles.container}>
            <FlatList data={mealsFiltered}
            numColumn='1'
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({ item }) => (
                 <Pressable onPress={() => {navigation.navigate('MealDetailScreen', {meal: item})}}>
                    <ImageBackground source={{uri: item.imageUrl}} style={styles.mealContainer}>
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
             )}>

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
        backgroundColor: 'white',
        overflow: 'hidden',
      justifyContent: 'flex-end',
      borderRadius: 4,
      resizeMode: 'stretch',
      width: 350,
      height: 240,
      
    },
    MealTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 23,
    },
    categoryContainer:{
        // marginHorizontal: 10,
        
        maxHeight: 130,
        
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