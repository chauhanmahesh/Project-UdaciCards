import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Foundation} from '@expo/vector-icons';
import {lightGreen, gray, blue, red, white, lightGray} from '../utils/colors';

class DeckDetail extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params
        return {title: `Deck detail - ${deckId}`}
    }

    /**
     * @description Navigates to 'AddCard' screen.
     */
    toAddCard = () => {
        this.props
            .navigation
            .navigate('AddCard', {deckId: this.props.title})
    }

    /**
     * @description Navigates to 'Quiz' screen.
     */
    toQuiz = () => {
        this.props
            .navigation
            .navigate('Quiz', {deckId: this.props.title})
    }

    render() {
        const {title, numCards} = this.props
        return (
            <View style={styles.container}>
                <Foundation name='page-multiple' size={100} color={lightGreen}/>
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={styles.numCards}>{numCards} {numCards > 1
                        ? 'cards'
                        : 'card'}</Text>
                <TouchableOpacity style={[styles.action, styles.addCardActionEnabled]} onPress={this.toAddCard}>
                    <Text style={[styles.actionText, styles.actionTextEnabled]}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.action, numCards > 0 ? styles.startQuizActionEnabled: styles.disabledAction]} onPress={this.toQuiz} disabled={numCards === 0}>
                    <Text style={[styles.actionText, numCards > 0 ? styles.actionTextEnabled : styles.actionTextDisabled]}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckTitle: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    },
    numCards: {
        fontSize: 20,
        color: gray,
        textAlign: 'center'
    },
    action: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        padding: 10
    },
    startQuizActionEnabled: {
        backgroundColor: red,
    },
    disabledAction: {
        backgroundColor: gray,
    },
    addCardActionEnabled: {
        backgroundColor: blue,
    },
    actionText: {
        fontSize: 20,
    },
    actionTextEnabled: {
        color: white
    },
    actionTextDisabled: {
        color: lightGray
    }
})

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params
    const deck = state[deckId]
    return {title: deck.title, numCards: deck.questions.length}
}

export default connect(mapStateToProps)(DeckDetail);