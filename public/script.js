const API="/cards";let currentEditId=null;
async function loadCards(){const res=await fetch(API);const cards=await res.json();
const c=document.getElementById("cards");const e=document.getElementById("emptyMsg");c.innerHTML="";
if(cards.length===0){e.style.display="block"}else{e.style.display="none"}
cards.forEach(card=>{const d=document.createElement("div");d.className="card";
d.innerHTML=`<p onclick="showAnswer(this,'${card.answer}')">${card.question}</p>
<button onclick="openEdit('${card.id}','${card.question}','${card.answer}')">Edit</button>
<button onclick="deleteCard('${card.id}')">Delete</button>`;c.appendChild(d);});}
function showAnswer(el,a){el.innerText=a;setTimeout(()=>el.innerText="✔ Answer shown",1500);}
async function addCard(){const q=document.getElementById("question").value;
const a=document.getElementById("answer").value;if(!q||!a)return alert("Fill both fields");
await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({id:Date.now(),question:q,answer:a})});
document.getElementById("question").value="";document.getElementById("answer").value="";
loadCards();}
async function deleteCard(id){await fetch(API+"/"+id,{method:"DELETE"});loadCards();}
function openEdit(id,q,a){currentEditId=id;
document.getElementById("editQuestion").value=q;
document.getElementById("editAnswer").value=a;
document.getElementById("modal").classList.remove("hidden");}
function closeModal(){document.getElementById("modal").classList.add("hidden");}
async function saveEdit(){const q=document.getElementById("editQuestion").value;
const a=document.getElementById("editAnswer").value;
await fetch(API+"/"+currentEditId,{method:"PUT",headers:{"Content-Type":"application/json"},
body:JSON.stringify({id:currentEditId,question:q,answer:a})});
closeModal();loadCards();}
loadCards();
