import Card, { DefaultSuits, DefaultValues } from "./card";

import shuffleArray from "shuffle-array";

const CutCardLengthFromBottom = 16;

/**
 * Baccarat shoe
 */
class Shoe {
  /**
   * Cards left
   * @return {number} Count of cards left
   */
  get cardsLeft() {
    return this.cards.length;
  }

  /**
   * Number of cards before the cut card
   * @return {number} Count of cards left before cut card
   */
  get cardsBeforeCutCard() {
    return Math.max(0, this.cardsLeft - CutCardLengthFromBottom);
  }

  /**
   * Has the cut card been reached
   * @return {boolean} true if the cut card has been reached, false otherwise
   */
  get cutCardReached() {
    return this.cardsBeforeCutCard <= 0;
  }

  /**
   * Shoe constructor
   * @param {number} decks - Count of decks to be included in the shoe
   * @constructor
   */
  constructor(decks) {
    this.decks = decks;
    this.cards = [];
  }

  /**
   * Creates the cards array
   */
  createDecks() {
    for (let i = 0; i < this.decks; i++) {
      for (let j = 0; j < 52; j++) {
        this.cards.push(this.createCard(j));
      }
    }
  }

  /**
   * Shuffles the cards array
   */
  shuffle() {
    shuffleArray(this.cards);
  }

  /**
   * Draws the next card
   * @return {Card} Card drawn
   */
  draw() {
    if (this.cards.length == 0) {
      this.createDecks();
      this.shuffle();
    }

    return this.cards.pop();
  }

  /**
   * To string
   * @return {string} String representation of the shoe
   */
  toString() {
    return `[${this.cards.map((c) => c.toString()).join(", ")}]`;
  }

  /**
   * Creates a card from the value passed in
   * @param {number} value - The integer value to be converted
   * @return {Card} Card created
   */
  createCard(value) {
    const suit = Math.floor(value / 13);
    const cardValue = value % 13;

    let suitString = DefaultSuits[suit];
    let valueString = DefaultValues[cardValue];

    return new Card(suitString, valueString);
  }
}

export default Shoe;
