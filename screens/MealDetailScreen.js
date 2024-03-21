import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet, Dimensions, Platform, useWindowDimensions} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

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
    const screenDimensions = Dimensions.get('screen');

const MealDetailScreen = ( { route }) => {
     const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [dimmensions, setDimensions] = useState({
        screen: screenDimensions
      });
    const { meal } = route.params;

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change', 
          ({window, screen}) => {
            setDimensions({window, screen});
          })
    
          return () => subscription?.remove;
      })


      return (
        <View style={[styles.container, {paddingTop: (Platform.OS === 'ios') ? (windowWidth < 500 ? 35 : 0) : 25,}]}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
           <View style={[styles.imageContentContainer, {minHeight: windowHeight / 2.2,}]}>
            <View style={{minHeight: 400}}><Image source={{ uri: meal.imageUrl }} style={[styles.pic, {width: windowWidth < 500 ? windowWidth : 600,height: windowWidth < 500 ? null : 300}]}></Image></View>
                
                <View style={[styles.content, { width: 300, top:  windowWidth < 500 ? 210 : 200}]}>
                <Text style={styles.title}>{meal.title}</Text>
                        <View style={[styles.boolean, {width: windowWidth / 1.5,}]}>
                            <View style={styles.booleanContainer}>
                                <Text><Text style={{fontWeight: 'bold'}}>Glutenfree:</Text> {meal.isGlutenFree ? "yes" : "no"}</Text>
                                <Text><Text style={{fontWeight: 'bold'}}>Vegan:</Text> {meal.isVegan ? "yes" : "no"}</Text>
                            </View >
                            <View style={styles.booleanContainer}>
                                <Text><Text style={{fontWeight: 'bold'}}>Vegetarian:</Text> {meal.isVegetarian ? "yes" : "no"}</Text>
                                <Text><Text style={{fontWeight: 'bold'}}>LactoseFree:</Text> {meal.isLactoseFree ? "yes" : "no"}</Text>
                            </View>
                            
                        </View>
                </View>
                
            </View>
                <View style={[styles.detailsContainer, {width: windowWidth * 0.9,}]}>
                <Text style={styles.sectionTitle}>Duration: </Text>   
                    
                    <Text style={styles.detailText}>{meal.duration}min</Text>    
                </View>
                <View style={[styles.ingredientsContainer, {width: windowWidth * 0.9,}]}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                        
                        {meal.ingredients.map((step, index) => (
                            <View style={styles.ingredientEach} key={index}>
                                <FontAwesome6 name="circle-plus" size={16}></FontAwesome6>
                                <Text key={index} style={styles.listItem}>{` ${step}`}</Text>
                            </View>
                ))}
                </View>
                <View style={[styles.stepsContainer,{width: windowWidth * 0.9,}]}>
                    <Text style={styles.sectionTitle}>Steps</Text>
                    {meal.steps.map((step, index) => (

                            <Text key={index} style={styles.listItem}>{`${index + 1}. ${step}`}</Text>
                ))}
                </View> 
                </ScrollView>               
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: (Platform.OS === 'ios') ? 35 : 25,
        // alignItems: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    content: {
        backgroundColor: 'white',
        
        padding: 10,
        alignSelf: 'center',
        borderRadius: 30,
        position: 'absolute',
        

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 9,
        zIndex: 999,

    },
    imageContentContainer:{
        alignItems: 'center',
        
    },
    boolean:{
        margin: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        
        
        alignSelf: 'center',
        borderRadius: 10,
        
    },
    booleanContainer:{
        margin: 10,
    },
    // shadow: {
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 6,
    //     },
    //     shadowOpacity: 0.27,
    //     shadowRadius: 4.65,
    //     elevation: 9,
    //     zIndex:999,
    // },
    title: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: '800',
        alignSelf: 'center'
    },
    pic:{
        
        resizeMode: 'stretch',
        alignSelf: 'center',
        aspectRatio: 1.4,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    sectionTitle:{
        fontSize: 30,
        fontWeight: '800',
        margin: 5,
    },
    listItem:{
        fontSize:18,
        margin: 5
    },
    ingredientEach: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ingredientsContainer:{
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        
        alignSelf: 'center'
    },
    stepsContainer:{
        marginBottom:40,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        
        alignSelf: 'center'
    },
    detailsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center'
    },
    detailText:{
        fontSize: 30
    }
});

export default MealDetailScreen;