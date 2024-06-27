document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const gameBoard = document.getElementById('gameBoard');
    const leaderboard = document.getElementById('leaderboard');
    const leaderboardList = document.getElementById('leaderboardList');
    
    let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cards = [...cardValues, ...cardValues];
    let flippedCards = [];
    let matchedPairs = 0;
    
    startButton.addEventListener('click', startGame);
    
    function startGame() {
      startButton.classList.add('hidden');
      gameBoard.classList.remove('hidden');
      leaderboard.classList.add('hidden');
      matchedPairs = 0;
      gameBoard.innerHTML = '';
      shuffle(cards);
      generateCards();
    }
    
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
    function generateCards() {
      cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
      });
    }
    
    function flipCard() {
      if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
          checkMatch();
        }
      }
    }
    
    function checkMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardValues.length) {
          endGame();
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card1.textContent = '';
          card2.classList.remove('flipped');
          card2.textContent = '';
          flippedCards = [];
        }, 1000);
      }
    }
    
    function endGame() {
      setTimeout(() => {
        alert('You won!');
        displayLeaderboard();
      }, 500);
    }
    
    function displayLeaderboard() {
      const highScore = matchedPairs;
      const li = document.createElement('li');
      li.textContent = `Score: ${highScore}`;
      leaderboardList.appendChild(li);
      leaderboard.classList.remove('hidden');
      startButton.classList.remove('hidden');
    }
  });  