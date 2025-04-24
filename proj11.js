class TennisTrivia {
    constructor() {
        // Player's current score
        this.score = 0;
        // Current question number
        this.currentQuestion = 0;
        // Array to store fetched questions
        this.questions = [];
        // Keywords used to filter tennis-related questions from the sports category
        this.tennisKeywords = ['tennis', 'wimbledon', 'grand slam', 'racket', 'racquet', 'court', 'serve', 'federer', 'nadal', 'djokovic', 'serena', 'williams', 'ace', 'deuce', 'volley'];
        // API endpoint for fetching sports questions
        this.apiUrl = 'https://opentdb.com/api.php?amount=50&category=21';
        // Store opponent data from Random User API
        this.opponent = null;
        // Opponent's current score
        this.opponentScore = 0;
    }

    async fetchQuestions() {
        // Fetch questions from Open Trivia Database API
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            // Filter questions to only include tennis-related ones
            const tennisQuestions = this.filterTennisQuestions(data.results);
            
            // Check if we have enough tennis questions
            if (tennisQuestions.length < 5) {
                document.getElementById('game-display').innerHTML = `
                    <h3>Not enough tennis questions available.</h3>
                    <p>Please try again later.</p>
                    <button onclick="triviaGame.resetGame()">Retry</button>
                `;
                return;
            }

            // Limit to 10 questions per game
            this.questions = tennisQuestions.slice(0, 10);
            this.displayQuestion();
        } catch (error) {
            console.error('Error fetching questions:', error);
            document.getElementById('game-display').innerHTML = 'Error loading questions. Please try again.';
        }
    }

    fetchOpponent() {
        // Use XMLHttpRequest to fetch random opponent data
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/', true); // also using another API
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                this.opponent = data.results[0];
                this.updateOpponentUI();
            }
        };
        
        xhr.onerror = () => {
            console.error('Error fetching opponent');
        };
        
        xhr.send();
    }

    updateOpponentUI() {
        // Update opponent's avatar and name in the UI
        document.getElementById('opponent-avatar').src = this.opponent.picture.large;
        document.getElementById('opponent-name').textContent = 
            `${this.opponent.name.first} ${this.opponent.name.last}`;
    }

    filterTennisQuestions(questions) {
        // Filtering questions to include only those related to tennis
        return questions.filter(question => {
            const questionText = question.question.toLowerCase();
            const correctAnswer = question.correct_answer.toLowerCase();
            const incorrectAnswers = question.incorrect_answers.map(answer => answer.toLowerCase());
            
            // Check if any tennis keyword appears in the question or answers
            return this.tennisKeywords.some(keyword => 
                questionText.includes(keyword) || 
                correctAnswer.includes(keyword) || 
                incorrectAnswers.some(answer => answer.includes(keyword))
            );
        });
    }

    decodeHTML(html) {
        // Decode HTML entities in the question or answers
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    displayQuestion() {
        // Display the current question and its answers
        if (this.currentQuestion >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const answers = [...question.incorrect_answers, question.correct_answer];
        const shuffledAnswers = this.shuffleArray(answers);

        let html = `
            <div class="question">
                <h3>${this.decodeHTML(question.question)}</h3>
                <div class="answers">
                    ${shuffledAnswers.map(answer => `
                        <button class="answer-btn" data-answer="${this.decodeHTML(answer)}">
                            ${this.decodeHTML(answer)}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        const gameDisplay = document.getElementById('game-display');
        gameDisplay.innerHTML = html;

        // Add click listeners to answer buttons
        const buttons = gameDisplay.querySelectorAll('.answer-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.checkAnswer(button.dataset.answer);
            });
        });
    }

    simulateOpponentAnswer() {
        // Simulate opponent answering with 60% accuracy
        const correct = Math.random() < 0.6;
        if (correct) {
            this.opponentScore += 10;
            document.querySelector('#opponent-score span').textContent = this.opponentScore;
        }
    }

    checkAnswer(selectedAnswer) {
        // Compare player's answer with correct answer
        const correctAnswer = this.decodeHTML(this.questions[this.currentQuestion].correct_answer);
        
        // Award points for correct answer
        if (selectedAnswer === correctAnswer) {
            this.score += 10;
            document.getElementById('score').textContent = this.score;
        }
        
        // Let opponent answer and move to next question
        this.simulateOpponentAnswer();
        this.currentQuestion++;
        setTimeout(() => this.displayQuestion(), 500); // Add small delay between questions
    }

    endGame() {
        // Display game results and final scores
        const result = this.score > this.opponentScore ? 'You Win!' : 
                      this.score < this.opponentScore ? 'Opponent Wins!' : 'It\'s a Tie!';
        
        document.getElementById('game-display').innerHTML = `
            <h2>Game Over!</h2>
            <p>Your Score: ${this.score}</p>
            <p>Opponent Score: ${this.opponentScore}</p>
            <h3>${result}</h3>
            <button onclick="triviaGame.resetGame()">Play Again</button>
        `;
    }

    resetGame() {
        // Reset game state and fetch new questions and opponent
        this.score = 0;
        this.opponentScore = 0;
        this.currentQuestion = 0;
        document.getElementById('score').textContent = '0';
        document.querySelector('#opponent-score span').textContent = '0';
        this.fetchOpponent();
        this.fetchQuestions();
    }

    shuffleArray(array) {
        // Shuffle array elements randomly
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.triviaGame = new TennisTrivia();
    
    document.getElementById('start-game').addEventListener('click', () => {
        triviaGame.resetGame();
    });
});
