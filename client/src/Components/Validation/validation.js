export default function validation ( {title, image, summary, healthScore, stepByStep, diet} ) {

const errors = {};
const regexTitle = /\d.*\d.*\d.*\d/;
// const regexImg1 =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regexImg = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;


// _____TITLE:
const titleArr = title.split(' ')
for (let word of titleArr) {
    if (word.length > 12) {
        errors.title = "The words can't be larger than 12 characters"
    } 
    if (word.length < 2) {
        errors.title = "The word must contain at least 2 characters..."
    }
}
if (regexTitle.test(title)) errors.title = "The title can't contain more than 3 numbers..."
if (!title) errors.title = "The title must contain at least 1 word..."
if (title.length > 40) errors.title = "Can't exceed 40 characters"

// _____HEALTH SCORE:
if (isNaN(healthScore) || healthScore.length < 1) errors.healthScore = "Must be a number"
if (healthScore > 100) errors.healthScore = "The score can't exceed 100"
if (healthScore < 0) errors.healthScore = "The score can't be less than 0"
if (healthScore && (healthScore?.includes('.') || healthScore?.includes(','))) errors.healthScore = "Can't have decimal"


// _____IMAGE:
if (image && !regexImg.test(image)) errors.image = "Introduce a valid URL"


return errors
}