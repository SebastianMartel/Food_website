export default function validation ( {title, image, summary, healthScore, stepByStep, diet} ) {

const errors = {};
const regexTitle = /\d.*\d.*\d.*\d/;
const regexImg1 =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regexImg = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;



if (regexTitle.test(title) === true) {
    errors.title = "the title can't contain more than 3 numbers and must have at least 8 characters"
}

if (isNaN(healthScore) || healthScore > 100 || healthScore < 0) { // must be natural
    errors.healthScore = "must be a number can't exceed 100 or be less than 0"
}

if (regexImg.test(image) === false) {
    errors.image = "introduce a valid URL"
}


return errors
}