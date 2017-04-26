const STRIP_PUNCTUATION = /[.,\/#!$%\^&\*;:{}=\-_?`~()]/g;

const trimStripLower = str =>
  str
    .replace(STRIP_PUNCTUATION, "")
    .toLowerCase()
    .trim();

const isCorrectAnswer = (submission, answer) => trimStripLower(submission) === trimStripLower(answer)

export {
  isCorrectAnswer
}
