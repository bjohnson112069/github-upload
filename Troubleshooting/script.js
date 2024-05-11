const radios = document.querySelectorAll('input[type="radio"]');

// wrapping text

const text = document.querySelectorAll(".text");
text.forEach(txt => {
    txt.innerHTML = txt.innerText.split("").map(
        (char, index, arr) =>
        `<span style="transform: rotate(${index * (270 / arr.length)}deg);">${char}</span>`
      //   `<span style="transform: rotate(${index * 8.5}deg);">${char}</span>`
      ).join("");
});


radios.forEach(item => {
    const parent = item.parentElement;
    const siblingText = item.nextElementSibling;

    item.addEventListener('change', () => {
        radios.forEach(radio => {
            if (radio !== item) {
                radio.parentElement.removeAttribute('data-shift');
                radio.nextElementSibling.removeAttribute('data-show');
            }
        });

        if (item.checked) {
            parent.setAttribute('data-shift', true);
            siblingText.setAttribute('data-show', true);
        } else {
            parent.removeAttribute('data-shift');
            siblingText.removeAttribute('data-show');
        }
    });
});


const bubbles = document.querySelectorAll(".bubble");

bubbles.forEach((bubble, i) => {
    bubble.style.transitionDelay = `${i*100}ms`;
    setTimeout(() => {
        bubble.classList.remove('hide-bubble');
        // reset the transition to 0 on each item
        setTimeout(() => {
            bubble.style.transitionDelay = `0ms`;
        }, 1500);
    }, 1300);
});