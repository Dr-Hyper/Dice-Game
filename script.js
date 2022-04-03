'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winning = document.querySelector('.winngrad');

// starting conditions
/*score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');*/

let scores, currentScore, activePlayer, playing;


const initial = function () {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

   score0El.textContent = 0;
   score1El.textContent = 0;
   diceEl.classList.add('hidden');
   winning.classList.add('hidden');
   current0El.textContent = 0;
   current1El.textContent = 0;
   player0El.classList.add('player--active');
   player1El.classList.remove('player--active');
   player0El.classList.remove('player--winner');
   player1El.classList.remove('player--winner');

   /*document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
   document.querySelector(`.player--${activePlayer}`).classList.add('player--active');*/
};
initial();

const switchPlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   player0El.classList.toggle('player--active');
   player1El.classList.toggle('player--active');
}
let thewinner = document.querySelector(`.player--${activePlayer}`);

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
   if (playing) {
      // 1. Generation a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;

      // 2. Display dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;


      // 3. check for rolled 1
      if (dice !== 1) {
         // add dice to the current score
         currentScore += dice
         document.getElementById(`current--${activePlayer}`).textContent = currentScore;

         //current0El.textContent = currentScore; //NOTE: changeed in the up code
      } else {
         // switch next player

         switchPlayer();
         // TODO: for clean code i turned this into a function.
         /* document.getElementById(`current--${activePlayer}`).textContent = 0;
         currentScore = 0;
         activePlayer = activePlayer === 0 ? 1 : 0;
         player0El.classList.toggle('player--active');
         player1El.classList.toggle('player--active'); */
      }
   }
});

btnHold.addEventListener('click', function () {
   if (playing) {
      // 1. add current score to the score of the active player.
      scores[activePlayer] += currentScore; /* scores[1] = scores[1] + currentScore; */
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


      // 2. check the score is >= 100
      if (scores[activePlayer] >= 100) {
         //Finish the game.
         playing = false;
         diceEl.classList.add('hidden');
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

         winning.classList.remove('hidden');
      } else {
         // Switch the the next player.
         switchPlayer();
      }
   }
});

btnNew.addEventListener('click', initial)/*function () {
   NOTE:// turn it into a function
   score0El.textContent = 0;
   score1El.textContent = 0;
   diceEl.classList.add('hidden');
   winning.classList.add('hidden');
   current0El.textContent = 0;
   current1El.textContent = 0;
   document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
   document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
   activePlayer = 0;
   playing = true;}*/



