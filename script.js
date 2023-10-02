
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Madrid", "Paris"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Whale Shark", "Giraffe", "Blue Whale"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "2"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const quiz_container = document.querySelector(".quiz-container")
const congrats_container = document.querySelector(".congrats")
const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const resultElem = document.getElementById("result");
const quizForm = document.getElementById("quiz-form");
const Retake = document.getElementById("Retake-btn");

function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionElem.textContent = currentQuestion.question;

    // Clear previous options
    optionsElem.innerHTML = "";

    // Create and add options using radio buttons
    currentQuestion.options.forEach((option, i) => {
        const li = document.createElement("li");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "option";
        radioInput.value = option;

        const label = document.createElement("label");
        label.textContent = option;

        li.appendChild(radioInput);
        li.appendChild(label);
        optionsElem.appendChild(li);
    });

    // Hide the Next button and result
    nextButton.style.display = "none";
}

function submitForm(e) {
    e.preventDefault(); // Prevent the form from submitting

    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        resultElem.textContent = "";
        const selectedValue = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        
        if (selectedValue === correctAnswer) {
            score++;
         
        } 

        // Disable radio buttons
        const radioInputs = document.querySelectorAll('input[name="option"]');
        radioInputs.forEach(input => {
            input.disabled = true;
        });

        // Show the Next button
        nextButton.style.display = "block";
        submitButton.disabled = true;
    } else {
        resultElem.textContent = "Please select an option.";
       
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
        resultElem.textContent = "";
        nextButton.style.display = "none";
        submitButton.disabled = false;
    } else {
        displayResult();
    }
}

function displayResult() {
    questionElem.textContent = `You scored ${score} out of ${questions.length}!`;
    optionsElem.innerHTML = "";
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    resultElem.style.display = "none";

    if (score === questions.length) {
        quiz_container.style.display = "none";
        congrats_container.style.display = "flex";
    }
    else{
        Retake.style.display = "flex";
    }
}
function Retakequestions(){
    currentQuestionIndex = 0;
    score = 0;
    resultElem.style.display = "flex";
   submitButton.style.display = "flex";
   submitButton.disabled = false
    Retake.style.display = "none";
    displayQuestion(currentQuestionIndex);
}
// Initial setup
displayQuestion(currentQuestionIndex);

quizForm.addEventListener("submit", submitForm);
nextButton.addEventListener("click", nextQuestion);
Retake.addEventListener("click",Retakequestions)