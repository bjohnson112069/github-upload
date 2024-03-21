const links = document.querySelectorAll('a');
const buttons = document.querySelectorAll('.btn');
const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

function handleButtonClick(e) {

          e.preventDefault(); 

          const survey = document.querySelector('.survey');

          survey.classList.add('slide-right');
          setTimeout(() => {
                    survey.classList.remove('slide-right');
          }, 2000);

          survey.reset();
}

buttons.forEach(button => button.addEventListener("click", handleButtonClick));
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));

// on page load, wait 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
          console.log("DOM Load event")
          const survey = document.querySelector('.survey');
          const question = document.querySelector('.question');
          const answers = survey.querySelectorAll('.radio-group');

          setTimeout(() => {
                    survey.classList.remove(...classesToRemove);
                    setTimeout(() => {
                              question.classList.remove(...classesToRemove);
          
                              setTimeout(() => {
                                        answers.forEach((answer, index) => {
                                                  setTimeout(() => {
                                                            answer.classList.remove(...classesToRemove);
                                                  }, (index* 100));
                                        })          
                              }, 100); 
          
                    }, 1500);          
          }, 2000);
      
});





