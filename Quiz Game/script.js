
async function loadContent() {
   const next = document.querySelector('#next-question-btn');
   let index = 0;
   let numCorrect = 0;

   function decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
   }

   async function fetchQuestions() {
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await response.json();

      if (data.response_code !== 0) {
         console.log('Error in API fetch', data.response_code);
      }

      return data.results;
   }

   function displayEndDialog() {
      const dialog = document.querySelector('#end-dialog');
      const correct = dialog.querySelector('#total-correct-answers');
      const again = dialog.querySelector('.try-again-btn');

      dialog.style.display = 'flex';
      correct.textContent = numCorrect;

      // reload
      again.addEventListener('click', () => {
         window.location.reload(true);
      });
   }

   function clearIndicators() {
      const boxes = document.querySelectorAll('.answer-box');

      boxes.forEach(box => {
         box.classList.remove('correct', 'wrong', 'selected');
         box.textContent = '';
      });
   }

   function verifyAnswer() {
      const box = document.querySelector('.answer-box.selected');
      if (!box) return;
      
      const value = box.previousElementSibling.value;

      // verify the answer
      const verified = value === decodeHtml(DATA[index].correct_answer) ? true : false;

      // visibual indicator correct(green)/wrong(red)
      if (verified) {
         box.classList.add('correct');
         box.textContent = '\u2713';
      } else {
         box.classList.add('wrong');
         box.textContent = '\u2715';
      }
      // verified ? box.classList.add('correct') : box.classList.add('wrong')

      if (verified) numCorrect++;

   }

   function handleSelection() {
      const selection = this.nextElementSibling;
      const boxes = document.querySelectorAll('.answer-box');

      boxes.forEach(box => {
         box === selection ? box.classList.add('selected') : box.classList.remove('selected');

         // center the text content (correct/wrong)
         box.style.alignItems = 'center';
         box.style.justifyContent = 'center';
      });
   }

   function displayQuestion(index) {
      const counter = document.querySelector('#current-question');
      const question = document.querySelector('.question');
      const answers = document.querySelectorAll('.answer-wrapper');

      // update the question
      question.textContent = decodeHtml(DATA[index].question);
      
      // spread incorrect and correct answers into a temp array
      const arr = [...DATA[index].incorrect_answers, DATA[index].correct_answer];

      // Edge Case: handle True/False question from API
      if (arr.length === 2) {
         arr.push('Leaning toward True');
         arr.push('Leaning toward False')
      }
 
      // populate the answers and values for the inputs
      answers.forEach((answer, i) => {
         const label = answer.querySelector('label[data-answer]');
         const input = answer.querySelector('input[data-option]');

         label.textContent = decodeHtml(arr[i]);
         input.value = decodeHtml(arr[i]);

         // event listener for selection
         input.addEventListener('click', handleSelection);
      })

      // update the question counter label
      counter.textContent = index + 1;
   }

   function nextQuestion() {
      const DELAY = 1000;
       
      if (index > (MAX_QUESTIONS - 1)) return;

      if (index === (MAX_QUESTIONS - 1)) {
         verifyAnswer();
         // Wait 5 seconds then remove all visual indicators
         setTimeout(() => {
            displayEndDialog();
         }, DELAY);
      } else {
         verifyAnswer();
         index++;

         // Wait 5 seconds then remove all visual indicators
         setTimeout(() => {
            clearIndicators();
            displayQuestion(index);
         }, DELAY);
      }
   }

   // Event Listeners
   next.addEventListener('click', nextQuestion);

   // fetch data from API
   const DATA = await fetchQuestions();

   if (DATA.length === 0) return;

   // updaate the question count
   const MAX_QUESTIONS = DATA.length;
   const total = document.querySelector('#total-questions');
   total.textContent = MAX_QUESTIONS;
   

   // display the first question
   displayQuestion(index);
}

document.addEventListener('DOMContentLoaded', loadContent);