const text = document.querySelector("#text");
const upload = document.querySelector("#upload");
const voice = document.querySelector("#voice");
const listenBtn = document.querySelector(".listenBtn");
const dowloadBtn = document.querySelector("#dowloadBtn");

//API
const speak = new SpeechSynthesisUtterance();
//VOICES
let availableVoices = [];
//SELECT OF VOICE
const attValues = () => {
    availableVoices = window.speechSynthesis.getVoices()

    speak.voice = availableVoices[0]

    console.log(availableVoices)

    availableVoices.forEach((voices, index) => {
    const option = document.createElement("option")
    option.value = index
    option.textContent = voices.name
    voice.appendChild(option)
});
}
//CALL OF FUNTION ATTVALUE
window.speechSynthesis.onvoiceschanged = attValues
//BUTTON OF VOICE
voice.addEventListener("change", ()=> {
    speak.voice = availableVoices[voice.value]
});
//BUTTON OF LISTEN
listenBtn.addEventListener("click", ()=>{
    speak.text = text.value
    window.speechSynthesis.speak(speak)
});
//BUTTON DOWLOAD FILE
dowloadBtn.addEventListener("click", ()=>{
    const downText = text.value
    const blob = new Blob([downText], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href= url
    a.download="conversor.txt"
    a.click()
    //undo the link
    URL.revokeObjectURL(url)
});
//UPLOAD OF FILE
upload.addEventListener("change", (event)=>{
    const archive = event.target.files[0]
    if(archive){
        const reader = new FileReader()
        reader.onload = (e) => {
            text.value  = e.target.result
        }

        reader.readAsText(archive)
    }
});