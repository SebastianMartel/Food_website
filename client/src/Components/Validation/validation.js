export default function validation ( {title, image, summary, healthScore, stepByStep, diet} ) {

const errors = {};
const regexTitle = /\d.*\d.*\d.*\d/;
// const regexImg1 =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regexImg = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;


// _____TITLE:
const titleArr = title.split(' ')
    for (let word of titleArr) {
        if (word.length > 12) errors.title = "The words can't be larger than 12 characters"
        if (word.length < 2) errors.title = "The word must contain at least 2 characters..."
    }
if (regexTitle.test(title)) errors.title = "The title can't contain more than 3 numbers..."
if (!title) errors.title = "The title must contain at least 1 word..."
if (title.length > 40) errors.title = "Can't exceed 40 characters"

// _____HEALTH SCORE:
if (isNaN(healthScore) || healthScore.length < 1) errors.healthScore = "Must be a number between 0 and 100..."
if (healthScore > 100) errors.healthScore = "The score can't exceed 100"
if (healthScore < 0) errors.healthScore = "The score can't be less than 0"
if (healthScore && (healthScore?.includes('.') || healthScore?.includes(','))) errors.healthScore = "The number can't have decimals"

// _____IMAGE:
if (image && !regexImg.test(image)) errors.image = "Introduce a valid URL"

//______DESCRIPTION:
const summaryArr = title.split(' ')
    for (let word of summaryArr) {
        if (word.length > 12) errors.summary = "The words can't be larger than 12 characters"
        if (word.length < 2) errors.summary = "The word must contain at least 2 characters..."
    }
if (summary.length === 0) errors.summary = "Your recipe needs a description..."
if (summary && summary.trim().split(' ').length < 10) errors.summary = "The description must contain at least 10 words"

//______DIRECTIONS:
if (stepByStep.length > 0) {
    for (let step of stepByStep) {
        for (let word of step.split(' ')) {
            if (word && word.length > 12) errors.stepByStep = "The words can't be larger than 12 characters"
            if (word && word.length < 2) errors.stepByStep = "The word must contain at least 2 characters..."
        }
    }
}
if (stepByStep.length === 0) errors.stepByStep = "Write the first step..."
if (stepByStep.length > 0 && stepByStep[0].trim().split(' ').length < 3) errors.stepByStep = "The step must contain at least 3 words"


return errors
}