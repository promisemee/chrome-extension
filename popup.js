let inputLabel = document.getElementById("inputLabel");
let textInput = document.getElementById("textInput");
let erase = document.getElementById("xButton");

let arrow = document.getElementById("swapArrow");

let outputLabel = document.getElementById("outputLabel");
let textOutput = document.getElementById("textOutput");
let copy = document.getElementById("copyButton");

let toastMessage = document.getElementById('toastMessage');
let koreanInput = true;


erase.onclick = function() {
	textInput.value = '';
	textOutput.value = '';
}

copy.onclick = function() {
	textOutput.select();
	document.execCommand("copy");
	textOutput.value = "";
	showToastMessage('클립보드에 복사되었습니다');
}

arrow.onclick = function() {
	changeLanguage();
}

function showToastMessage(text){
	toastMessage.innerHTML = text;
	toastMessage.className = "show";
	setTimeout(function(){toastMessage.className = toastMessage.className.replace("show", "");}, 2000);
}

function changeLanguage(){
	if(koreanInput){//change to Korean->English
		koreanInput = false;
		inputLabel.innerHTML="한국어";
		outputLabel.innerHTML="영어";
	}else{
		koreanInput = true;
		inputLabel.innerHTML="영어";
		outputLabel.innerHTML="한국어";
	}
	let tmp = textInput.value;
	textInput.value = textOutput.value;
	textOutput.value = tmp;
	//change mode
}

function readJSON(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) { 
      if (this.status == 200) {
          var file = new File([this.response], 'temp');
          var fileReader = new FileReader();
          fileReader.addEventListener('load', function(){
              version = JSON.parse(fileReader.result) ? JSON.parse(fileReader.result).version : '';
              document.getElementById('version').innerHTML = `v ${version}`;
          });
          fileReader.readAsText(file);
      } 
    }
    xhr.send();
}