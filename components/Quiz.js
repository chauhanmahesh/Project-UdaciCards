import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {connect} from 'react-redux';
import {gray, blue, red, white, lightGray, yellow, lightGreen} from '../utils/colors';
import CardFlip from 'react-native-card-flip';
import {Foundation} from '@expo/vector-icons';

class Quiz extends React.Component {
    state = {
        questionNo: 0,
        showingAnswer: false,
        correctAnswers: 0,
        showScorecard: false
    }

    /**
     * @description Handles the correct answer input from user.
     * We increment the correct answer counter in state and we also moves to either
     * next question or show scorecard based on whether this is the last question or not.
     */
    handleCorrectAnswer = () => {
        // Let's increase the score.
        this.setState((prevState) => ({
            correctAnswers: prevState.correctAnswers + 1
        }))
        this.moveToNextQuestionOrShowScorecard()
    }

    /**
     * @description Handles the incorrect answer input from user.
     * We either move to next question or show scorecard depends on whether this is the last question or not.
     */
    handleIncorrectAnswer = () => {
        // We don't have to increase or decrease score, let's just move to next question.
        this.moveToNextQuestionOrShowScorecard()
    }

    /**
     * @description Moves to next question or show scorecard.
     */
    moveToNextQuestionOrShowScorecard = () => {
        const {questions} = this.props.deck
        if(this.state.questionNo === questions.length - 1) {
            this.setState(() => ({
                showScorecard: true
            }))
        } else {
            this.setState((prevState) => ({
                questionNo: prevState.questionNo + 1
            }))
        }
    }

    /**
     * @description This toggles the view from question to answer or vice-versa.
     */
    toggleView = () => {
        // This means only for Android. This flips the view from Question -> Answer or Answer -> Question
        this.setState((prevState) => ({
            showingAnswer: !prevState.showingAnswer
        }))
    }

    /**
     * @description Listener for card flip ends event. This is only used in case of iOS.
     */
    onFlipEnds = (index) => {
        this.setState(() => ({
            showingAnswer: index === 1
        }))
    }

    isActionsEnabled = () => {
        return !this.state.showingAnswer
    }

    startQuizAgain = () => {
        // Let's reset the state to start the quiz again.
        this.setState(() => ({
            questionNo: 0,
            showingAnswer: false,
            correctAnswers: 0,
            showScorecard: false
        }))
    }

    renderScoreCard = () => {
        const {title, questions} = this.props.deck
        const numCards = questions.length
        const score = (this.state.correctAnswers / numCards) * 100
        return (
            <View style={styles.scorecardContainer}>
                <Foundation name='page-multiple' size={100} color={lightGreen} style={{alignSelf: 'center'}}/>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.numCards}>{numCards} {numCards > 1
                        ? 'cards'
                        : 'card'}</Text>
                    <Text style={styles.scorePercentage}>{Math.round(score)} %</Text>    
                <TouchableOpacity style={[styles.action, styles.startQuizAgain]} onPress={this.startQuizAgain}>
                    <Text style={[styles.actionText, styles.actionTextEnabled]}>Start Again</Text>
                </TouchableOpacity>        
            </View>
        )
    }

    renderQuiz = () => {
        const {questions} = this.props.deck
        // Let's get current question number.
        const {questionNo, showingAnswer} = this.state
        // Let's get the current question
        const currentQuestion = questions[questionNo]
        return (
            <View style={styles.container}>
                <Text style={styles.questionNo}>{(questionNo + 1) + '/' + questions.length}</Text>
                {
                    Platform.OS === 'ios' ? (
                        <CardFlip ref={(card) => this.card = card} onFlipEnd={this.onFlipEnds}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.card, styles.questionSide]}
                                onPress={() => this.card.flip()}>
                                <Text style={styles.question}>{currentQuestion.question}</Text>
                                <Text style={styles.revealAnswerHint}>(Tap to reveal answer)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.card, styles.answerSide]}
                                onPress={() => this.card.flip()}>
                                <Text style={styles.answer}>{currentQuestion.answer}</Text>
                            </TouchableOpacity>
                        </CardFlip>
                    ) : (
                        <View>
                            <Text style={styles.question}>{!showingAnswer ? currentQuestion.question : currentQuestion.answer}</Text>
                            <TouchableOpacity onPress={() => this.toggleView()}>
                                <Text style={styles.toggleQuestionAnswerText}>{!showingAnswer ? 'Show Answer' : 'Show Question'}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                
                <View style={styles.actionContainer}>
                    {
                        // If card is currently flipped and showing answer, then actions will be disabled.
                        // So let's user that they need to flip it before answering.
                        !this.isActionsEnabled() && (
                            <Text style={styles.flipReminder}>* Flip card before submitting answer.</Text>
                        )
                    }
                    <TouchableOpacity disabled={!this.isActionsEnabled()}
                        style={[styles.action, this.isActionsEnabled() ? styles.correctAnswerActionEnabled : styles.disabledAction]}
                        onPress={this.handleCorrectAnswer}>
                        <Text style={[styles.actionText, this.isActionsEnabled() ? styles.actionTextEnabled: styles.actionTextDisabled]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.isActionsEnabled()}
                        style={[styles.action, this.isActionsEnabled() ? styles.incorrectAnswerActionEnabled: styles.disabledAction]}
                        onPress={this.handleIncorrectAnswer}>
                        <Text style={[styles.actionText, this.isActionsEnabled() ? styles.actionTextEnabled : styles.actionTextDisabled]}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const {showScorecard} = this.state
        return !showScorecard ? this.renderQuiz() : this.renderScoreCard()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    scorecardContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    card: {
        marginTop: 20,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        height: 400,
        justifyContent: 'center'
    },
    questionSide: {
        backgroundColor: yellow
    },
    answerSide: {
        backgroundColor: lightGreen
    },
    question: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    },
    answer: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    actionContainer: {
        marginTop: 'auto'
    },
    questionNo: {
        fontSize: 30,
        color: gray,
        textAlign: 'center'
    },
    action: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10
    },
    startQuizAgain: {
        backgroundColor: red,
    },
    correctAnswerActionEnabled: {
        backgroundColor: blue
    },
    incorrectAnswerActionEnabled: {
        backgroundColor: red
    },
    disabledAction: {
        backgroundColor: gray
    },
    actionText: {
        fontSize: 20
    },
    toggleQuestionAnswerText: {
        fontSize: 20,
        color: red,
        marginTop: 20,
        alignSelf: 'center',
    },
    actionTextEnabled: {
        color: white
    },
    actionTextDisabled: {
        color: lightGray
    },
    flipReminder: {
        color: red,
        fontSize: 18
    },
    revealAnswerHint: {
        color: red,
        fontSize: 18,
        textAlign: 'center'
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
    scorePercentage: {
        fontSize: 50,
        color: red,
        alignSelf: 'center',
        marginTop: 20
    },
})

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params
    const deck = state[deckId]
    return {deck}
}

export default connect(mapStateToProps)(Quiz);