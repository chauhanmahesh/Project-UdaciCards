import {AsyncStorage} from 'react-native';

export const UDACICARDS_STORAGE_KEY = 'UdaciCards:deck'

const initialData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces.'
            }, {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    Android: {
        title: 'Android',
        questions: [
            {
                question: 'What is Android?',
                answer: 'Android is a mobile operating system.'
            }, {
                question: 'What\'s the current version of Android?',
                answer: 'Android P (Pie)'
            }, {
                question: 'Which company owns Android OS?',
                answer: 'Google'
            }, {
                question: 'Which Android component you use to perform operations in background?',
                answer: 'Service'
            }, {
                question: 'Whats the name of declarative language which you can use to write Android Apps and its now backed by Google?',
                answer: 'Kotlin'
            }
        ]
    },
    Kotlin: {
        title: 'Kotlin',
        questions: [
            {
                question: 'How you can create a lightweight threads in kotlin?',
                answer: 'Using coroutines.'
            }, {
                question: 'Is Kotlin interoperable with java?',
                answer: 'Yes'
            }, {
                question: 'Is Kotlin declarative or Imperative?',
                answer: 'Declarative'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that func' +
                    'tion was declared.'
            }
        ]
    }
}

function setInitialData() {
    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(initialData))
    return initialData
}

function formatDeckResults(decks) {
    return decks === null
        ? setInitialData()
        : JSON.parse(decks)
}

export function fetchExistingDecks() {
    return AsyncStorage
        .getItem(UDACICARDS_STORAGE_KEY)
        .then(formatDeckResults)
}

export function addDeckToStorage({deck, key}) {
    console.log("addDeckToStorage : " + key + " deck : " + deck)
    return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({[key]: deck}))
}

export function addCardToDeckStorage({cardInfo}) {
    console.log("addCardToDeckStorage : Adding card to deckId : " + cardInfo.deckId)
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then((formatDeckResults) => {
        const decks = JSON.parse(formatDeckResults)
        const {deckId, question, answer} = cardInfo
        const deck = decks[deckId]
        deck.questions = deck.questions.concat({question, answer})
        AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}