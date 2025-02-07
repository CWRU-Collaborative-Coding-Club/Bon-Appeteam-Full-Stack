import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProgressTrackerScreen from './ProgressTracker';
import ProfileScreen from './ProfileScreen';
import MealSwipesScreen from './MealSwipes';
import RecommendationsScreen from './RecommendationsScreen';
import SignUp from './SignUp';
import Login from './Login';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { ProgressProvider } from './ProgressContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: styles.white.color,
            tabBarInactiveTintColor: styles.white.color,
            tabBarActiveBackgroundColor: styles.darkblue.color,
            tabBarInactiveBackgroundColor: styles.blue.color,
        }}>
            <Tab.Screen name="Recommendations" component={RecommendationsScreen}
                        options={{
                            tabBarLabel: 'Recommendations',
                            tabBarIcon: () => (
                                <Ionicons name="map-outline" color={styles.white.color} size={24} />
                            ),
                        }} />
            <Tab.Screen name="Progress Tracker" component={ProgressTrackerScreen}
                        options={{
                            tabBarLabel: 'Progress',
                            tabBarIcon: () => (
                                <Ionicons name="checkmark-circle-outline" color={styles.white.color} size={24} />
                            ),
                        }} />
            <Tab.Screen name="Meal Swipes" component={MealSwipesScreen}
                        options={{
                            tabBarLabel: 'Meal Swipes',
                            tabBarIcon: () => (
                                <Ionicons name="reader-outline" color={styles.white.color} size={24} />
                            ),
                        }} />
            <Tab.Screen name="Personal Info" component={ProfileScreen}
                        options={{
                            tabBarLabel: 'Info',
                            tabBarIcon: () => (
                                <Ionicons name="person-outline" color={styles.white.color} size={24} />
                            ),
                        }} />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <ProgressProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </ProgressProvider>
    );
}

export default App;