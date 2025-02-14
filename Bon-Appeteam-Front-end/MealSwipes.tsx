// MEAL SWIPES SCREEN
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
//import { db, createTables, insertMealPlanData } from './MealSwipeData';

//const MealSwipeTab = () => {
//     const [mealSwipes, setMealSwipes] = useState<MealSwipe[]>([]);
//
//     useEffect(() => {
//         // Create tables and insert meal plan data when the component mounts
//         createTables();
//         insertMealPlanData();
//
//         // Function to fetch meal swipe data from the database
//         const fetchMealSwipes = () => {
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM MealSwipe',
//                     [],
//                     (tx, results) => {
//                         const rows = results.rows;
//                         const swipes: MealSwipe[] = [];
//                         for (let i = 0; i < rows.length; i++) {
//                             swipes.push(rows.item(i));
//                         }
//                         setMealSwipes(swipes);
//                     },
//                     error => {
//                         console.error('Error retrieving meal swipe data', error);
//                     }
//                 );
//             });
//         };
//
//         // Fetch meal swipe data
//         fetchMealSwipes();
//     }, []);
//
//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={mealSwipes}
//                 keyExtractor={item => item.location}
//                 renderItem={({ item }) => (
//                     <View style={styles.item}>
//                         <Text style={styles.title}>{item.location}</Text>
//                         <Text>Remaining Swipes Today: {item.dailyLimit - item.dailyUsed}</Text>
//                         <Text>Remaining Swipes This Week: {item.weeklyLimit - item.weeklyUsed}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };
//
// export default MealSwipeTab;
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     item: {
//         padding: 10,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//});

function MealSwipes () {
    return (
        <Text>This is profile screen</Text>
    );
}

export default MealSwipes;