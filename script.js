let speech = new SpeechSynthesisUtterance();
let isSpeaking = false; // Variável para controlar o estado da fala

window.speechSynthesis.onvoiceschanged = () => {
  const voices = window.speechSynthesis.getVoices();
  const thalitaVoice = voices.find(voice => voice.name === "Microsoft Thalita Online (Natural) - Portuguese (Brazil)");
  if (thalitaVoice) {
    speech.voice = thalitaVoice;
  } else {
    console.error("Voz 'Microsoft Thalita Online (Natural) - Portuguese (Brazil)' não encontrada.");
  }
};

document.querySelector("button").addEventListener("click", () => {
  // Verifica se a síntese de fala está falando
  if (window.speechSynthesis.speaking) {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Cancela a fala atual
      isSpeaking = false;
    } else {
      // Reinicia a fala
      speech = new SpeechSynthesisUtterance(document.querySelector("#input-field").value);
      speech.voice = window.speechSynthesis.getVoices().find(voice => voice.name === "Microsoft Thalita Online (Natural) - Portuguese (Brazil)");
      window.speechSynthesis.speak(speech);
      isSpeaking = true;
    }
  } else {
    // Inicia a fala
    speech.text = document.querySelector("#input-field").value;
    window.speechSynthesis.speak(speech);
    isSpeaking = true;
  }
});

// Atualiza o estado isSpeaking quando a fala termina
speech.onend = () => {
  isSpeaking = false;
};