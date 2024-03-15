import { View, Text, StyleSheet, Button } from "react-native";

ImageComponent


const CategoriesScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Categories: </Text>
            <Button title="Category: Italian" onPress={ () => {
                navigation.navigate('MealsOverviewScreen')
            }}></Button>
        </View>
    );
};

export default CategoriesScreen;