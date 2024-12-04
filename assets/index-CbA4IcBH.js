(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const v={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--.."};function T(n){return n.toUpperCase().split("").map(e=>v[e]).join(" ")}const p=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],g=["BONJOUR","CHAT","CHIEN","MERCI","SALUT","AMOUR","JOUER","PARIS","SOLEIL","MAISON","JARDIN","FLEUR","LIVRE","ECOLE","TRAIN"];function D(){return g[Math.floor(Math.random()*g.length)]}function A(){return p[Math.floor(Math.random()*p.length)]}const E={EASY:{name:"Facile",speedMultiplier:1.5,points:1},NORMAL:{name:"Normal",speedMultiplier:1,points:2},HARD:{name:"Difficile",speedMultiplier:.6,points:3}},c={DOT:100,DASH:300,PAUSE:100,LETTER_PAUSE:300};class b{constructor(){this.audioContext=new(window.AudioContext||window.webkitAudioContext)}playDot(e=1){this.playBeep(600,c.DOT*e)}playDash(e=1){this.playBeep(600,c.DASH*e)}playBeep(e,t){const s=this.audioContext.createOscillator(),i=this.audioContext.createGain();s.connect(i),i.connect(this.audioContext.destination),s.frequency.value=e,s.type="sine",i.gain.value=.1,s.start(),setTimeout(()=>{s.stop()},t)}}const N=4,B=4;function R(n,e){const t=new Set([n]);for(;t.size<N;){const s=e[Math.floor(Math.random()*e.length)];s!==n&&t.add(s)}return S([...t])}function P(n,e){const t=new Set([n]);for(;t.size<B;){const s=e[Math.floor(Math.random()*e.length)];s!==n&&t.add(s)}return S([...t])}function S(n){for(let e=n.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n}class x{constructor(){this.score=0,this.currentWord="",this.currentLetter="",this.currentOptions=[],this.isPlaying=!1,this.audioFeedback=new b,this.difficulty=E.NORMAL}start(){this.nextChallenge()}setDifficulty(e){this.difficulty=E[e],this.nextChallenge()}getDifficulty(){return this.difficulty}nextChallenge(){this.difficulty.name==="Facile"?(this.currentLetter=A(),this.currentWord="",this.currentOptions=P(this.currentLetter,p)):(this.currentWord=D(),this.currentLetter="",this.difficulty.name==="Normal"?this.currentOptions=R(this.currentWord,g):this.currentOptions=[])}getCurrentOptions(){return this.currentOptions}async playCurrentWord(){if(this.isPlaying)return;this.isPlaying=!0;const e=T(this.difficulty.name==="Facile"?this.currentLetter:this.currentWord),t=this.difficulty.speedMultiplier;for(const s of e)s==="."?(this.audioFeedback.playDot(t),window.navigator.vibrate&&window.navigator.vibrate(c.DOT),await new Promise(i=>setTimeout(i,c.DOT*2*t))):s==="-"?(this.audioFeedback.playDash(t),window.navigator.vibrate&&window.navigator.vibrate(c.DASH),await new Promise(i=>setTimeout(i,c.DASH*1.33*t))):s===" "&&await new Promise(i=>setTimeout(i,c.LETTER_PAUSE*t));this.isPlaying=!1}checkGuess(e){const t=this.difficulty.name==="Facile"?e.toUpperCase()===this.currentLetter:e.toUpperCase()===this.currentWord;return t&&(this.score+=this.difficulty.points,this.nextChallenge()),t}getCurrentWord(){return this.difficulty.name==="Facile"?this.currentLetter:this.currentWord}getScore(){return this.score}}class F{constructor(e){this.container=e,this.options=[],this.onSelect=null}render(e,t){this.container.innerHTML="",this.onSelect=t,e.forEach(s=>{const i=document.createElement("button");i.className="word-option",i.textContent=s,i.addEventListener("click",()=>this.handleSelect(s)),this.container.appendChild(i)})}handleSelect(e){this.onSelect&&this.onSelect(e)}hide(){this.container.style.display="none"}show(){this.container.style.display="block"}}const r=new x;r.start();const h=document.getElementById("play"),U=document.getElementById("submit"),a=document.getElementById("guess"),l=document.getElementById("score"),y=document.getElementById("high-score"),L=document.getElementById("toggle-help"),_=document.getElementById("morse-table"),W=document.getElementById("morse-grid"),u=document.getElementById("message"),O=document.querySelectorAll(".difficulty-btn"),I=document.getElementById("word-options"),H=document.getElementById("input-container"),k=document.getElementById("mode-description"),w=new F(I);let d=localStorage.getItem("morseHighScore")||0;y.textContent=d;Object.entries(v).forEach(([n,e])=>{const t=document.createElement("div");t.className="morse-item animate__animated",t.innerHTML=`<strong>${n}</strong><br>${e}`,t.addEventListener("mouseenter",()=>{t.classList.add("animate__pulse")}),t.addEventListener("animationend",()=>{t.classList.remove("animate__pulse")}),W.appendChild(t)});function M(){const n=r.getDifficulty(),e=n.name==="Facile",t=n.name==="Normal";I.style.display=e||t?"grid":"none",H.style.display=!e&&!t?"flex":"none",k.textContent=e?"Mode Facile : Devinez la lettre en morse":t?"Mode Normal : Devinez le mot en morse":"Mode Difficile : Écrivez le mot en morse",(e||t)&&w.render(r.getCurrentOptions(),m)}h.addEventListener("click",async()=>{h.classList.add("playing"),await r.playCurrentWord(),h.classList.remove("playing")});U.addEventListener("click",()=>m(a.value.trim()));a.addEventListener("keyup",n=>{n.key==="Enter"&&m(a.value.trim())});L.addEventListener("click",()=>{_.classList.toggle("visible"),L.innerHTML=_.classList.contains("visible")?'<span class="help-icon">📕</span> Cacher':'<span class="help-icon">📖</span> Alphabet Morse'});O.forEach(n=>{n.addEventListener("click",()=>{O.forEach(e=>e.classList.remove("active")),n.classList.add("active","animate__animated","animate__pulse"),r.setDifficulty(n.dataset.difficulty),M()})});function C(n,e){u.textContent=n,u.className=`message show ${e} animate__animated animate__fadeIn`,setTimeout(()=>{u.classList.remove("show","animate__fadeIn"),u.classList.add("animate__fadeOut")},2e3)}function m(n){if(!n)return;const e=r.checkGuess(n);r.getDifficulty().name==="Difficile"&&(a.value="");const t=r.getScore(),s=parseInt(l.textContent);t>s&&(l.classList.add("animate__animated","animate__bounceIn"),l.addEventListener("animationend",()=>{l.classList.remove("animate__animated","animate__bounceIn")},{once:!0})),l.textContent=t,e?(C("🎉 Correct ! Bravo !","success"),t>d&&(d=t,y.textContent=d,y.classList.add("animate__animated","animate__bounceIn"),localStorage.setItem("morseHighScore",d)),r.getDifficulty().name!=="Difficile"&&w.render(r.getCurrentOptions(),m)):(C("❌ Essayez encore !","error"),a&&(a.classList.add("animate__animated","animate__shakeX"),a.addEventListener("animationend",()=>{a.classList.remove("animate__animated","animate__shakeX")},{once:!0})))}M();
