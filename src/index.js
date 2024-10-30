document.addEventListener("DOMContentLoaded", () => {
	/************  HTML ELEMENTS  ************/
	// View divs
	const quizView = document.querySelector('#quizView');
	const endView = document.querySelector('#endView');
	const settingsView = document.querySelector('#settingsView');

	// Quiz view elements
	const progressBar = document.querySelector('#progressBar');
	const questionCount = document.querySelector('#questionCount');
	const questionContainer = document.querySelector('#question');
	const choiceContainer = document.querySelector('#choices');
	const nextButton = document.querySelector('#nextButton');
	const restartButton = document.querySelector('#restartButton');
	const startButton = document.querySelector('#startButton');
	const settingsContainer = document.querySelector('#settings');


	// End view elements
	const resultContainer = document.querySelector('#result');

	/************  SET VISIBILITY OF VIEWS  ************/

	// Show the quiz view (div#quizView) and hide the end view (div#endView)
	settingsView.style.display = 'block';
	quizView.style.display = 'none';
	endView.style.display = 'none';

	/************  QUIZ DATA  ************/

	// Array with the quiz questions
	const questions = [
		new Question('What is 2 + 2?', ['3', '4', '5', '6'], '4', 1),
		new Question(
			'What is the capital of France?',
			['Miami', 'Paris', 'Oslo', 'Rome'],
			'Paris',
			1
		),
		new Question(
			'What color are bananas when they are ripe?',
			['Blue', 'Red', 'Yellow', 'Purple'],
			'Yellow',
			1
		),
		new Question(
			'Who created JavaScript?',
			['Plato', 'Brendan Eich', 'Lea Verou', 'Bill Gates'],
			'Brendan Eich',
			2
		),
		new Question(
			'Which planet is known as the "Red Planet"?',
			['Venus', 'Mars', 'Jupiter', 'Saturn'],
			'Mars',
			2
		),
		new Question(
			'Which element\'s chemical symbol is "O"?',
			['Gold', 'Oxygen', 'Silver', 'Hydrogen'],
			'Oxygen',
			2
		),
		new Question(
			'What is the mass–energy equivalence equation?',
			['E = mc^2', 'E = m*c^2', 'E = m*c^3', 'E = m*c'],
			'E = mc^2',
			3
		),
		new Question(
			'Which philosopher is known for the statement "I think, therefore I am"?',
			['Friedrich Nietzsche', 'Immanuel Kant', 'René Descartes', 'John Locke'],
			'René Descartes',
			3
		),
		new Question(
			'Which of the following scientists is known for developing the uncertainty principle in quantum mechanics?',
			['Albert Einstein', 'Niels Bohr', 'Werner Heisenberg', 'Max Planck'],
			'Werner Heisenberg',
			3
		),
		// Add more questions here
	];
	const quizDuration = 120; // 120 seconds (2 minutes)

	/************  QUIZ INSTANCE  ************/

	//show difficulty settings
	showSettings();

	// make difficulty selection

	// Create a new Quiz instance object
	const quiz = new Quiz(questions, quizDuration, quizDuration);
	// Shuffle the quiz questions
	quiz.shuffleQuestions();

	/************  SHOW INITIAL CONTENT  ************/

	// Display the time remaining in the time remaining container
	const timeRemainingContainer = document.getElementById('timeRemaining');
	timeRemainingContainer.innerText = quiz.getFormattedRemainingTime();

	/************  TIMER  ************/

	let timer;

	function startTimer() {
		timer = setInterval(() => {
			quiz.timeRemaining--;
			timeRemainingContainer.innerText = quiz.getFormattedRemainingTime();

			if (quiz.timeRemaining === 0) showResults();
		}, 1000);
	}



	/************  EVENT LISTENERS  ************/

	startButton.addEventListener('click', startButtonHandler);
	nextButton.addEventListener('click', nextButtonHandler);
	restartButton.addEventListener('click', restartButtonHandler);


	/************  FUNCTIONS  ************/

	// showQuestion() - Displays the current question and its choices
	// nextButtonHandler() - Handles the click on the next button
	// showResults() - Displays the end view and the quiz results
	function showSettings() {
		//create view html
		const settings = ["easy", "medium", "hard"];

		settings.forEach((setting) => {
			console.log("🚀 ~ settings.forEach ~ setting:", setting);
			const liElement = document.createElement('li');

			liElement.innerHTML = /*html*/ `
				<input
					type="radio"
					name="setting"
					value="${setting}"
					id="${setting}-setting"
				/>
				<label for="${setting}-setting">${setting}</label>
				<br />
			`;

			settingsContainer.appendChild(liElement);
		});

	}

	function setDifficulty() {
		const difficulty = document.querySelector('#settings li input:checked').value;
		switch (true) {
			case difficulty === 'easy':
				quiz.setDifficulty(1);
				break;
			case difficulty === 'medium':
				quiz.setDifficulty(2);
				break;
			case difficulty === 'hard':
				quiz.setDifficulty(3);
				break;
		}
	}

	function showQuestion() {
		// If the quiz has ended, show the results
		if (quiz.hasEnded()) {
			showResults();
			return;
		}

		// Clear the previous question text and question choices
		questionContainer.innerText = '';
		choiceContainer.innerHTML = '';

		// Get the current question from the quiz by calling the Quiz class method `getQuestion()`
		const question = quiz.getQuestion();
		// Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
		question.shuffleChoices();

		// YOUR CODE HERE:
		//
		// 1. Show the question
		// Update the inner text of the question container element and show the question text
		questionContainer.innerText = `${question.text}`;

		// 2. Update the green progress bar
		// Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

		progressBar.style.width = `${(quiz.currentQuestionIndex / quiz.questionsForRendering.length) * 100
			}%`; // This value is hardcoded as a placeholder

		// 3. Update the question count text
		// Update the question count (div#questionCount) show the current question out of total questions

		questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questionsForRendering.length
			}`; //  This value is hardcoded as a placeholder

		// 4. Create and display new radio input element with a label for each choice.
		// Loop through the current question `choices`.
		// For each choice create a new radio input with a label, and append it to the choice container.
		// Each choice should be displayed as a radio input element with a label:

		const currentQuestion = quiz.questionsForRendering[quiz.currentQuestionIndex];

		currentQuestion.choices.forEach((choice, i) => {
			const liElement = document.createElement('li');

			liElement.innerHTML = /*html*/ `
			<input
			type="radio"
			name="question-${quiz.currentQuestionIndex}"
			value="${choice}"
			id="answer-${i}"
			/>
			<label for="answer-${i}">${choice}</label>
			<br />
			`;

			choiceContainer.appendChild(liElement);

		});

	}

	function startButtonHandler() {
		settingsView.style.display = 'none';
		quizView.style.display = 'block';

		setDifficulty();

		showQuestion();

		startTimer();

	}

	function nextButtonHandler() {
		let selectedAnswer; // A variable to store the selected answer value

		// YOUR CODE HERE:
		const choiceElements = document.querySelectorAll('#choices li input');

		choiceElements.forEach(inputElement => {
			if (inputElement.checked) {
				quiz.checkAnswer(inputElement.value);
				quiz.moveToNextQuestion();
				showQuestion();
			}
		});
	}

	function showResults() {
		// YOUR CODE HERE:
		//
		// 1. Hide the quiz view (div#quizView)
		quizView.style.display = 'none';

		// 2. Show the end view (div#endView)
		endView.style.display = 'flex';

		// 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
		resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questionsForRendering.length} correct answers!`; // This value is hardcoded as a placeholder

		clearInterval(timer);
	}

	function restartButtonHandler() {
		settingsView.style.display = 'block';
		endView.style.display = 'none';

		quiz.correctAnswers = 0;
		quiz.currentQuestionIndex = 0;
		quiz.timeRemaining = quizDuration;
		timeRemainingContainer.innerText = quiz.getFormattedRemainingTime();

	}
});