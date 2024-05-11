// Write your JavaScript code here
function loadContent() {
   const links = document.querySelectorAll('a');
   const avatars = document.querySelectorAll('.avatar');
   const images = document.querySelectorAll('.avatar__img');

   // Marcin Malecki's thumbnail hack
   if (navigator.userAgent.includes("Headless")) {
       document.body.style.setProperty("padding-block-end", "0");
       document.body.style.setProperty("margin-block-start", "152px");
       document.body.style.setProperty("min-block-size", "0");
       document.body.style.setProperty("block-size", "calc(100vh - 304px)");
       document.body.style.setProperty("position", "relative");
   }

   function handleAvatarClick() {
       images.forEach(avatar => avatar === this ? 
           avatar.classList.add('active') : 
           avatar.classList.remove('active'));
   }

   // Event Listeners
   links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
   images.forEach(avatar => avatar.addEventListener('click', handleAvatarClick));

   // On page load, iterate through all the avatars
   avatars.forEach((avatar, index) => {
       // calculuate the angle to rotate the avatar (container)
       avatar.style.setProperty('--angle', `${index * 360 / images.length}deg`);

       // select the avatar text content
       const text = avatar.querySelector('.avatar__txt');

       // 1) split the text into an array of characters
       // 2) iterate through the array and 
       //      a) create individual span elements for each char
       //      b) calculate/set the rotation angle for each char
       // 3) (re)join the array elements into a string
       // 4) set the innerHTML to the contents of the HTML string
       text.innerHTML = text.textContent
           .split('')
           .map((char, i, arr) => `<span class="char" style="transform:rotate(${i * (270/(arr.length))}deg)">${char}</span>`)
           .join('');
   })
}

document.addEventListener('DOMContentLoaded', loadContent);