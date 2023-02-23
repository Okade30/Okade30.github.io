function getRandomElement(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

function shuffleArray(array) {
  // randomly shuffles elements in an array in-place
  return array.sort((a, b) => Math.random() - 0.5);
}

function getMultipleChoices(n, correctAnswer, possiblechoices) {
  // Use a while loop and the getRandomElement() function
  // Make sure there are no duplicates in the array
  const choices = []
  choices.push(correctAnswer)
  while (choices.length < n) {
    let candidate = getRandomElement(possiblechoices)
    if (!choices.includes(candidate)) {
      choices.push(candidate)
    }
  }
  return shuffleArray(choices)
}


export {
  getRandomElement,
  shuffleArray,
  getMultipleChoices
};