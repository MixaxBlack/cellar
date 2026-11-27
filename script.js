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
    pageTitle:"Private Access", language:"Language", close:"Close",
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
    pageTitle:"პირადი წვდომა", language:"ენა", close:"დახურვა",
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
  },
  ...{
  "fr": {
    "beerTitle": "Bières artisanales",
    "beerLead": "Le meilleur des bières artisanales du monde",
    "beerText": "Une sélection de brasseries indépendantes : saveurs uniques, styles rares et éditions limitées.",
    "portTitle": "Porto",
    "portLead": "Histoire. Tradition. Raffinement.",
    "portText": "Des portos authentiques vieillis en fûts de chêne, aux arômes riches et aux traditions séculaires.",
    "cigarsTitle": "Spiritueux fins et cigares",
    "cigarsLead": "L’art de savourer",
    "cigarsText": "Des cigares haut de gamme roulés à la main, des cognacs, whiskies et rhums d’exception.",
    "footerTitle": "Club privé pour connaisseurs",
    "footerText": "Accès sur invitation uniquement",
    "email": "E-mail",
    "password": "Mot de passe",
    "access": "Connexion",
    "contact": "Nous contacter",
    "invalidEmailTitle": "Adresse e-mail requise",
    "invalidEmailText": "Saisissez une adresse e-mail valide.",
    "invalidLoginTitle": "Accès refusé",
    "invalidLoginText": "Identifiant ou mot de passe incorrect.\n\nContactez-nous pour demander un accès.",
    "pageTitle": "Accès privé",
    "language": "Langue",
    "close": "Fermer"
  },
  "de": {
    "beerTitle": "Craft-Bier",
    "beerLead": "Die besten Craft-Biere aus aller Welt",
    "beerText": "Ausgewählte Biere unabhängiger Brauereien: einzigartige Aromen, seltene Bierstile und limitierte Editionen.",
    "portTitle": "Portwein",
    "portLead": "Geschichte. Tradition. Edler Geschmack.",
    "portText": "Authentische, im Eichenfass gereifte Portweine mit reichen Aromen und jahrhundertealter Tradition.",
    "cigarsTitle": "Edle Spirituosen und Zigarren",
    "cigarsLead": "Die Kunst des Genießens",
    "cigarsText": "Handgerollte Premiumzigarren, ausgewählte Cognacs, Whiskys und Rums.",
    "footerTitle": "Privatclub für echte Genießer",
    "footerText": "Zugang nur auf Einladung",
    "email": "E-Mail",
    "password": "Passwort",
    "access": "Anmelden",
    "contact": "Kontakt",
    "invalidEmailTitle": "E-Mail-Adresse erforderlich",
    "invalidEmailText": "Geben Sie eine gültige E-Mail-Adresse ein.",
    "invalidLoginTitle": "Zugang verweigert",
    "invalidLoginText": "Anmeldedaten oder Passwort sind falsch.\n\nKontaktieren Sie uns, um Zugang anzufragen.",
    "pageTitle": "Privater Zugang",
    "language": "Sprache",
    "close": "Schließen"
  },
  "es": {
    "beerTitle": "Cervezas artesanales",
    "beerLead": "Las mejores cervezas artesanales del mundo",
    "beerText": "Una selección de cervecerías independientes: sabores únicos, estilos poco comunes y ediciones limitadas.",
    "portTitle": "Vino de Oporto",
    "portLead": "Historia. Tradición. Sabor distinguido.",
    "portText": "Auténticos vinos de Oporto envejecidos en barricas de roble, con aromas intensos y tradición centenaria.",
    "cigarsTitle": "Destilados selectos y puros",
    "cigarsLead": "El arte de saborear",
    "cigarsText": "Puros de primera calidad enrollados a mano, coñacs, whiskies y rones exclusivos.",
    "footerTitle": "Club privado para auténticos conocedores",
    "footerText": "Acceso solo por invitación",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "access": "Acceder",
    "contact": "Contáctanos",
    "invalidEmailTitle": "Se requiere un correo electrónico",
    "invalidEmailText": "Introduce una dirección de correo electrónico válida.",
    "invalidLoginTitle": "Acceso denegado",
    "invalidLoginText": "Usuario o contraseña incorrectos.\n\nContáctanos para solicitar acceso.",
    "pageTitle": "Acceso privado",
    "language": "Idioma",
    "close": "Cerrar"
  },
  "zh-Hans": {
    "beerTitle": "精酿啤酒",
    "beerLead": "荟萃全球优质精酿啤酒",
    "beerText": "精选独立酒厂佳酿，呈现独特风味、少见风格与限量款。",
    "portTitle": "波特酒",
    "portLead": "悠久历史、传统工艺与醇厚风味",
    "portText": "正宗波特酒在橡木桶中陈酿，香气浓郁，传承数百年的酿造工艺。",
    "cigarsTitle": "精选烈酒与雪茄",
    "cigarsLead": "品味之道",
    "cigarsText": "精选优质手卷雪茄，以及珍稀干邑、威士忌和朗姆酒。",
    "footerTitle": "为真正懂得品味的人打造的私人俱乐部",
    "footerText": "仅限受邀者访问",
    "email": "电子邮箱",
    "password": "密码",
    "access": "登录",
    "contact": "联系我们",
    "invalidEmailTitle": "请填写电子邮箱",
    "invalidEmailText": "请输入有效的电子邮箱地址。",
    "invalidLoginTitle": "无法访问",
    "invalidLoginText": "账号或密码不正确。\n\n请联系我们申请访问权限。",
    "pageTitle": "私人访问",
    "language": "语言",
    "close": "关闭"
  }
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
  if (!Object.hasOwn(translations,lang)) return;
  currentLang=lang;
  const t=translations[lang];
  document.documentElement.lang=lang;
  document.title=t.pageTitle;
  document.querySelector(".login-card").setAttribute("aria-label",t.pageTitle);
  document.querySelector(".lang-switch").setAttribute("aria-label",t.language);
  authModalClose.setAttribute("aria-label",t.close);

  document.querySelectorAll("[data-i18n]").forEach((el)=>{
    const key=el.getAttribute("data-i18n");
    if(t[key]) el.textContent=t[key];
  });

  if(emailInput){ emailInput.placeholder=t.email; emailInput.setAttribute("aria-label",t.email); }
  if(passwordInput){ passwordInput.placeholder=t.password; passwordInput.setAttribute("aria-label",t.password); }
  if(accessButton) accessButton.textContent=t.access;
  if(requestAccess) requestAccess.textContent=t.contact;

  langButtons.forEach((btn)=>{
    const active=btn.dataset.lang===lang;
    btn.classList.toggle("active",active);
    btn.setAttribute("aria-pressed",String(active));
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
    try { localStorage.setItem("myowncellar-language",currentLang); } catch {}
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

let savedLanguage;
try { savedLanguage=localStorage.getItem("myowncellar-language"); } catch {}
setLanguage(Object.hasOwn(translations,savedLanguage) ? savedLanguage : "en");
