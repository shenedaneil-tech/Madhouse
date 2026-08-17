const houseView = document.getElementById('houseView');
const kitchenView = document.getElementById('kitchenView');
const panel = document.getElementById('toolPanel');
const content = document.getElementById('panelContent');
const defaultGroceries = JSON.parse(localStorage.getItem('madhouse-groceries') || '["Milk","Eggs","Bread"]');
function showScreen(screen){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));screen.classList.add('active');}
document.querySelectorAll('.room').forEach(btn=>{btn.addEventListener('click',()=>{if(btn.dataset.room === 'kitchen') showScreen(kitchenView);else alert(btn.textContent + ' is coming next. Kitchen is the working room in v1.');});});
document.getElementById('backBtn').addEventListener('click',()=>{panel.classList.remove('open');showScreen(houseView)});
document.getElementById('closePanel').addEventListener('click',()=>panel.classList.remove('open'));
function saveGroceries(items){localStorage.setItem('madhouse-groceries', JSON.stringify(items));}
function groceryUI(){
  const items = JSON.parse(localStorage.getItem('madhouse-groceries') || JSON.stringify(defaultGroceries));
  content.innerHTML = `<h3>🛒 Grocery List</h3><p>Add what the house needs.</p><div class="add-row"><input id="groceryInput" placeholder="Add an item..." /><button id="addGrocery">Add</button></div><ul class="grocery-list">${items.map((x,i)=>`<li><input type="checkbox"><span>${x}</span><button data-remove="${i}" style="margin-left:auto;border:0;background:none">✕</button></li>`).join('')}</ul>`;
  document.getElementById('addGrocery').onclick=()=>{const input=document.getElementById('groceryInput');if(!input.value.trim()) return;items.push(input.value.trim());saveGroceries(items);groceryUI();};
  content.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{items.splice(Number(b.dataset.remove),1);saveGroceries(items);groceryUI();});
}
function simpleUI(title,emoji,body){content.innerHTML=`<h3>${emoji} ${title}</h3><p>${body}</p><div class="empty-card">This tool is connected to the room and ready for the next build step.</div>`;}
function openTool(tool){panel.classList.add('open');if(tool==='grocery') groceryUI();if(tool==='pantry') simpleUI('Pantry','🥫','Track what you have at home so you know what to buy and what meals you can make.');if(tool==='planner') simpleUI('Meal Planner','👨‍🍳','Plan breakfast, lunch and dinner for the week.');if(tool==='recipes') simpleUI('Saved Recipes','📖','Save household recipes and quickly add ingredients to your grocery list.');if(tool==='schedule') simpleUI('Meal Schedule','📅','See your week of planned meals at a glance.');}
document.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>openTool(b.dataset.tool)));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));}
