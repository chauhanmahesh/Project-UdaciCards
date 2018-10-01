/**
 * @description Based on the number of cards passed, it return either 'card' or 'cards'.
 */
 export function getNumberOfCardsSuffix(numCards) {
    return numCards > 1 ? 'cards' : 'card'
 }