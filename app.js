
import { getRandomElement, shuffleArray, getMultipleChoices } from './3_utilities.js';
const RANDOM_IMG_ENDPOINT = "https://dog.ceo/api/breeds/image/random";

const BREEDS = ["affenpinscher", "african", "airedale", "akita", "appenzeller", "shepherd australian", "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer", "brabancon", "briard", "norwegian buhund", "boston bulldog", "english bulldog", "french bulldog", "staffordshire bullterrier", "australian cattledog", "chihuahua", "chow", "clumber", "cockapoo", "border collie", "coonhound", "cardigan corgi", "cotondetulear", "dachshund", "dalmatian", "great dane", "scottish deerhound", "dhole", "dingo", "doberman", "norwegian elkhound", "entlebucher", "eskimo", "lapphund finnish", "bichon frise", "germanshepherd", "italian greyhound", "groenendael", "havanese", "afghan hound", "basset hound", "blood hound", "english hound", "ibizan hound", "plott hound", "walker hound", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labradoodle", "labrador", "leonberg", "lhasa", "malamute", "malinois", "maltese", "bull mastiff", "english mastiff", "tibetan mastiff", "mexicanhairless", "mix", "bernese mountain", "swiss mountain", "newfoundland", "otterhound", "caucasian ovcharka", "papillon", "pekinese", "pembroke", "miniature pinscher", "pitbull", "german pointer", "germanlonghair pointer", "pomeranian", "medium poodle", "miniature poodle", "standard poodle", "toy poodle", "pug", "puggle", "pyrenees", "redbone", "chesapeake retriever", "curly retriever", "flatcoated retriever", "golden retriever", "rhodesian ridgeback", "rottweiler", "saluki", "samoyed", "schipperke", "giant schnauzer", "miniature schnauzer", "english setter", "gordon setter", "irish setter", "sharpei", "english sheepdog", "shetland sheepdog", "shiba", "shihtzu", "blenheim spaniel", "brittany spaniel", "cocker spaniel", "irish spaniel", "japanese spaniel", "sussex spaniel", "welsh spaniel", "english springer", "stbernard", "american terrier", "australian terrier", "bedlington terrier", "border terrier", "cairn terrier", "dandie terrier", "fox terrier", "irish terrier", "kerryblue terrier", "lakeland terrier", "norfolk terrier", "norwich terrier", "patterdale terrier", "russell terrier", "scottish terrier", "sealyham terrier", "silky terrier", "tibetan terrier", "toy terrier", "welsh terrier", "westhighland terrier", "wheaten terrier", "yorkshire terrier", "tervuren", "vizsla", "spanish waterdog", "weimaraner", "whippet", "irish wolfhound"];

// Given a URL such as "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg"
// return the breed name string as formatted in the breed list, e.g. "standard poodle"
function getBreedFromURL(url) {
  // The string method .split(char) may come in handy
  // Try to use destructuring as much as you can
  let urlParts = url.split('/')[4]
  let [breed, subbreed] = urlParts.split("-")
  return [subbreed, breed].join(" ").trim()
}

async function fetchMessage(url) {
  const response = await fetch(url)
  const body = await response.json()
  const { message } = body
  return message
}


// Function to add the multiple-choice buttons to the page
function renderButtons(choicesArray, correctAnswer) {

  // Event handler function to compare the clicked button's value to correctAnswer
  // and add "correct"/"incorrect" classes to the buttons as appropriate
  function buttonHandler(e) {
    if (e.target.value === correctAnswer) {
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect");
      document.querySelector(`button[value="${correctAnswer}"]`).classList.add("correct");
    }
  }

  const options = document.getElementById("options"); // Container for the multiple-choice buttons
  const refreshDiv = document.getElementById("refresh");

  for (let choice of choicesArray) {
    const button = document.createElement("button")
    button.textContent = choice;
    button.value = choice
    button.name = choice
    button.addEventListener("click", buttonHandler)
    options.appendChild(button)
  }

  const btnRefresh = document.createElement('button')
  btnRefresh.setAttribute("id", "btn-refresh")
  btnRefresh.textContent = "▶▶"
  btnRefresh.addEventListener("click", (e) => {
    location.reload();
  })
  refreshDiv.appendChild(btnRefresh)

}


// Function to add the quiz content to the page
function renderQuiz(imgUrl, correctAnswer, choices) {
  const image = document.createElement("img");
  image.setAttribute("src", imgUrl);
  const frame = document.getElementById("image-frame");

  image.addEventListener("load", () => {
    // Wait until the image has finished loading before trying to add elements to the page
    frame.replaceChildren(image);
    renderButtons(choices, correctAnswer);
  })

}

// Function to load the data needed to display the quiz
async function loadQuizData() {
  document.getElementById("image-frame").textContent = "Fetching doggo...";

  const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
  const correctBreed = getBreedFromURL(doggoImgUrl);
  const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);

  return [doggoImgUrl, correctBreed, breedChoices];
}

// Asynchronously call the loadQuizData() function,
const [imgUrl, correctAnswer, choices] = await loadQuizData()
// Then call renderQuiz() with the returned imageUrl, correctAnswer, and choices 
renderQuiz(imgUrl, correctAnswer, choices)
