document.addEventListener("DOMContentLoaded", function() {
  var screen = document.getElementById("loginscreen"); 
  var card = screen.getElementsByClassName("card")[0];
  var code = {0: '10*/', 1: '2469', 2:'7*K', 3:'UwU', 4:'67', 5:'R2D2', 6:'5D//', 7:'UwU', 8:'994&',  9:'633/', 10:'83-X', 11:'UwU'};
  var order = ['5D//', '633/', '7*K', '10*/', '994&', '5D//', '83-X', '633/', '7*K', '10*/', '994&'];
  var progress = 0;

  for (let i = 0; i < 11; i++) 
    {screen.innerHTML = screen.innerHTML + card.outerHTML;
      screen.lastElementChild.dataset.number = code [i];
    }

  document.addEventListener("click", function() {
    var cardtext = event.target.closest('[data-number]');
    if (!cardtext) {return}
    if (order[progress] == cardtext.dataset.number || order[progress-1] == cardtext.dataset.number){progress++}
    else {progress = 0}
    console.log(progress);
    document.getElementById("R2D2").textContent = cardtext.dataset.number;
  });

 var activeButtons = new Set();

  document.querySelectorAll(`div[data-number="7*K"] path, div[data-number="5D//"] path, div[data-number="83-X"] path`).forEach(btn => {
  btn.addEventListener('touchstart', (e) => {
    activeButtons.add(btn);

    if (activeButtons.size === 3) {
      console.log("Alle 3 Buttons gleichzeitig berührt!");
      document.body.style.backgroundImage = "url('/Oregano.png')";
      document.body.innerHTML = "";
      setTimeout(()=> {window.location.reload}, 10000)
    }
  }, { passive: false });

  btn.addEventListener('touchend', (e) => {
    activeButtons.delete(btn);
  });

  btn.addEventListener('touchcancel', (e) => {
    activeButtons.delete(btn);
  });
});
});
