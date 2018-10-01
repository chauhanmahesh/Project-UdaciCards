# UdaciCards Project

My submission of the project "UdaciCards" where I tried to use the ReactNative concepts which I learned as part of "React Native".
The concepts which I tried to use in this projects are as follows:
* React Native fundamentals.
* Redux to manage the state of application, reducers.
* Local notification.
* How to write platform specific code using 'Platform'.
* Expo vector icons.
* Stack Navigation
* Tab Navigation

## Features
* App stars with a UdaciCards page where user sees two tabs "Decks" and "Add Deck".
* 'Decks' screen lists the existing decks available in the storage (Initial + any which user created).
* 'Add Deck' screen let's user to add a new deck to the storage.
* If user taps on any of the deck on 'Decks' screen, it shows the 'Deck Detail' page which shows the name
of the deck, number of cards in the deck and an option to add more cards or to start the quiz.
User can't start the quiz if there is no cards in the deck. The 'Start Quiz' action will be disabled until user adds a card in the deck.
* Once there are at least one card in the deck, user can then start the quiz. Quiz page displays the question and an option to reveal answer. It also has two actions which are 'Correct' or 'Incorrect'.
* Quiz page uses FlipCard on iOS. So user can just tap on question card to see the answer. This doesn't supports on Android so there is a seperate action for 'Show Answer' for Android. The actions will be disabled on answer page and user has to go to question view to either tap on 'Correct' or 'Incorrect'.
* In 'Add Card' screen, user need to enter 'Question' and 'Answer' text before submitting it. Submit will be disabled until user enteres both quesiton and answer.
* Once the quiz is complete, it shows the percentage which user scored. User has an option to start the quiz again from the scoreboard.
* User sees a notification as a reminder everyday at 6:00 PM. Once user finishes a quiz, the notification will be cleared and scheduled for the next day.
* The app is tested on both iOS and Android.

## Installation and Launching
To launch this "UdaciCards" app:
* install all project dependencies with `yarn install`
* start the development server with `yarn start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── actions
│   ├── index.js # Actions related to application like RECEIVE_DECKS, ADD_DECK and ADD_CARD.
└── reduces
│   ├── index.js # This reducers takes the action and updates the store.
├── components
│   ├── AddCard.js # Renders 'AddCard' screen which lets user to add a new card in the deck.
│   ├── AddDeck.js # Renders 'AddDeck' screen which lets user to add a new deck.
│   ├── DeckDetail.js # Renders selected deck which displays name, number of cards and option to either   add more card or start the quiz.
│   ├── Decks.js # Renders a grid of all the existing decks with the name and number of cards in each.
│   ├── Quiz.js # Renders the quiz for the selected deck.
│   ├── UdaciCardsStatusBar.js # Status bar for the app.
├── utils
│   └── colors.js # List all the colors which is used in the app.
│   └── storageHelper.js # Lists all the utility API's which is used in the app.
├── App.js # The root component of the app.
```
## Create React Native App
This project was bootstrapped with [Create React Native App]https://facebook.github.io/react-native/docs/getting-started