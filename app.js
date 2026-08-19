const houseView=document.getElementById('houseView');
const kitchenView=document.getElementById('kitchenView');
const panel=document.getElementById('toolPanel');
const content=document.getElementById('panelContent');
const defaultGroceries=['Milk','Eggs','Bread'];

async function loadGeneratedArtwork(){
  const artwork=[
    ['.house-stage','./assets/house-game.b64'],
    ['.kitchen-stage','./assets/kitchen-game.b64']
  ];
  try{
    await Promise.all(artwork.map(async([selector,url])=>{
      const target=document.querySelector(selector);
      if(!target)return;
      const response=await fetch(url,{cache:'force-cache'});
      if(!response.ok)throw new Error(`Unable to load ${url}`);
      const data=(await response.text()).trim();
      target.style.backgroundImage=`url("data:image/jpeg;base64,${data}")`;
      target.classList.add('generated-art');
    }));
    document.body.classList.add('generated-art-ready');
  }catch(error){
    console.warn('Generated artwork could not be loaded. Using fallback artwork.',error);
  }
}

function showScreen(screen){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  screen.classList.add('active');
}

function enterRoom(room){
  if(room==='kitchen'){
    document.body.classList.add('entering-room');
    setTimeout(()=>{showScreen(kitchenView);document.body.classList.remove('entering-room');},180);
  }else{
    const label=room.charAt(0).toUpperCase()+room.slice(1);
    showToast(`${label} is coming next. Kitchen is the fully interactive room right now.`);
  }
}

function returnToHouse(){
  panel.classList.remove('open');
  showScreen(houseView);
}

document.querySelectorAll('.room-zone').forEach(btn=>btn.addEventListener('click',()=>enterRoom(btn.dataset.room)));
document.getElementById('backBtn').addEventListener('click',returnToHouse);
document.getElementById('artBackBtn')?.addEventListener('click',returnToHouse);
document.getElementById('closePanel').addEventListener('click',()=>panel.classList.remove('open'));

function showToast(message){
  const old=document.querySelector('.game-toast');if(old)old.remove();
  const toast=document.createElement('div');toast.className='game-toast';toast.textContent=message;document.body.appendChild(toast);
  requestAnimationFrame(()=>toast.classList.add('show'));
  setTimeout(()=>{toast.classList.remove('show');setTimeout(()=>toast.remove(),250)},2200);
}

function getGroceries(){return JSON.parse(localStorage.getItem('madhouse-groceries')||JSON.stringify(defaultGroceries));}
function saveGroceries(items){localStorage.setItem('madhouse-groceries',JSON.stringify(items));}

function groceryUI(){
  const items=getGroceries();
  content.innerHTML=`<h3>🛒 Grocery List</h3><p>See what your household needs and shop smarter.</p><div class="add-row"><input id="groceryInput" placeholder="Add an item..." autocomplete="off"><button id="addGrocery">+</button></div><ul class="grocery-list">${items.map((x,i)=>`<li><input type="checkbox" aria-label="Mark ${x} complete"><span>${x}</span><button data-remove="${i}" aria-label="Remove ${x}">✕</button></li>`).join('')}</ul>`;
  const input=document.getElementById('groceryInput');
  const add=()=>{if(!input.value.trim())return;items.push(input.value.trim());saveGroceries(items);groceryUI();};
  document.getElementById('addGrocery').onclick=add;
  input.addEventListener('keydown',e=>{if(e.key==='Enter')add();});
  content.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{items.splice(Number(b.dataset.remove),1);saveGroceries(items);groceryUI();});
}

function simpleUI(title,emoji,body,action){
  content.innerHTML=`<h3>${emoji} ${title}</h3><p>${body}</p><div class="empty-card"><strong>${action}</strong><br><small>This room feature is connected and ready for the next functional build.</small></div>`;
}

function openTool(tool){
  panel.classList.add('open');
  if(tool==='grocery')groceryUI();
  if(tool==='pantry')simpleUI('Pantry Inventory','🥫','See what is already in the house before you shop.','Next: quantities, low-stock alerts and expiration dates');
  if(tool==='planner')simpleUI('Meal Planner','🍲','Plan breakfast, lunch and dinner without leaving the kitchen scene.','Next: drag meals onto a weekly calendar');
  if(tool==='recipes')simpleUI('Saved Recipes','📖','Keep favorite household recipes in one place.','Next: save recipes and send ingredients to Groceries');
  if(tool==='schedule')simpleUI('Meal Schedule','📅','See the household meal plan for the week.','Next: weekly schedule and reminders');
}

document.querySelectorAll('[data-tool]').forEach(btn=>btn.addEventListener('click',()=>openTool(btn.dataset.tool)));

loadGeneratedArtwork();

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));}
