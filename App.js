import React from 'react';
import {View, Text} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import UdaciCardsStatusBar from './components/UdaciCardsStatusBar';
import AddDeck from './components/AddDeck';
import Decks from './components/Decks';
import {Foundation} from '@expo/vector-icons';
import {blue, white, yellow} from './utils/colors';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import {setQuizLocalNotification} from './utils/storageHelper';

// Let's create main tabs to show. We have two main tabs
// 1. Decks -> To show a list of decks.
// 2. New Deck -> To let user create a new deck.
const MainTabs = createBottomTabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: () => <Text
                style={{
                color: white,
                alignSelf: 'center'
            }}>Decks</Text>,
            tabBarIcon: ({tintColor}) => <Foundation name='page-multiple' size={30} color={tintColor}/>
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: () => <Text
                style={{
                color: white,
                alignSelf: 'center'
            }}>Add Deck</Text>,
            tabBarIcon: ({tintColor}) => <Foundation name='plus' size={35} color={tintColor}/>
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: yellow,
        inactiveTintColor: white,
        style: {
            height: 56,
            backgroundColor: blue,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

/**
 * Creates a stack navigator to display "Decks", "DeckDetail" and "AddCard".
 */
const DeckNavigator = createStackNavigator({
    Home: {
        screen: MainTabs,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            },
            title: 'UdaciCards',
            headerForceInset: {
                top: 'never',
                bottom: 'never'
            }
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            },
            headerForceInset: {
                top: 'never',
                bottom: 'never'
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            },
            title: 'Add Card',
            headerForceInset: {
                top: 'never',
                bottom: 'never'
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            },
            title: 'Quiz',
            headerForceInset: {
                top: 'never',
                bottom: 'never'
            }
        }
    }
})

export default class App extends React.Component {
    componentDidMount() {
      // Let's setup the notification.
      setQuizLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{
                    flex: 1
                }}>
                    <UdaciCardsStatusBar/>
                    <DeckNavigator/>
                </View>
            </Provider>
        )
    }
}
