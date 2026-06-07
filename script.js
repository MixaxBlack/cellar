const portal=document.getElementById("portal");
const panels=document.querySelectorAll(".panel");
const loginForm=document.getElementById("loginForm");
const champagneSound=document.getElementById("champagneSound");
const emailInput=document.getElementById("emailInput");
const passwordInput=document.getElementById("passwordInput");
const accessButton=document.getElementById("accessButton");
const requestAccess=document.getElementById("requestAccess");
const langButtons=document.querySelectorAll(".lang-btn");

const authModal=document.getElementById("authModal");
const authModalTitle=document.getElementById("authModalTitle");
const authModalText=document.getElementById("authModalText");
const authModalClose=document.getElementById("authModalClose");

let soundPlayed=false;
let currentLang="en";

const translations={
  en:{
    beerTitle:"Craft Beer",
    beerLead:"Best Craft Beers From Around The World",
    beerText:"Selected beers from independent breweries. Unique flavors, rare styles and limited releases.",
    portTitle:"Port Wine",
    portLead:"History. Tradition. Noble Taste.",
    portText:"Authentic port wines aged in oak barrels. Rich aromas and centuries-old traditions.",
    cigarsTitle:"Fine Spirits & Cigars",
    cigarsLead:"The Art Of Indulgence",
    cigarsText:"Premium hand-rolled cigars, exclusive cognacs, whiskies and rums.",
    footerTitle:"Private club for true connoisseurs",
    footerText:"Access by invitation only",
    email:"Email",
    password:"Password",
    access:"Access",
    contact:"Contact us",
    invalidEmailTitle:"E-mail required",
    invalidEmailText:"Please enter a valid e-mail address.",
    invalidLoginTitle:"Access denied",
    invalidLoginText:"Incorrect login or password.\n\nPlease contact us to request access."
  },
  ka:{
    beerTitle:"კრაფტ ლუდი",
    beerLead:"საუკეთესო კრაფტ ლუდი მთელი მსოფლიოდან",
    beerText:"შერჩეული ლუდი დამოუკიდებელი ლუდსახარშებიდან. უნიკალური გემოები, იშვიათი სტილები და შეზღუდული პარტიები.",
    portTitle:"პორტვეინი",
    portLead:"ისტორია. ტრადიცია. კეთილშობილი გემო.",
    portText:"ნამდვილი პორტვეინი, დაძველებული მუხის კასრებში. მდიდარი არომატები და მრავალსაუკუნოვანი ტრადიციები.",
    cigarsTitle:"სიგარები და ძლიერი ალკოჰოლი",
    cigarsLead:"სიამოვნების ხელოვნება",
    cigarsText:"პრემიუმ კლასის ხელით დახვეული სიგარები, რჩეული კონიაკები, ვისკი და რომი.",
    footerTitle:"დახურული კლუბი ნამდვილი მცოდნეებისთვის",
    footerText:"წვდომა მხოლოდ მოწვევით",
    email:"ელფოსტა",
    password:"პაროლი",
    access:"შესვლა",
    contact:"დაგვიკავშირდით",
    invalidEmailTitle:"ელფოსტა აუცილებელია",
    invalidEmailText:"გთხოვთ შეიყვანოთ სწორი ელფოსტის მისამართი.",
    invalidLoginTitle:"წვდომა უარყოფილია",
    invalidLoginText:"მომხმარებლის სახელი ან პაროლი არასწორია.\n\nწვდომის მისაღებად დაგვიკავშირდით."
  }
};

async function playSoundOnce(){
  if(soundPlayed||!champagneSound)return;
  soundPlayed=true;
  try{
    champagneSound.currentTime=0;
    champagneSound.volume=.68;
    await champagneSound.play();
  }catch(e){soundPlayed=false;}
}

function activatePanel(panel){
  panels.forEach((item)=>item.classList.remove("is-active"));
  panel.classList.add("is-active");
  portal.classList.add("has-active");
  playSoundOnce();
}

function resetPanels(){
  panels.forEach((item)=>item.classList.remove("is-active"));
  portal.classList.remove("has-active");
}

function setLanguage(lang){
  currentLang=lang;
  const t=translations[lang];
  document.documentElement.lang=lang;

  document.querySelectorAll("[data-i18n]").forEach((el)=>{
    const key=el.getAttribute("data-i18n");
    if(t[key]) el.textContent=t[key];
  });

  if(emailInput) emailInput.placeholder=t.email;
  if(passwordInput) passwordInput.placeholder=t.password;
  if(accessButton) accessButton.textContent=t.access;
  if(requestAccess) requestAccess.textContent=t.contact;

  langButtons.forEach((btn)=>{
    btn.classList.toggle("active", btn.dataset.lang===lang);
  });
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showModal(title, text){
  authModalTitle.textContent=title;
  authModalText.textContent=text;
  authModal.classList.add("show");
  authModal.setAttribute("aria-hidden","false");
}

function closeModal(){
  authModal.classList.remove("show");
  authModal.setAttribute("aria-hidden","true");
}

panels.forEach((panel)=>panel.addEventListener("mouseenter",()=>activatePanel(panel)));
portal.addEventListener("click",playSoundOnce);
portal.addEventListener("mouseleave",resetPanels);

langButtons.forEach((btn)=>{
  btn.addEventListener("click",()=>{
    setLanguage(btn.dataset.lang);
  });
});

loginForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const t=translations[currentLang];
  const email=(emailInput?.value || "").trim();

  if(!isValidEmail(email)){
    showModal(t.invalidEmailTitle, t.invalidEmailText);
    return;
  }

  showModal(t.invalidLoginTitle, t.invalidLoginText);
});

authModalClose.addEventListener("click", closeModal);
authModal.addEventListener("click", (event)=>{
  if(event.target===authModal) closeModal();
});
document.addEventListener("keydown", (event)=>{
  if(event.key==="Escape") closeModal();
});

setLanguage("en");
