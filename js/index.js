function OnLoad() {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
      }, false)
  })
}

function CalcImc() {
  const formImc = document.querySelector("#formImc");
  let isFormValid = formImc.checkValidity();
  formImc.classList.add('was-validated');
  if(!isFormValid) return;

  const weight = AssignInput(document.querySelector("#weightInput"));
  const heigth = AssignInput(document.querySelector("#heightInput")) / 100;
  const imc = (weight / (heigth * heigth)).toFixed(2);

  console.log(`${weight} / (${heigth} * ${heigth}) = ${imc}`);
  document.querySelector("#imcInput").value = imc;

  if(imc > 24.9) {
    const failModal = new bootstrap.Modal(document.querySelector("#failModal"));
    failModal.show();
    return;
  }

  const formTraining = document.querySelector("#formTraining");
  const imcBtn = document.querySelector("#imcBtn");

  imcBtn.hidden = true;
  formTraining.hidden = false;
}

function CalcTrain() {
  const formTraining = document.querySelector("#formTraining");
  let isFormValid = formTraining.checkValidity();
  formTraining.classList.add('was-validated');
  if(!isFormValid) return;

  const trainTimes = AssignInput(document.querySelector("#timesInput"));
  const trainMins = AssignInput(document.querySelector("#minsInput"));

  const trainTotal = trainMins * trainTimes;

  if(trainTotal < 300) {
    const failModal = new bootstrap.Modal(document.querySelector("#failModal"));
    const failModalText = document.querySelector("#failModalText");
    document.querySelector("#failModalLabel").textContent = "Obrigado!";
    failModalText.textContent = "Muito obrigado, agradecemos a sua participação!";
    failModalText.classList.add("text-success");
    failModal.show();
    return;
  }

  const nameModal = new bootstrap.Modal(document.querySelector("#nameModal"));
  nameModal.show();
}

function FinishSubscription(){
  const formName = document.querySelector("#formName");
  let isFormValid = formName.checkValidity();
  formName.classList.add('was-validated');
  if(!isFormValid) return;
  document.location.reload();
}

function AssignInput(input){
  if(input.type == "number"){
      if(isNaN(parseInt(input.value)) || parseInt(input.value) < 0) {
          input.value = 0;
      }
      return parseInt(input.value);
  }
  return input.value;
}