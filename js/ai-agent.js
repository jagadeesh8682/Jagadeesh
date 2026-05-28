/* ═══════════════════════════════════════════════════════════════
   ai-agent.js  —  JAG-AI: Chat · Voice · Video
   Works 100% OFFLINE without any API key.
   Optional: Groq (FREE) or OpenAI key for richer answers.
   ═══════════════════════════════════════════════════════════════ */
'use strict';

const PROFILE_CONTEXT = `
You are JAG-AI, the personal AI assistant for Jagadeesh S, a Senior Flutter Developer.
Answer questions about him professionally and accurately. Be concise, friendly and confident.
When talking about him, mention his name once and then use pronouns; avoid repeating "Jagadeesh" in back-to-back sentences.
ABOUT: Jagadeesh S | Sr. Flutter Developer | 5 yrs experience | Hyderabad, India
CONTACT: jagadeeshs8682@gmail.com | +91 8682944609 | linkedin.com/in/jagadeesh-s-1aba83295 | github/jagadeesh8682
SKILLS: Flutter, Dart, Python (FastAPI/Django/Flask), Golang (Gin/Fiber/Echo/GORM/gRPC), GetX, Provider, Bloc, Redux, Dio, REST, AWS (S3/EC2/Lambda/CloudFront/RDS/IAM), Git, Docker, CI/CD, Firebase, Agora SDK, WebRTC, LLM Integration, Voice AI, Video Call AI, RAG Pipelines
EXPERIENCE:
1. Sr. Flutter Dev @ Dimensionleap (May 2025–Now): SpotLight AI film app + Aesthatiq telehealth
2. Flutter Dev @ AppifyRetail (Sep 2023–May 2025): 350+ vendor apps, CI/CD -40%, 95% crash-free
3. Flutter Dev @ VGrow (2022–2023): School app, 25% faster load
4. Jr. Flutter Dev @ Mcmewa Pharma (2021–2022): Pharma delivery, 90% tracking accuracy
OPEN SOURCE: ringtone_set_plus (pub.dev) 11 likes, 160pts, MIT
EDUCATION: B.Sc CS — Jaya Arts & Science College, Chennai
AVAILABILITY: Open to Senior Flutter / Agentic AI roles
`;

const KB = [
  { r: /who (is|are)|about (him|jagadeesh)|introduce|tell me about|summary/i,
    a: ()=>`Jagadeesh S is a **Senior Flutter Developer** with 5 years of cross-platform experience.\n\n🔹 Builds for iOS, Android, Web, Windows & macOS\n🔹 Expert in Agentic AI (voice, video, chat pipelines)\n🔹 Python (FastAPI/Django) & Golang (Gin/Fiber) backend\n🔹 AWS cloud (S3, EC2, Lambda, CloudFront)\n🔹 350+ apps on Play Store & App Store\n🔹 Open-source contributor on pub.dev` },
  { r: /skill|tech|stack|language|framework|what (can|does) he/i,
    a: ()=>`**Core tech stack:**\n\n📱 Flutter & Dart — cross-platform primary\n🐍 Python — FastAPI, Django, Flask, SQLAlchemy\n🐹 Golang — Gin, Fiber, Echo, GORM, gRPC\n🤖 Agentic AI — LLMs, Voice, Video, WebRTC, Agora\n☁️ AWS — S3, EC2, Lambda, CloudFront, IAM\n📦 State — GetX, Provider, Bloc, Redux\n🛠 Tools — Git, Docker, CI/CD, Firebase` },
  { r: /python|django|flask|fastapi|pydantic|sqlalchemy|celery/i,
    a: ()=>`**Python expertise:**\n\n🐍 FastAPI — high-performance async APIs\n🌐 Django — full-stack web framework\n⚡ Flask — lightweight microservices\n🔷 Pydantic — data validation\n🗄 SQLAlchemy — ORM & DB management\n⏱ Celery — async task queues\n📊 NumPy / Pandas — data processing` },
  { r: /golang|go lang|gin|fiber|echo|gorm|grpc|goroutine/i,
    a: ()=>`**Golang expertise:**\n\n🐹 Gin — fast HTTP framework\n⚡ Fiber — Express-inspired Go\n🔷 Echo — minimalist, high-perf\n🗄 GORM — ORM for Go\n🔗 gRPC — high-performance RPC\n⚙️ Go Routines — concurrency\n📦 Go Modules — dependency mgmt` },
  { r: /aws|amazon|s3|ec2|lambda|cloudfront|rds|iam|cloud/i,
    a: ()=>`**AWS Cloud skills:**\n\n☁️ S3 — static hosting & file storage\n🖥 EC2 — scalable compute\n⚡ Lambda — serverless functions\n🌐 CloudFront — CDN delivery\n🗄 RDS — managed databases\n🔐 IAM — access management\n🔌 API Gateway — REST API mgmt\n🌍 Route 53 — DNS routing` },
  { r: /experience|work|job|company|career|where (has|did) he/i,
    a: ()=>`**Career timeline:**\n\n1️⃣ **Dimensionleap** (May 2025–Now) — Sr. Flutter Dev\n   SpotLight AI + Aesthatiq telehealth\n\n2️⃣ **AppifyRetail** (2023–2025) — Flutter Dev\n   350+ vendor apps, 40% faster CI/CD\n\n3️⃣ **VGrow** (2022–2023) — School management\n\n4️⃣ **Mcmewa Pharma** (2021–2022) — Pharma delivery` },
  { r: /project|spotlight|aesthatiq|built|portfolio/i,
    a: ()=>`**Notable projects:**\n\n🎬 **SpotLight** — AI film app: script gen, scene AI, exports\n🏥 **Aesthatiq** — Telehealth: Agora video, doctor onboarding\n🛒 **350+ E-commerce apps** — Vendor storefronts\n🏫 **School Management** — Attendance, gate pass, homework` },
  { r: /ai|agentic|voice|video call|chat|llm|multimodal|rag|agora|webrtc/i,
    a: ()=>`**Agentic AI expertise:**\n\n💬 AI Chat — LLM context-aware conversations\n🎙️ Voice Assist — Web Speech API + synthesis\n📹 Video Call AI — Agora SDK, WebRTC, transcription\n🧠 RAG Pipelines — retrieval-augmented generation\n🌐 Multimodal — text + voice + video in one app` },
  { r: /open.?source|plugin|ringtone|pub.?dev|package/i,
    a: ()=>`**Open-source:**\n\n📦 **ringtone_set_plus** (pub.dev)\n• Set ringtone / alarm / notification on Android\n• ❤️ 11 likes · ⭐ 160 pts · MIT\n• github.com/jagadeesh8682/ringtone_set_plus` },
  { r: /hire|available|contact|opportunity|job|position/i,
    a: ()=>`Jagadeesh is **open to opportunities!** 🚀\n\n📧 jagadeeshs8682@gmail.com\n📞 +91 8682944609\n💼 linkedin/jagadeesh-s-1aba83295\n\nIdeal: Sr. Flutter Dev, Agentic AI Engineer, Full-Stack (Python/Go + Flutter)` },
  { r: /education|degree|college|university|bachelor/i,
    a: ()=>`🎓 **Bachelor's in Computer Science**\nJaya Arts & Science College, Chennai, India` },
  { r: /achievement|stat|number|how many|result|impact/i,
    a: ()=>`**Key achievements:**\n\n📱 350+ apps on Play Store & App Store\n✅ 95% crash-free rate\n🚀 40% faster release cycle (CI/CD)\n⚡ 30% productivity boost (SpotLight)\n🏃 25% faster load times (VGrow)\n🎯 90% tracking accuracy (Mcmewa)` },
];

function offline(q) {
  for (const e of KB) if (e.r.test(q)) return e.a();
  return `I'm JAG-AI! Ask me about Jagadeesh's:\n\n💬 **Skills** — Flutter, Python, Golang, AWS, Agentic AI\n📋 **Experience** — 5 years, 4 companies, 350+ apps\n🚀 **Projects** — SpotLight, Aesthatiq, E-commerce\n📞 **Availability** — Open to new opportunities`;
}

// ── State
// API key is stored in localStorage only — never hardcoded.
// Visitors can enter their own Groq or OpenAI key in the settings panel.
if (!localStorage.getItem('jag_ai_key')) { localStorage.setItem('jag_ai_provider', 'groq'); }
let apiKey = localStorage.getItem('jag_ai_key') || '';
let apiProvider = localStorage.getItem('jag_ai_provider') || 'groq';
let chatHistory = [{ role:'system', content: PROFILE_CONTEXT }];
let currentTab = 'chat', isSpeaking = false, isListening = false;
let isVideoActive = false, localStream = null, recognition = null;
let videoRecognition = null, videoMicMuted = false, cameraOff = false;
const isFile = location.protocol === 'file:';

// ── Modal
window.openAgentModal = (tab='chat') => { document.getElementById('agentOverlay').classList.add('open'); switchTab(tab); };
window.openAgent = window.openAgentModal;
window.closeAgentModal = () => { document.getElementById('agentOverlay').classList.remove('open'); stopAll(); };
document.getElementById('agentOverlay')?.addEventListener('click', e => { if (e.target.id==='agentOverlay') closeAgentModal(); });

window.addEventListener('DOMContentLoaded', () => {
  renderBar();
  document.getElementById('chatInput')?.addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey) sendMessage(); });
  if (isFile) {
    const w = document.getElementById('serverWarningBar');
    if (w) w.style.display = 'flex';
  }
});

// ── Tabs
window.switchTab = tab => {
  currentTab = tab;
  ['chat','voice','video'].forEach(t => {
    document.getElementById(`tab${t[0].toUpperCase()+t.slice(1)}`)?.classList.toggle('active', t===tab);
    document.getElementById(`panel${t[0].toUpperCase()+t.slice(1)}`)?.classList.toggle('active', t===tab);
  });
  document.getElementById('agentSubtitle').textContent = {
    chat:"Jagadeesh's Personal AI Agent", voice:'Voice AI — Speak naturally', video:'AI Video Call'
  }[tab];
  if (tab!=='voice') stopListening();
  if (tab!=='video') stopVideoCall();
  if (isFile && (tab==='voice'||tab==='video')) {
    const el = document.getElementById(tab==='voice'?'voiceStatus':'videoCallStatus');
    if (el) el.textContent = '⚠️ Run: python3 serve.py then open localhost:3000';
  }
};

// ── Chat
window.sendMessage = async () => {
  const inp = document.getElementById('chatInput'), txt = inp.value.trim();
  if (!txt) return; inp.value = '';
  pushMsg(txt,'user'); await chat(txt);
};
window.sendQuick = async txt => { pushMsg(txt,'user'); await chat(txt); };

function pushMsg(text, role) {
  const box = document.getElementById('chatMessages');
  const d = document.createElement('div'); d.className=`chat-msg ${role}`;
  const av = document.createElement('div'); av.className='chat-avatar-sm';
  av.innerHTML=`<i class="fa-solid ${role==='bot'?'fa-robot':'fa-user'}"></i>`;
  const b = document.createElement('div'); b.className='chat-bubble';
  b.textContent = text;
  d.appendChild(av); d.appendChild(b); box.appendChild(d); box.scrollTop=box.scrollHeight;
}

function pushBotHtml(html) {
  const box = document.getElementById('chatMessages');
  const d = document.createElement('div'); d.className='chat-msg bot';
  d.innerHTML=`<div class="chat-avatar-sm"><i class="fa-solid fa-robot"></i></div><div class="chat-bubble msg-html">${toHtml(html)}</div>`;
  box.appendChild(d); box.scrollTop=box.scrollHeight;
}

function toHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
}

function typing(show) {
  if (show) {
    const box=document.getElementById('chatMessages'), el=document.createElement('div');
    el.className='chat-msg bot'; el.id='typing-indicator';
    el.innerHTML=`<div class="chat-avatar-sm"><i class="fa-solid fa-robot"></i></div><div class="chat-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>`;
    box.appendChild(el); box.scrollTop=box.scrollHeight;
  } else { document.getElementById('typing-indicator')?.remove(); }
}

async function chat(txt) {
  chatHistory.push({role:'user',content:txt}); typing(true);
  await new Promise(r=>setTimeout(r,350));
  let resp = apiKey ? await callAI(chatHistory) : (await new Promise(r=>setTimeout(r,500)), offline(txt));
  typing(false); chatHistory.push({role:'assistant',content:resp}); pushBotHtml(resp);
}

async function callAI(msgs) {
  const ep = { groq:{url:'https://api.groq.com/openai/v1/chat/completions',model:'llama-3.1-8b-instant'}, openai:{url:'https://api.openai.com/v1/chat/completions',model:'gpt-4o-mini'} };
  const cfg = ep[apiProvider]||ep.openai;
  try {
    const r = await fetch(cfg.url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${apiKey}`},body:JSON.stringify({model:cfg.model,messages:msgs,max_tokens:450,temperature:0.7})});
    if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e?.error?.message||`HTTP ${r.status}`);}
    return (await r.json()).choices[0].message.content;
  } catch(e) {
    apiKey=''; localStorage.removeItem('jag_ai_key'); renderBar();
    return `⚠️ API error: ${e.message}\n\nUsing offline mode:\n\n${offline(msgs[msgs.length-1].content)}`;
  }
}

function renderBar() {
  const b = document.getElementById('apiKeyBar'); if(!b) return;
  b.style.display = 'none';
}
window.saveKey = () => {
  const k=document.getElementById('apiKeyInput')?.value.trim(), p=document.getElementById('pvSel')?.value||'groq';
  if(!k) return; apiKey=k; apiProvider=p; localStorage.setItem('jag_ai_key',k); localStorage.setItem('jag_ai_provider',p); renderBar();
  pushBotHtml(`✅ **${p.toUpperCase()} key saved!** Switching to live AI responses.`);
};
window.clearKey = () => { apiKey=''; localStorage.removeItem('jag_ai_key'); renderBar(); };

// ── Voice
function getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }

window.toggleVoiceAssist = () => {
  if (isFile) { setVS('⚠️ Open http://localhost:8080 — not file://'); return; }
  if (!getSR()) { setVS('⚠️ Use Chrome or Edge for voice support'); return; }
  isListening ? stopListening() : startListening();
};

function startListening() {
  // Clean up any existing instance
  try { if (recognition) { recognition.onend = null; recognition.abort(); } } catch(_) {}
  recognition = null; isListening = false;

  const SR = getSR();
  if (!SR) { setVS('⚠️ Use Chrome or Edge'); return; }

  setVS('🎤 Starting…');
  _doStartRecognition(SR);
}

function _doStartRecognition(SR) {
  recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isListening = true;
    setVS('🎙️ Listening… speak now');
    document.getElementById('voiceMicBtn')?.classList.add('listening');
    document.getElementById('voiceMicIcon').className = 'fa-solid fa-stop';
    document.getElementById('voiceBars')?.classList.add('active');
    document.querySelectorAll('.vring').forEach(r => r.classList.add('active'));
  };

  recognition.onresult = e => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    document.getElementById('voiceTranscript').textContent = `"${t}"`;
  };

  recognition.onend = async () => {
    isListening = false;
    document.getElementById('voiceMicBtn')?.classList.remove('listening');
    document.getElementById('voiceMicIcon').className = 'fa-solid fa-microphone';
    document.getElementById('voiceBars')?.classList.remove('active');
    document.querySelectorAll('.vring').forEach(r => r.classList.remove('active'));
    const raw = document.getElementById('voiceTranscript').textContent.replace(/^"|"$/g, '');
    if (raw && raw.length > 1) {
      setVS('🤔 Thinking…');
      document.getElementById('voiceResponse').textContent = '';
      const resp = apiKey
        ? await callAI([{ role:'system', content:PROFILE_CONTEXT }, { role:'user', content:raw }])
        : offline(raw);
      const plain = cleanVoiceReply(
        resp
          .replace(/\*\*/g,'')
          .replace(/<[^>]+>/g,' ')
          .replace(/&amp;/g,'&')
          .replace(/&lt;/g,'<')
          .replace(/&gt;/g,'>')
      );
      document.getElementById('voiceResponse').textContent = plain;
      speakText(plain);
      // Auto-restart listening after response (continuous mode)
      setTimeout(() => {
        if (currentTab === 'voice' && !isListening) {
          document.getElementById('voiceTranscript').textContent = '';
          try { recognition?.start(); } catch(_) {}
        }
      }, Math.min(plain.length * 50, 5000));
    } else {
      setVS('Tap the mic to start');
      // Restart listening if nothing was heard
      if (currentTab === 'voice') {
        setTimeout(() => {
          if (!isListening) try { recognition?.start(); } catch(_) {}
        }, 800);
      }
    }
  };

  recognition.onerror = e => {
    isListening = false;
    const msg = {
      'not-allowed': '⚠️ Mic denied — click 🔒 in address bar & allow mic',
      'no-speech':   'No speech heard — tap mic and try again',
      'network':     '⚠️ Network error — check connection',
      'aborted':     'Stopped',
    }[e.error] || `Error: ${e.error}`;
    setVS(msg);
    document.getElementById('voiceMicBtn')?.classList.remove('listening');
    document.getElementById('voiceMicIcon').className = 'fa-solid fa-microphone';
  };

  try {
    recognition.start();
  } catch(e) {
    setVS(`⚠️ Could not start mic: ${e.message}`);
  }
}

function stopListening() {
  try{recognition?.stop();}catch(_){}
  recognition=null; isListening=false;
  document.getElementById('voiceMicBtn')?.classList.remove('listening');
  const ic=document.getElementById('voiceMicIcon'); if(ic)ic.className='fa-solid fa-microphone';
  document.getElementById('voiceBars')?.classList.remove('active');
  setVS('Tap the mic to start');
}
function setVS(m){const e=document.getElementById('voiceStatus');if(e)e.textContent=m;}

function cleanVoiceReply(text) {
  // Remove repetitive intro/name patterns that sound unnatural in TTS.
  return text
    .replace(/I'd be happy to tell you about\s+Jagadeesh\s+S\.?\s*Jagadeesh\s+S\s+is/gi, 'Jagadeesh S is')
    .replace(/I\s*would\s*be\s*happy\s*to\s*tell\s*you\s*about\s+Jagadeesh\s+S\.?\s*Jagadeesh\s+S\s+is/gi, 'Jagadeesh S is')
    .replace(/\b(Jagadeesh\s+S\.?)\s+\1\b/gi, '$1')
    .replace(/\b(Jagadeesh\.?)\s+\1\b/gi, '$1')
    .trim();
}

function speakText(text) {
  window.stopSpeaking();
  if(!window.speechSynthesis)return;
  
  // Clean text: remove markdown, special chars that sound bad
  let clean = text
    .replace(/\*\*/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n/g, ' ')
    .replace(/  +/g, ' ')
    .slice(0, 1000)
    .trim();
  
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = 'en-US';
  u.rate = 0.85;  // Slower for clarity
  u.pitch = 0.95; // Slightly lower for naturalness
  u.volume = 1;
  
  // Get best voice: prefer native quality voices (Google, system defaults)
  const voices = window.speechSynthesis.getVoices();
  const best = voices.find(v => 
    v.name.includes('Google US English') ||
    v.name.includes('Google US') ||
    (v.name.includes('Samantha') && v.lang === 'en-US') ||
    (v.name.includes('Victoria') && v.lang === 'en-US') ||
    (v.name.includes('Karen') && v.lang === 'en-US') ||
    (v.name.includes('Moira') && v.lang === 'en-US') ||
    (v.name.includes('Fiona') && v.lang === 'en-US')
  ) || voices.find(v => v.lang === 'en-US' && !v.name.includes('Compact'));
  
  if (best) u.voice = best;
  
  u.onend = () => { isSpeaking=false; setVS('Tap the mic to start'); };
  u.onerror = (e) => { isSpeaking=false; setVS(`Voice error: ${e.error}`); };
  
  isSpeaking = true;
  setVS('🔊 Speaking…');
  window.speechSynthesis.speak(u);
}
window.stopSpeaking=()=>{window.speechSynthesis?.cancel();isSpeaking=false;setVS('Tap the mic to start');};

window.toggleVoiceInput = () => {
  const btn=document.getElementById('chatVoiceBtn');
  if(isFile){document.getElementById('chatInput').placeholder='⚠️ Voice needs localhost — run python3 serve.py';return;}
  if(!SR){document.getElementById('chatInput').placeholder='Voice not supported — use Chrome';return;}
  if(isListening&&recognition){recognition.stop();btn.classList.remove('recording');return;}
  const r=new SR();r.continuous=false;r.interimResults=true;r.lang='en-US';recognition=r;
  r.onstart=()=>{isListening=true;btn.classList.add('recording');document.getElementById('chatInput').placeholder='🎙️ Listening…';};
  r.onresult=e=>{document.getElementById('chatInput').value=Array.from(e.results).map(r=>r[0].transcript).join('');};
  r.onend=()=>{isListening=false;btn.classList.remove('recording');document.getElementById('chatInput').placeholder='Ask about Jagadeesh…';if(document.getElementById('chatInput').value.trim())sendMessage();};
  r.onerror=()=>{isListening=false;btn.classList.remove('recording');};
  r.start();
};

// ── Video
window.toggleVideoCall = async()=>{ isVideoActive?stopVideoCall():await startVideoCall(); };

async function startVideoCall() {
  const st=document.getElementById('videoCallStatus');
  if(isFile){st.textContent='⚠️ Run: python3 serve.py — camera needs localhost';return;}
  if(!navigator.mediaDevices?.getUserMedia){st.textContent='⚠️ Camera API not available';return;}
  try {
    st.textContent='📡 Connecting…';
    localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    document.getElementById('localVideo').srcObject=localStream;
    isVideoActive=true;
    document.getElementById('vcCallBtn').classList.add('in-call');
    document.getElementById('vcCallIcon').className='fa-solid fa-phone-slash';
    st.textContent='🟢 In call with JAG-AI';
    setTimeout(startVideoVoice,1500);
  } catch(e){st.textContent=`⚠️ ${e.name==='NotAllowedError'?'Allow camera & mic in browser settings':e.message}`;}
}

function stopVideoCall() {
  localStream?.getTracks().forEach(t=>t.stop()); localStream=null;
  document.getElementById('localVideo').srcObject=null;
  try{videoRecognition?.stop();}catch(_){}
  videoRecognition=null; window.stopSpeaking(); isVideoActive=false;
  const cb=document.getElementById('vcCallBtn');if(cb)cb.classList.remove('in-call');
  const ci=document.getElementById('vcCallIcon');if(ci)ci.className='fa-solid fa-video';
  const ss=document.getElementById('videoCallStatus');if(ss)ss.textContent='Ready to connect';
  const tr=document.getElementById('videoTranscript');if(tr)tr.textContent='';
}

function startVideoVoice() {
  if(!SR||!isVideoActive)return;
  videoRecognition=new SR();videoRecognition.continuous=true;videoRecognition.interimResults=false;videoRecognition.lang='en-US';
  videoRecognition.onresult=async e=>{
    const txt=e.results[e.results.length-1][0].transcript;
    const tb=document.getElementById('videoTranscript');if(tb)tb.textContent=`You: "${txt}"`;
    document.getElementById('videoAiSpeaking')?.classList.add('active');
    const resp=apiKey?await callAI([{role:'system',content:PROFILE_CONTEXT},{role:'user',content:txt}]):offline(txt);
    const plain=resp.replace(/\*\*/g,'').replace(/<[^>]+>/g,' ');
    if(tb)tb.textContent=`You: "${txt}" → JAG-AI responding…`;
    speakText(plain);
    setTimeout(()=>document.getElementById('videoAiSpeaking')?.classList.remove('active'),Math.min(plain.length*55,7000));
  };
  videoRecognition.onerror=()=>{};
  videoRecognition.onend=()=>{if(isVideoActive)setTimeout(()=>{try{videoRecognition?.start();}catch(_){}},600);};
  try{videoRecognition.start();}catch(_){}
}

window.toggleVideoMic=()=>{
  videoMicMuted=!videoMicMuted;
  localStream?.getAudioTracks().forEach(t=>{t.enabled=!videoMicMuted;});
  document.getElementById('vcMicBtn')?.classList.toggle('muted',videoMicMuted);
  document.getElementById('vcMicIcon').className=videoMicMuted?'fa-solid fa-microphone-slash':'fa-solid fa-microphone';
};
window.toggleCamera=()=>{
  cameraOff=!cameraOff;
  localStream?.getVideoTracks().forEach(t=>{t.enabled=!cameraOff;});
  document.getElementById('vcCamBtn')?.classList.toggle('muted',cameraOff);
  document.getElementById('vcCamIcon').className=cameraOff?'fa-solid fa-video-slash':'fa-solid fa-camera';
};

function stopAll(){stopListening();window.stopSpeaking();stopVideoCall();}
if(window.speechSynthesis)window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();
