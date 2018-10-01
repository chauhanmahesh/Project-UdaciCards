import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView} from 'react-native';
import {Foundation} from '@expo/vector-icons';
import {lightGreen, white, blue, gray, lightGray} from '../utils/colors';
import {addDeckToStorage} from '../utils/storageHelper';
import {connect} from 'react-redux';
import {addDeck} from '../actions';

class AddDeck extends React.Component {
    state = {
        title: ''
    }

    /**
     * @description Add this new deck to the store and AsyncStorage as well.
     */
    handleSubmit = () => {
        const {dispatch} = this.props
        // Let's add this deck to storage.
        const key = this.state.title
        const deck = {
            title: this.state.title,
            questions: []
        }
        addDeckToStorage({deck, key}).then(() => {
            // Let's dispatch action to add this new deck to the store.
            dispatch(addDeck({
                [key]: deck
            }))
            // Let's reset the state.
            this.setState({
                title: ''
            })
            // Let's navigate to individual deck view.
            this.props.navigation.navigate('DeckDetail', {deckId: key})
        })
        
    }

    /**
     * @description Checks if the submit button is enabled or not. 
     * Submit will be enabled only if user enters the deck name.
     * @returns {boolean} 'true' if deck name exists else 'false.
     */
    isSubmitEnabled = () => {
        return this.state.title.trim().length > 0
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Foundation name='page-multiple' size={100} color={lightGreen}/>
                <Text style={styles.newDeckTitleLabel}>What's the title of new deck?</Text>
                <TextInput
                    style={Platform.OS === 'ios' ? styles.titleInputiOS : styles.titleInputAndroid}
                    placeholder='Enter deck title'
                    placeholderTextColor='gray'
                    maxLength={20}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}/>
                <TouchableOpacity disabled={!this.isSubmitEnabled()} style={[styles.action, this.isSubmitEnabled() ? styles.enabledAction : styles.disabledAction]} onPress={this.handleSubmit}>
                    <Text style={[styles.actionText, this.isSubmitEnabled() ? styles.actionTextEnabled : styles.actionTextDisabled]}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
    newDeckTitleLabel: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    },
    titleInputiOS: {
        marginTop: 20,
        alignSelf: 'stretch',
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 20
    },
    titleInputAndroid: {
        marginTop: 20,
        alignSelf: 'stretch',
        padding: 5,
        fontSize: 20
    },
    action: {
        alignSelf: 'stretch',
        marginTop: 20,
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

export default connect()(AddDeck);