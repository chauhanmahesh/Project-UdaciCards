import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';

export const UDACICARDS_STORAGE_KEY = 'UdaciCards:deck'
const NOTIFICATION_KEY = 'UdaciCards:quizNotification'

/**
 * @description This is initial data which will be visible in the app if user has not
 * created any other decks and cards.
 */
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

/**
 * @description Sets the initial data to the storage.
 */
function setInitialData() {
    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(initialData))
    return initialData
}

/**
 * @description Formats the deck result. Returns the initial data if there is no deck created by user in
 * storage.
 * 
 * @param {Array} decks Current decks in storage.
 */
function formatDeckResults(decks) {
    return decks === null
        ? setInitialData()
        : JSON.parse(decks)
}

/**
 * @description Fetches decks from Storage.
 */
export function fetchExistingDecks() {
    return AsyncStorage
        .getItem(UDACICARDS_STORAGE_KEY)
        .then(formatDeckResults)
}

/**
 * @description Add the new deck to the storage.
 */
export function addDeckToStorage({deck, key}) {
    return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({[key]: deck}))
}

/**
 * @description Add the new card to the deck and saves it in storage.
 */
export function addCardToDeckStorage({cardInfo}) {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then((formatDeckResults) => {
        const decks = JSON.parse(formatDeckResults)
        const {deckId, question, answer} = cardInfo
        const deck = decks[deckId]
        deck.questions = deck.questions.concat({question, answer})
        AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}

/**
 * @description Clears any quiz notification if exist.
 */
export function clearQuizNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

/**
 * @description Creates a new quiz notification.
 */
function createQuizNotification() {
    return {
        title: 'Challenge yourself!',
        body: 'Don\'t forget to learn today, complete at least one quiz.',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

/**
 * @description Schedules a new quiz notification for tomorrow
 * at 6:00 PM.
 */
export function setQuizLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if(data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if(status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(18)
                    tomorrow.setMinutes(0)
                    Notifications.scheduleLocalNotificationAsync(
                        createQuizNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day'
                        }
                    )
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}