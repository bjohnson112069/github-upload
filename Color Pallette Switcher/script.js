const selectButton = document.querySelector('button');
const radioButtons = document.querySelectorAll('input[name="pallette"]');

selectButton.addEventListener("click", () => {
     let color1;
     let color2;
     let color3;
     let color4;
     let color5;

     // when someone clicks the Select button find out which radio button is checked
     radioButtons.forEach(radioButton => {
          let selectedTheme;

          // if the radio button is checked set the theme variable to the value of the radio box
          if (radioButton.checked) {
               selectedTheme = radioButton.value;
               color1 = `var(--${selectedTheme}--color-1)`;
               color2 = `var(--${selectedTheme}--color-2)`;
               color3 = `var(--${selectedTheme}--color-3)`;
               color4 = `var(--${selectedTheme}--color-4)`;
               color5 = `var(--${selectedTheme}--color-5)`;
          }
     });
     // console.table([color1, color2, color3, color4, color5]);

     document.documentElement.style.setProperty("--color-1", color1);
     document.documentElement.style.setProperty("--color-2", color2);
     document.documentElement.style.setProperty("--color-3", color3);
     document.documentElement.style.setProperty("--color-4", color4);
     document.documentElement.style.setProperty("--color-5", color5);
});
