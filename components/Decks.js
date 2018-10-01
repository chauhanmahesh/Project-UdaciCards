import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import GridView from 'react-native-super-grid';
import {connect} from 'react-redux';
import {fetchExistingDecks} from '../utils/storageHelper';
import {receiveDecks} from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import {getNumberOfCardsSuffix} from '../utils/genericUtils';

class Decks extends Component {
    state = {
        fetchingDecks: true
    }

    componentDidMount() {
        const {dispatch} = this.props
        // Let's fetch existing decks.
        fetchExistingDecks().then((decks) => {
            dispatch(receiveDecks(decks))
            // Let's set fetchDecks to false as we got the decks now.
            this.setState(() => ({fetchingDecks: false}))
        })
    }

    render() {
        const {fetchingDecks} = this.state
        if (fetchingDecks === true) {
            return (
                <View style={{
                    flex: 1
                }}>
                    <Spinner
                        visible
                        textContent={"Fetching Decks..."}
                        textStyle={{
                        color: 'black'
                    }}/>
                </View>
            )
        }

        // Let's get decks coming from store.
        const {decks} = this.props
        const decksArray = Object.values(decks)
        return (<GridView
            items={decksArray}
            renderItem={deck => (
            <TouchableOpacity
                style={styles.deckContainer}
                onPress={() => this.props.navigation.navigate('DeckDetail', {deckId : deck.title})}>
                <View style={styles.deckCardsCountContainer}>
                    <Text style={styles.deckCardCount}>{deck.questions.length}</Text>
                    <Text style={styles.deckCardLabel}>{getNumberOfCardsSuffix(deck.questions.length)}</Text>
                </View>
                <Text style={styles.deckName}>{deck.title}</Text>
            </TouchableOpacity>
        )}/>);
    }
}

const styles = StyleSheet.create({
    deckContainer: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        height: 150,
        backgroundColor: '#87d9aa'
    },
    deckCardsCountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckName: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600'
    },
    deckCardCount: {
        fontWeight: '500',
        fontSize: 35,
        color: '#fff'
    },
    deckCardLabel: {
        fontSize: 15,
        color: '#fff'
    }
});

function mapStateToProps(decks) {
    return {decks}
}

export default connect(mapStateToProps)(Decks)