const beginButton = document.getElementById("begin")
beginButton.addEventListener("click", beginQuiz)

const nextButton = document.getElementById("next")
const message = document.getElementById("message")

nextButton.addEventListener('click', () => {
    currentPromptIndex++
    nextQuestion()
})



const promptValue=document.getElementById('main_box')
const promptElement = document.getElementById("prompt")
const buttonChoices = document.getElementById("choices")


let randomPrompt, currentPromptIndex



function beginQuiz(){
    message.classList.add('hide')
    beginButton.classList.add('hide')
    promptValue.classList.remove('hide')
    randomPrompt = prompts.sort(() => Math.random * prompts.length)
    currentPromptIndex = 0
    nextQuestion()
}
function printPrompt(prompt){
    promptElement.innerText = prompt.prompt
    prompt.choices.forEach(choice => {
        const button = document.createElement('button')
        button.innerText = choice.text
        button.classList.add('btn')
        if(choice.correct){
            button.dataset.correct = choice.correct
        }
        button.addEventListener('click', answerChoice)
        buttonChoices.appendChild(button)
    })
}

function RightOrWrong(element,correct){
    clearRightOrWrong(element)
    if(correct){
        element.classList.add('correct')
        console.log("correct")
    }
    else{
        element.classList.add('incorrect')
        console.log("incorrect")
    }

}

function clearRightOrWrong(element){
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

function answerChoice(e){
    const chosen = e.target
    const correct = chosen.dataset.correct
    RightOrWrong(document.body,correct)
    Array.from(buttonChoices.children).forEach(button => {
        RightOrWrong(button, button.dataset.correct)
    })
    if(randomPrompt.length > currentPromptIndex+1){
        nextButton.classList.remove("hide")
    }
    else{
        beginButton.innerText = "Try Again"
        beginButton.classList.remove('hide')
    }
}

function clearQuestions(){
    nextButton.classList.add('hide')
    while(buttonChoices.firstChild){
        buttonChoices.removeChild
        (buttonChoices.firstChild)
    }
}

function nextQuestion(){
    clearQuestions()
    printPrompt(randomPrompt[currentPromptIndex])

}

const prompts = [
    {
        prompt:"Is this an interview question?",
        choices: [
            {text: 'Yes', correct : true},
            {text: 'No', correct: false},
            {text: "Sometimes", correct: false},
            {text: "Idk", correct: false}
        ]
    },
    {
        prompt:'When being asked, "what is your biggest weakness" how should you respond?',
        choices: [
            {text: 'Say your weaknesses', correct : false},
            {text: 'Avoid the Question', correct: false},
            {text: "Say things you have tried to improve upon that you arent so strong in", correct: true},
            {text: "Talk about your strengths instead to show your value", correct: false}
        ]
    },
    {
        prompt:"How do you know how much you should ask for salary wise?",
        choices: [
            {text: 'Research the position and expected salary', correct : true},
            {text: 'Assume a number based on what you think you deserve', correct: false},
            {text: "Ask them what they think is a good price", correct: false},
            {text: "Tell them you are willing to work no matter the salary", correct: false}
        ]
    }
]

