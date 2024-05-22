
function loadContent() {

    const UPPERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERS = "abcdefghijklmnopqrstuvwxyz";
    const NUMBERS = "0123456789";
    const SYMBOLS = "!@#$%^&*_-+=";

    const passwordTxt = document.querySelector("#result");
    const length = document.querySelector("#length");
    const incUpper = document.querySelector('#uppercase');
    const incLower = document.querySelector('#lowercase');
    const incNumbers = document.querySelector("#numbers");
    const incSymbols = document.querySelector("#symbols");
    const generateBtn = document.querySelector("#generate-pw-btn");
    const copyBtn = document.querySelector('#copy-to-clipboard-btn');

    // Untility: generate random number between min and max
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function copyToClipboard (str) {  
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            alert( `${str} copied to clipboard`);  
            return navigator.clipboard.writeText(str);
        }  return Promise.reject('The Clipboard API is not available.');
    };

    const generatePassword = (length, characters) => {
        let password = "";
        for (let i = 0; i < length; i++) {
            password += characters.charAt( randomNum(1, characters.length) );
        }
        return password;
    };

    function handlePasswordGeneration() {

        // make sure the password length is within bounds (min/max)
        let passwordLength = parseInt(length.value) < parseInt(length.min) ? length.min : length.value;
        passwordLength = parseInt(length.value) > parseInt(length.max) ? length.max : passwordLength;

        let characters = LOWERS;
        incUpper.checked ? (characters += UPPERS) : "";
        incNumbers.checked ? (characters += NUMBERS) : "";
        incSymbols.checked ? (characters += SYMBOLS) : "";
        passwordTxt.style.fontSize = '16px'
        length.value = passwordLength;
        passwordTxt.textContent = generatePassword(passwordLength, characters);
    }

    function handleCopyEvent() {
        copyToClipboard(passwordTxt.textContent)
            .catch((reason) => console.error(reason));
    }

   // On page load... 

   // Event Listeners
    generateBtn.addEventListener('click', handlePasswordGeneration);
    copyBtn.addEventListener('click', handleCopyEvent);
}

window.addEventListener('DOMContentLoaded', loadContent);