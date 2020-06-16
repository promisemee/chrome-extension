let inputLabel = document.getElementById("inputLabel");
let textInput = document.getElementById("textInput");
let erase = document.getElementById("xButton");

let arrow = document.getElementById("swapArrow");

let outputLabel = document.getElementById("outputLabel");
let textOutput = document.getElementById("textOutput");
let copy = document.getElementById("copyButton");

let toastMessage = document.getElementById('toastMessage');
let koreanInput = true;

textInput.onkeyup = function(element){
	if(event.keyCode == 13){
		let input = element.target.value;
		var src, tar;
		if(koreanInput){src = 'ko'; tar = 'en';}
		else{src = 'en'; tar = 'ko';}
		textOutput.value = translateInput(input, src, tar);
	}
}

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
	if(koreanInput){
		koreanInput = false;
		inputLabel.innerHTML="영어";
		outputLabel.innerHTML="한국어";
	}else{
		koreanInput = true;
		inputLabel.innerHTML="한국어";
		outputLabel.innerHTML="영어";
	}
	let tmp = textInput.value;
	textInput.value = textOutput.value;
	textOutput.value = tmp;
}

const projectId = 'PROJECT_ID';

function translateInput(query, src, tar){
	const request = {
		parent: translationClient.locationPath(projectId, location),
		contents: [query],
		mimeType: 'text/plain',
		sourceLanguageCode : src,
		targetLanguageCode : tar,
	};
	const [response] = translationClient.translateText(request);
	return translation.translatedText;
}
