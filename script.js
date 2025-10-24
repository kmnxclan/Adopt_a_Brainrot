// v0.1 — basic needs, localStorage save, simple animations


feedBtn.addEventListener('click', ()=>{
pet.hunger = Math.min(100, pet.hunger + 25);
pet.coins += 5;
animate('playing');
addLog('You fed ' + pet.name + '.');
save(); renderAll();
});
cleanBtn.addEventListener('click', ()=>{
pet.clean = Math.min(100, pet.clean + 35);
animate('cleaning');
addLog('You cleaned ' + pet.name + '.');
save(); renderAll();
});
playBtn.addEventListener('click', ()=>{
pet.energy = Math.max(0, pet.energy - 20);
pet.hunger = Math.max(0, pet.hunger - 10);
pet.coins += 10;
animate('playing');
addLog('You played mini-game with ' + pet.name + ' and won coins!');
if(pet.energy <= 0) addLog(pet.name + ' is tired.');
save(); renderAll();
});


evolveBtn.addEventListener('click', ()=>{
if(pet.level >= 3){ addLog(pet.name + ' is max level.'); return }
if(pet.coins < 50) { addLog('Need 50 coins to evolve!'); return }
pet.coins -= 50;
pet.level += 1;
addLog(pet.name + ' evolved to level ' + pet.level + '!');
// cosmetic change: slightly change pet image (you can add images in assets)
petImg.src = 'assets/pet_skibidi_level' + pet.level + '.png';
save(); renderAll();
});


function animate(cls){
petSprite.classList.remove('idle');
petSprite.classList.add(cls);
setTimeout(()=>{ petSprite.classList.remove(cls); petSprite.classList.add('idle') },900);
}


function addLog(text){
const el = document.createElement('div');
el.textContent = '[' + new Date().toLocaleTimeString() + '] ' + text;
logEl.prepend(el);
}


function renderAll(){
petName.textContent = pet.name + ' (Lv ' + pet.level + ')';
hungerVal.textContent = Math.round(pet.hunger);
cleanVal.textContent = Math.round(pet.clean);
energyVal.textContent = Math.round(pet.energy);
moodVal.textContent = getMood();
coinsEl.textContent = 'Coins: ' + pet.coins;
}


function getMood(){
if(pet.hunger < 30 || pet.clean < 30 || pet.energy < 20) return 'Sad'
if(pet.hunger > 70 && pet.clean > 70 && pet.energy > 60) return 'Happy'
return 'Okay'
}


// simple passive decay over time
function tick(){
const now = Date.now();
const elapsed = Math.floor((now - pet.lastTick) / 1000);
if(elapsed >= 10){
// every 10s decay
const steps = Math.floor(elapsed / 10);
pet.hunger = Math.max(0, pet.hunger - 2*steps);
pet.clean = Math.max(0, pet.clean - 1*steps);
pet.energy = Math.max(0, pet.energy - 1*steps);
pet.lastTick = now;
save(); renderAll();
// small random events
if(Math.random() < 0.08){
addLog('Random Event: Skibidi Invasion! Coins +20');
pet.coins += 20; save(); renderAll();
}
}
// call again
requestAnimationFrame(tick);
}


// localStorage helpers
function save(){
localStorage.setItem('adopt_brainrot_v0', JSON.stringify(pet));
}
function load(){
try{ return JSON.parse(localStorage.getItem('adopt_brainrot_v0')) }catch(e){return null}
}


// initial render for menu
renderAll();
