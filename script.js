let passwordLength = 16;
const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");

function generatePassword() {
  let chars = "abcdefghjklmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const nuberChars = "123456789";
  const symbolChars = "?!@*#()&$[]";

  //Confere a marcação dos checkbox e atribui seus valores para a let chars.
  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }
  if (numberCheckEl.checked) {
    chars += nuberChars;
  }
  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = "";

  for (let i = 0; i < passwordLength; i++) {//Percorre toda a length do chars.
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password; //Joga o value da let password la pro meu input #password.
  
  calculateQuality()
  calculateFontSize()
} // FIM DA FUNCTION generatePassword().

function calculateQuality() {//Faz o calculo de de porcentagem de segurança para alterar color da "div #security-indicator-bar".
   const percent = Math.round((passwordLength / 64) * 25 
   + (upperCaseCheckEl.checked ? 15 : 0) 
   + (numberCheckEl.checked ? 25 : 0)
   + (symbolCheckEl.checked ? 35 : 0))

   securityIndicatorBarEl.style.width = `${percent}%`

   if(percent > 69) {//Atribui a analise para designar a classe para bar e add a color.
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.add('safe')
   }else if(percent > 50){
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.add('warning')
    securityIndicatorBarEl.classList.remove('safe')
   }else {
    securityIndicatorBarEl.classList.add('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.remove('safe')
   }


   if(percent >= 100){//Para add border-radius quando a bar estivel 100% completed.
    securityIndicatorBarEl.classList.add('completed')
   }else {
    securityIndicatorBarEl.classList.remove('completed')
   }

}

function calculateFontSize() {
    if (passwordLength > 45) {
      inputEl.classList.remove("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.add("font-xxs")
    } else if (passwordLength > 32) {
      inputEl.classList.remove("font-sm")
      inputEl.classList.add("font-xs")
      inputEl.classList.remove("font-xxs")
    } else if (passwordLength > 22) {
      inputEl.classList.add("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.remove("font-xxs")
    } else {
      inputEl.classList.remove("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.remove("font-xxs")
    }
  }

function copy() {
  navigator.clipboard.writeText(inputEl.value); //Copiar o valor dentro do input #password.
} // FIM DA FUNCTION copy().

function aviso() {
  alert("Senha copiada com sucesso!");
}

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function () { //Adiciona o evento ao input range.
  passwordLength = passwordLengthEl.value;
  document.querySelector("#password-length-text").innerText = passwordLength;
  generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy); //Adicionou um evento ao button de 'copiar senha'.
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#copy-1").addEventListener("click", aviso);
document.querySelector("#copy-2").addEventListener("click", aviso);
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword();
