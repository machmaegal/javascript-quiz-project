class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5);
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        this.correctAnswers++;
        return false;
    }
    // 6. hasEnded()
    hasEnded() {
        if (this.questions.length === this.currentQuestionIndex) return true;
        return false;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty < 1 || difficulty > 3 || isNaN(difficulty)) return this.questions;
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
    }

    averageDifficulty() {
        return this.questions.reduce((sum, question) => sum + question.difficulty, 0) / this.questions.length;
    }


}