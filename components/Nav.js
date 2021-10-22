import React,{Component} from 'react'
import { Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'
//components
import DecksList from './DecksList'
import AddDeck from './AddDeck'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'

const Tab= Platform.OS==='ios'?createBottomTabNavigator():createMaterialTopTabNavigator()
const Stack= createNativeStackNavigator()

const DecksStack=()=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Decks" component={DecksList}/>
            <Stack.Screen name="Deck Detail" component={DeckDetail}/>
            <Stack.Screen name="AddCard" component={AddCard}/>
            <Stack.Screen name="Quiz" component={Quiz}/>
        </Stack.Navigator>
    )
}

export default class Nav extends Component {
    render(){
        return(
            <NavigationContainer>
                <Tab.Navigator
                        screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {

                            if (route.name === 'Decks') {
                                return <MaterialCommunityIcons name="credit-card-multiple" size={35} color={color} />
                            } 
                            else if (route.name === 'Add Deck') {
                                return <MaterialCommunityIcons name="credit-card-plus" size={35} color={color} />
                            }

                        },
                        tabBarActiveTintColor: 'black',
                        tabBarInactiveTintColor: 'gray',
                        })}
                    >
                    <Tab.Screen name="Decks" component={DecksStack}/>
                    <Tab.Screen name="Add Deck" component={AddDeck}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
