import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {lightGreen, white, blue, gray, lightGray} from '../utils/colors';
import {addCardToDeckStorage} from '../utils/storageHelper';
import {connect} from 'react-redux';
import {addCard} from '../actions';

class AddCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }

    /**
     * @description Add this new card to the deck.
     */
    handleSubmit = () => {
        const {dispatch, deckId} = this.props
        const {question, answer} = this.state
        // Let's add this question to the deck in storage.
        const cardInfo = {
            deckId,
            question,
            answer
        }
        addCardToDeckStorage({cardInfo}).then(() => {
            // Let's dispatch action to add this new deck to the store.
            dispatch(addCard(cardInfo))
        })
        this.setState({question: '', answer: ''})
    }

    /**
     * @description Checks if submit action needs to be enabled or not. This is based on the question and
     * answer input. User has to enter both question and answer before pressing on submit.
     * @returns {boolean} 'true' if this is ready to submit else 'false'.
     */
    isSubmitEnabled = () => {
        return this.state.question.trim().length > 0 && this.state.answer.trim().length > 0
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MaterialCommunityIcons name='cards' size={100} color={lightGreen}/>
                    <Text style={styles.inputLabel}>What's the question?</Text>
                    <TextInput
                        style={Platform.OS === 'ios' ? styles.inputTextiOS : styles.inputTextAndroid}
                        placeholder='Enter question'
                        placeholderTextColor='gray'
                        maxLength={100}
                        multiline={true}
                        onChangeText={(question) => this.setState({question})}
                        value={this.state.question}/>
                    <Text
                        style={[
                        styles.inputLabel, {
                            marginTop: 20
                        }
                    ]}>What's the answer?</Text>
                    <TextInput
                        style={Platform.OS === 'ios' ? styles.inputTextiOS : styles.inputTextAndroid}
                        placeholder='Enter answer'
                        placeholderTextColor='gray'
                        maxLength={200}
                        multiline={true}
                        onChangeText={(answer) => this.setState({answer})}
                        value={this.state.answer}/>
                    <TouchableOpacity disabled={!this.isSubmitEnabled()} style={[styles.action, this.isSubmitEnabled() ? styles.enabledAction : styles.disabledAction]} onPress={this.handleSubmit}>
                        <Text style={[styles.actionText, this.isSubmitEnabled() ? styles.actionTextEnabled : styles.actionTextDisabled]}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
    inputLabel: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    },
    inputTextiOS: {
        marginTop: 20,
        alignSelf: 'stretch',
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 20
    },
    inputTextAndroid: {
        marginTop: 20,
        alignSelf: 'stretch',
        padding: 5,
        fontSize: 20
    },
    action: {
        marginTop: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10
    },
    enabledAction: {
        backgroundColor: blue,
    },
    disabledAction: {
        backgroundColor: gray,
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
    return {deckId}
}

export default connect(mapStateToProps)(AddCard);