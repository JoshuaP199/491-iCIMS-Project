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
    },
    {
        prompt:"What is the final process of the interview?",
        choices: [
            {text: 'handshake', correct : false},
            {text: 'follow-up', correct: false},
            {text: "negotiation", correct: false},
            {text: "thank you note", correct: true}
        ]
    },
    {
        prompt:"What is the process of small talk for?",
        choices: [
            {text: 'Get a personality feel of the interviewer', correct : false},
            {text: 'Get a personality feel of the interviewee', correct: false},
            {text: "ease the candidate into the conversation", correct: false},
            {text: "all of the above", correct: true}
        ]
    },
    {
        prompt:"Why should you research a company before the interview?",
        choices: [
            {text: 'prep for general job interviews since these companies will tend to have similiar characteristics', correct : false},
            {text: 'learn about potential jobs and how they function', correct: false},
            {text: "prepare for interview questions", correct: false},
            {text: "all of the above", correct: true}
        ]
    },
    {
        prompt:"All job interviews have the same objective?",
        choices: [
            {text: 'true', correct : true},
            {text: 'false', correct: false},

        ]
    },
    {
        prompt:"Which kind of interview includes a process in which the employability of the job applicant is evaluated?",
        choices: [
            {text: 'Stress interview', correct : false},
            {text: 'Screening interview', correct: true},
            {text: "Group interview", correct: false},
            {text: "Behavioural interview", correct: false}
        ]
    },
    {
        prompt:"Which of these interviews is adapted for computer programmers?",
        choices: [
            {text: 'The stress interview', correct : false},
            {text: 'The audition', correct: true},
            {text: "The group interview", correct: false},
            {text: "The screening interview", correct: false}
        ]
    },
    {
        prompt:"Fill in the Blank: Where do you see yourself _____ years from now?",
        choices: [
            {text: '10', correct : true},
            {text: '3', correct: false},
            {text: "5", correct: true},
            {text: "15", correct: false}
        ]
    },
    {
        prompt:"Which of these is a behavioral based question?",
        choices: [
            {text: 'What are your qualifications?', correct : false},
            {text: 'What are your weaknesses?', correct: true},
            {text: "What are your long term goals", correct: false},
            {text: "Can you describe a time where you struggled on something?", correct: true}
        ]
    }

]
