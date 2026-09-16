/* =====================================================================
   CONFIGURACIÓN — EDITÁ SOLO ESTA PARTE CON TUS DATOS
   ===================================================================== */
const CONFIG = {
  nombre: "Brenda",  // Nombre de la cumpleañera

  // Fecha y hora del evento en formato: "AAAA-MM-DDTHH:MM:SS"
  // Ojo: los meses van de 01 a 12. Este ejemplo es 14 de noviembre de 2026, 20:00.
  fechaHoraISO: "2026-11-14T21:00:00",

  // Textos que se muestran (podés ponerlos como quieras)
  fechaTexto: "Sabado 14 de noviembre",
  horaTexto: "21:00 hs — Recepción a las 21:00 hs",

  // Lugar
  lugarNombre: "Asociación Fomento y Cultural 12 de Octubre",
  lugarDireccion: "Condarco 1415, Quilmes, Buenos Aires",

  // Link de Google Maps para el botón "Cómo llegar"
  // (Buscá el lugar en Google Maps, tocá "Compartir" y copiá el link)
  mapsLink: "https://maps.app.goo.gl/7YQ6nKZmenU6Zcuq8",

  // Link para el mapa incrustado (en Google Maps: Compartir > Insertar un mapa > copiá solo la URL que está dentro de src="...")
  mapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26230.800680721422!2d-58.297190714508375!3d-34.734173020569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32e771dc4ed6d%3A0x83d393bec13d1d85!2sAsociaci%C3%B3n%20Fomento%20y%20Cultural%2012%20de%20Octubre!5e0!3m2!1ses-419!2sar!4v1789399208836!5m2!1ses-419!2sar",

  // Alias para transferencias / regalo
  alias: "noahysanti.mp",

  //whatsappNumero: "5491135841966",
  //whatsappNumero: "5491165388959"

    // Los dos números de WhatsApp que pueden recibir la confirmación, con
  // código de país y sin espacios, signos ni el "+" (ej. Argentina: "5491112345678")
  whatsappUno: "5491165388959",
  whatsappUnoNombre: "Monica",

  whatsappDos: "5491135841966",
  whatsappDosNombre: "Adrian",

  // Mensaje que se envía al confirmar (se usa para los dos números)
  mensajeConfirma: "¡Hola! Confirmo que voy a estar en los 15 años de Brenda. ¡Nos vemos! 🎉",
  mensajeDeclina: "¡Hola! Por este mensaje te aviso que no voy a poder estar en los 15 años de Brenda, pero te mando un montón de cariño. 💛",

  // Link directo a un archivo de audio (mp3). Podés subir una canción a
  // un hosting como GitHub, Dropbox (con ?dl=1 al final) o similar.
  musicaSrc: "img/Saxofonista para 15 años 🎷.mp3"
};

/* =====================================================================
   NO HACE FALTA EDITAR DE ACÁ PARA ABAJO
   ===================================================================== */
(function(){

  // --- Volcar los datos de CONFIG en la página ---
  document.title = "Mis 15 años — " + CONFIG.nombre;
  document.getElementById('welcomeName').textContent = CONFIG.nombre;
  document.getElementById('welcomeDate').textContent = CONFIG.fechaTexto;
  document.getElementById('heroName').textContent = CONFIG.nombre;
  document.getElementById('heroDate').textContent = CONFIG.fechaTexto + ' · ' + CONFIG.horaTexto;
  document.getElementById('footerName').textContent = CONFIG.nombre;
  document.getElementById('detailFecha').textContent = CONFIG.fechaTexto;
  document.getElementById('detailHora').textContent = CONFIG.horaTexto;
  document.getElementById('detailLugar').textContent = CONFIG.lugarNombre + ' — ' + CONFIG.lugarDireccion;
  document.getElementById('mapsLink').href = CONFIG.mapsLink;
  document.getElementById('mapEmbed').src = CONFIG.mapsEmbedSrc;
  document.getElementById('giftAlias').textContent = CONFIG.alias;

  const targetDate = new Date(CONFIG.fechaHoraISO);

  // --- Cuenta regresiva ---
  const elDias  = document.getElementById('cd-dias');
  const elHoras = document.getElementById('cd-horas');
  const elMin   = document.getElementById('cd-min');
  const elSeg   = document.getElementById('cd-seg');
  const countdownBox = document.getElementById('countdown');

  function pad(n){ return String(n).padStart(2,'0'); }

  function updateCountdown(){
    const now = new Date();
    const diff = targetDate - now;

    if(diff <= 0){
      countdownBox.innerHTML = '<div class="countdown-done">¡Hoy es el gran día! ✦</div>';
      clearInterval(timer);
      return;
    }

    const totalSeg = Math.floor(diff/1000);
    const dias  = Math.floor(totalSeg / 86400);
    const horas = Math.floor((totalSeg % 86400) / 3600);
    const min   = Math.floor((totalSeg % 3600) / 60);
    const seg   = totalSeg % 60;

    elDias.textContent  = pad(dias);
    elHoras.textContent = pad(horas);
    elMin.textContent   = pad(min);
    elSeg.textContent   = pad(seg);
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  // --- Copiar alias ---
  const copyBtn = document.getElementById('copyBtn');
  const copyMsg = document.getElementById('copyMsg');

  copyBtn.addEventListener('click', async function(){
    const text = CONFIG.alias;
    try{
      await navigator.clipboard.writeText(text);
      showCopyMsg('¡Alias copiado!');
    }catch(err){
      // Método alternativo por si el navegador bloquea el clipboard API
      const temp = document.createElement('textarea');
      temp.value = text;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      try{
        document.execCommand('copy');
        showCopyMsg('¡Alias copiado!');
      }catch(e){
        showCopyMsg('No se pudo copiar, copialo manualmente.');
      }
      document.body.removeChild(temp);
    }
  });

  function showCopyMsg(msg){
    copyMsg.textContent = msg;
    setTimeout(()=>{ copyMsg.textContent = ''; }, 2500);
  }

      // --- Confirmación por WhatsApp (dos números posibles) ---
  function abrirWhatsApp(numero, mensaje){
    const numeroLimpio = numero.replace(/\D/g, '');
    const texto = encodeURIComponent(mensaje);
    const url = 'https://wa.me/' + numeroLimpio + '?text=' + texto;
    window.open(url, '_blank', 'noopener');
  }

  document.getElementById('rsvpUnoLabel').textContent = 'Confirmar con ' + CONFIG.whatsappUnoNombre;
  document.getElementById('rsvpDosLabel').textContent = 'Confirmar con ' + CONFIG.whatsappDosNombre;

  document.getElementById('rsvpUno').addEventListener('click', function(){
    abrirWhatsApp(CONFIG.whatsappUno, CONFIG.mensajeConfirma);
  });
  document.getElementById('rsvpDos').addEventListener('click', function(){
    abrirWhatsApp(CONFIG.whatsappDos, CONFIG.mensajeConfirma);
  });

  // --- Música de fondo ---
  const audio = document.getElementById('bgMusic');
  const audioSource = document.getElementById('bgMusicSource');
  const musicBtn = document.getElementById('musicToggle');
  let musicReady = false;

  if(CONFIG.musicaSrc){
    audioSource.src = CONFIG.musicaSrc;
    audio.load();
    musicReady = true;
  }

  function playMusic(){
    if(!musicReady) return;
    audio.play().then(()=>{
      musicBtn.classList.add('playing');
      musicBtn.setAttribute('aria-pressed','true');
      musicBtn.setAttribute('aria-label','Pausar música');
    }).catch(()=>{ /* el navegador bloqueó el autoplay, no pasa nada */ });
  }

  function toggleMusic(){
    if(!musicReady){
      showCopyMsgGeneric('Agregá tu música en CONFIG.musicaSrc');
      return;
    }
    if(audio.paused){
      playMusic();
    }else{
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('aria-pressed','false');
      musicBtn.setAttribute('aria-label','Reproducir música');
    }
  }

  function showCopyMsgGeneric(msg){
    copyMsg.textContent = msg;
    setTimeout(()=>{ copyMsg.textContent = ''; }, 3000);
  }

  musicBtn.addEventListener('click', toggleMusic);

  // --- Pantalla de bienvenida: abre la invitación y arranca la música ---
  const welcome = document.getElementById('welcome');
  const openBtn = document.getElementById('openBtn');
  const main = document.getElementById('main');

  openBtn.addEventListener('click', function(){
    welcome.classList.add('hidden');
    main.classList.add('visible');
    playMusic(); // gesto del usuario -> el navegador permite el autoplay
    startPetals();
  });

  // --- Pétalos cayendo ---
  const petalsContainer = document.getElementById('petals');
  const petalChars = ['🦋'];
  let petalsStarted = false;

  function startPetals(){
    if(petalsStarted) return;
    petalsStarted = true;

    function spawnPetal(){
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = petalChars[Math.floor(Math.random()*petalChars.length)];
      const left = Math.random()*100;
      const duration = 9 + Math.random()*8;
      const drift = (Math.random()*140 - 70) + 'px';
      const size = 0.7 + Math.random()*0.9;

      petal.style.left = left + 'vw';
      petal.style.fontSize = size + 'rem';
      petal.style.setProperty('--drift', drift);
      petal.style.animationDuration = duration + 's';

      petalsContainer.appendChild(petal);
      setTimeout(()=> petal.remove(), duration*1000 + 200);
    }

    // pétalos iniciales espaciados
    for(let i=0;i<6;i++){
      setTimeout(spawnPetal, i*900);
    }
    setInterval(spawnPetal, 2200);
  }

})();
