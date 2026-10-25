
"use strict";

const $ = (selector) => document.querySelector(selector);

const intro = $("#intro");
const beginBtn = $("#beginBtn");
const experience = $("#letterExperience");
const envelope = $("#envelope");
const waxSeal = $("#waxSeal");
const envelopeHint = $("#envelopeHint");
const nextLineBtn = $("#nextLineBtn");
const tapHint = $("#tapHint");
const letterLines = [...document.querySelectorAll(".letter-line")];
const lineCounter = $("#lineCounter");
const progressFill = $("#progressFill");

const memoriesSection = $("#memoriesSection");
const finalSection = $("#finalSection");
const readAgainBtn = $("#readAgainBtn");

const demoBtn = $("#demoBtn");
const demoModal = $("#demoModal");
const closeDemo = $("#closeDemo");

const settingsBtn = $("#settingsBtn");
const settingsModal = $("#settingsModal");
const closeSettings = $("#closeSettings");
const languageBtn = $("#languageBtn");
const settingsLanguageBtn = $("#settingsLanguageBtn");
const themeBtn = $("#themeBtn");

const paperParticles = $("#paperParticles");
const roseParticles = $("#roseParticles");

const music = $("#loveMusic");
const musicControl = $("#musicControl");
const musicToggle = $("#musicToggle");

let currentLanguage = "ar";
let envelopeOpened = false;
let visibleLines = 0;
let endingShown = false;
let previousFocus = null;

const translations = {
  ar: {
    demoBadge: "نموذج تجريبي · قابل للتعديل",
    introKicker: "جواب طالع من القلب",
    introSmall: "في حاجة مخصوص ليك",
    introTitle: "بمناسبه اننا كملنا سنه",
    introDescription: "في كلام القلب بيقوله أحلى من أي هدية",
    beginButton: "افتح حكايتنا",
    introFootnote: "خد وقتك · واقرأ كل كلمة",
    sectionKicker: "حتة صغيرة من قلبي",
    sectionTitle: "جواب ليك إنت وبس",
    sectionDescription: "كل ضغطة هتفتحلك سطر من اللي جوا قلبي",
    letterDate: "جواب معمول مخصوص ليك",
    letterGreeting: "يا أجمل حاجة حصلتلي،",
    line1: "مش عارف أبدأ منين،",
    line2: "بس عارف إن وجودك في حياتي غيّر حاجات كتير جوايا.",
    line3: "بقيت ألاقي في أبسط التفاصيل سبب يخليني أبتسم،",
    line4: "وبقيت أحب الأيام أكتر لمجرد إنك جزء منها.",
    line5: "بحب ضحكتك، وطريقتك، وحتى الحاجات الصغيرة اللي يمكن إنت مش واخد بالك منها.",
    line6: "بحب إنك بقيت شخص أقدر أحكيله عن يومي وعن كل اللي جوايا.",
    line7: "ولو الدنيا بقت صعبة في يوم، أتمنى نفضل نختار بعض ونحاول سوا.",
    line8: "مش بوعدك إن كل يوم هيكون مثالي، بس بوعدك إن مشاعري هتفضل حقيقية.",
    line9: "شكرًا إنك إنت، وشكرًا على كل لحظة حلوة جمعتنا.",
    letterSignoff: "بكل الحب،",
    letterSignature: "الشخص اللي بيحبك ♡",
    envelopeHint: "اضغط على ختم القلب عشان تفتح الجواب",
    progressLabel: "كلمات من قلبي",
    nextButton: "اقرأ السطر اللي بعده",
    tapHint: "خد وقتك .. مفيش حاجة مستعجلة",
    memoriesKicker: "عالمنا الصغير",
    memoriesTitle: "حاجات بتفكرني بيك",
    memoriesDescription: "كل صورة حكاية صغيرة تستاهل نحتفظ بيها",
    memoryCaption1: "أحلى اللحظات هي اللي بنعيشها سوا",
    memoryCaption2: "تفاصيل صغيرة .. ومشاعر كبيرة",
    memoryCaption3: "حكايتنا لسه فيها فصول كتير",
    photoNote: "الصور دي للتجربة، وتقدر تستبدلها بصوركم الخاصة",
    finalKicker: "لو كان الاختيار من الأول",
    finalTitle: "ولو رجع بيا الزمن، هختارك تاني",
    finalMessage: "من وسط كل الطرق وكل الاحتمالات، قلبي هيفضل يعرف طريقه ليك. مش عشان الحكاية مثالية، لكن عشان إنت الشخص اللي نفسي أكمل معاه الحكاية.",
    finalSignature: "إنت اختياري كل مرة ♡",
    finalBottom: "في كلام بيفضل للأبد",
    readAgain: "اقرأ الجواب من الأول",
    footerText: "لحظات صغيرة .. وذكريات بتفضل العمر كله",
    footerLink: "اكتشف 4U Celebrations ↗",
    modalKicker: "معلومة صغيرة",
    modalTitle: "ده نموذج تجريبي",
    modalText: "كل حاجة في النموذج قابلة للتغيير، من الكلام والصور للألوان والموسيقى والتفاصيل الخاصة بيكم.",
    modalOrder: "اطلب تصميمك الخاص ↗",
    modalFootnote: "حكايتك · ذوقك · لحظتك",
    settingsKicker: "تجربتك الخاصة",
    settingsTitle: "الإعدادات",
    languageSetting: "اللغة",
    themeSetting: "المظهر",
    themeLight: "الوضع الفاتح",
    themeDark: "الوضع الداكن",
    musicLabel: "موسيقى هادية"
  },

  en: {
    demoBadge: "DEMO TEMPLATE · CUSTOMIZABLE",
    introKicker: "A LETTER FROM THE HEART",
    introSmall: "THERE IS SOMETHING FOR YOU",
    introTitle: "A letter written just for you",
    introDescription: "Some words mean more than any gift.",
    beginButton: "OPEN OUR STORY",
    introFootnote: "TAKE YOUR TIME · READ EVERY WORD",
    sectionKicker: "A LITTLE PIECE OF MY HEART",
    sectionTitle: "A letter for your eyes only",
    sectionDescription: "Each tap reveals another line from my heart.",
    letterDate: "A LETTER JUST FOR YOU",
    letterGreeting: "To the loveliest part of my life,",
    line1: "I don't know where to begin,",
    line2: "but I know having you in my life changed so much inside me.",
    line3: "The smallest things started giving me reasons to smile,",
    line4: "and ordinary days became better simply because you're in them.",
    line5: "I love your laugh, your ways, and all the little things you may not notice about yourself.",
    line6: "I love having someone I can tell about my day and everything on my mind.",
    line7: "And when life gets hard, I hope we keep choosing each other and trying together.",
    line8: "I can't promise every day will be perfect, but I can promise my feelings are real.",
    line9: "Thank you for being you, and for every beautiful moment we've shared.",
    letterSignoff: "With all my love,",
    letterSignature: "Your Person ♡",
    envelopeHint: "Tap the heart seal to open the letter",
    progressLabel: "WORDS FROM MY HEART",
    nextButton: "REVEAL THE NEXT LINE",
    tapHint: "Take your time. Nothing is in a hurry.",
    memoriesKicker: "OUR LITTLE WORLD",
    memoriesTitle: "Things that remind me of you",
    memoriesDescription: "Every picture holds a little story worth keeping.",
    memoryCaption1: "The best moments are the ones we share.",
    memoryCaption2: "Little details, big feelings.",
    memoryCaption3: "Our story still has many chapters.",
    photoNote: "These are demo photos. Replace them with your own.",
    finalKicker: "IF I HAD TO CHOOSE AGAIN",
    finalTitle: "If time went back, I'd choose you again.",
    finalMessage: "Out of every road and every possibility, my heart would still find its way to you. Not because our story is perfect, but because you're the person I want to keep writing it with.",
    finalSignature: "You're my choice, every time. ♡",
    finalBottom: "SOME WORDS ARE FOREVER",
    readAgain: "READ THE LETTER AGAIN",
    footerText: "Little moments. Memories that last a lifetime.",
    footerLink: "Discover 4U Celebrations ↗",
    modalKicker: "A LITTLE NOTE",
    modalTitle: "This is a demo template",
    modalText: "Everything is customizable, from the words and photos to the colors, music, and personal details.",
    modalOrder: "ORDER YOUR OWN DESIGN ↗",
    modalFootnote: "YOUR STORY · YOUR STYLE · YOUR MOMENT",
    settingsKicker: "YOUR EXPERIENCE",
    settingsTitle: "Settings",
    languageSetting: "Language",
    themeSetting: "Appearance",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    musicLabel: "Soft music"
  }
};

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function applyLanguage(language, save = true) {
  currentLanguage = language === "en" ? "en" : "ar";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translated = translations[currentLanguage][key];

    if (translated !== undefined) {
      element.textContent = translated;
    }
  });

  languageBtn.textContent = currentLanguage === "ar" ? "English" : "العربية";
  settingsLanguageBtn.textContent = languageBtn.textContent;

  document.title = currentLanguage === "ar"
    ? "رسالة حب | 4U Celebrations"
    : "The Love Letter | 4U Celebrations";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = currentLanguage === "ar"
      ? "رسالة حب رومانسية من 4U Celebrations."
      : "A romantic love letter experience from 4U Celebrations.";
  }

  if (save) {
    try {
      localStorage.setItem("4u-language", currentLanguage);
    } catch (error) {
      console.warn("Could not save language:", error);
    }
  }

  updateCounter();
}

function loadLanguage() {
  try {
    const saved = localStorage.getItem("4u-language");
    applyLanguage(saved === "en" ? "en" : "ar", false);
  } catch {
    applyLanguage("ar", false);
  }
}

function toggleLanguage() {
  applyLanguage(currentLanguage === "ar" ? "en" : "ar");
}

if (languageBtn) {
  languageBtn.addEventListener("click", toggleLanguage);
}

if (settingsLanguageBtn) {
  settingsLanguageBtn.addEventListener("click", toggleLanguage);
}

/* Theme */
function applyTheme(light) {
  document.body.classList.toggle("light-mode", light);
  themeBtn.textContent = light ? t("themeDark") : t("themeLight");

  try {
    localStorage.setItem("4u-theme", light ? "light" : "dark");
  } catch (error) {
    console.warn("Could not save theme:", error);
  }
}

function loadTheme() {
  try {
    applyTheme(localStorage.getItem("4u-theme") === "light");
  } catch {
    applyTheme(false);
  }
}

themeBtn.addEventListener("click", () => {
  applyTheme(!document.body.classList.contains("light-mode"));
});

/* Intro */
if (beginBtn && intro && experience) {
  beginBtn.addEventListener("click", () => {
    intro.hidden = true;
    experience.hidden = false;

    requestAnimationFrame(() => {
      experience.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    createFloatingParticles();
  });
} else {
  console.error("Intro elements not found:", {
    beginBtn,
    intro,
    experience
  });
}

/* Open envelope */
waxSeal.addEventListener("click", async () => {
  if (envelopeOpened) return;

  envelopeOpened = true;
  envelope.classList.add("opened");
  waxSeal.disabled = true;
  envelopeHint.textContent = currentLanguage === "ar"
    ? "الجواب اتفتح .. دوس عشان تقرأ أول سطر"
    : "The letter is open. Tap to read the first line.";

  nextLineBtn.hidden = false;
  tapHint.hidden = false;

  await startMusic();

  window.setTimeout(() => {
    revealNextLine();
  }, 750);
});

/* Reveal one line per click */
function revealNextLine() {
  if (!envelopeOpened || visibleLines >= letterLines.length) return;

  const line = letterLines[visibleLines];
  line.classList.add("visible");
  visibleLines++;

  updateCounter();

  if (visibleLines === letterLines.length) {
    revealSignoff();
    nextLineBtn.hidden = true;
    tapHint.hidden = true;

    window.setTimeout(showEnding, 1000);
    return;
  }

  nextLineBtn.hidden = false;

  if (currentLanguage === "ar") {
    nextLineBtn.querySelector("[data-i18n]").textContent = "اقرأ السطر اللي بعده ♡";
  } else {
    nextLineBtn.querySelector("[data-i18n]").textContent = "REVEAL THE NEXT LINE ♡";
  }
}

function revealSignoff() {
  const signoff = $(".letter-signoff");
  const signature = $(".letter-signature");

  signoff.style.opacity = "1";
  signature.style.opacity = "1";
}

nextLineBtn.addEventListener("click", revealNextLine);

function updateCounter() {
  lineCounter.textContent = `${visibleLines} / ${letterLines.length}`;
  progressFill.style.width = `${(visibleLines / letterLines.length) * 100}%`;
}

/* Show memories and final message */
function showEnding() {
  if (endingShown) return;
  endingShown = true;

  memoriesSection.hidden = false;
  finalSection.hidden = false;

  launchPaperConfetti();

  memoriesSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* Reset for rereading */
readAgainBtn.addEventListener("click", () => {
  endingShown = false;
  envelopeOpened = false;
  visibleLines = 0;

  letterLines.forEach((line) => line.classList.remove("visible"));

  $(".letter-signoff").style.opacity = "0";
  $(".letter-signature").style.opacity = "0";

  envelope.classList.remove("opened");
  waxSeal.disabled = false;
  nextLineBtn.hidden = true;
  tapHint.hidden = true;
  memoriesSection.hidden = true;
  finalSection.hidden = true;

  envelopeHint.textContent = t("envelopeHint");
  progressFill.style.width = "0%";
  updateCounter();

  experience.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

/* Floating decorations */
let particlesStarted = false;

function createFloatingParticles() {
  if (particlesStarted) return;
  particlesStarted = true;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  setInterval(() => {
    if (document.hidden) return;

    const piece = document.createElement("span");
    piece.className = "paper-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--drift", `${Math.round(Math.random() * 100 - 50)}px`);
    piece.style.animationDuration = `${8 + Math.random() * 6}s`;

    paperParticles.appendChild(piece);
    window.setTimeout(() => piece.remove(), 15000);
  }, 850);

  setInterval(() => {
    if (document.hidden) return;

    const rose = document.createElement("span");
    rose.className = "floating-rose";
    rose.textContent = Math.random() > 0.5 ? "✿" : "♡";
    rose.style.left = `${Math.random() * 100}%`;
    rose.style.setProperty("--drift", `${Math.round(Math.random() * 90 - 45)}px`);
    rose.style.animationDuration = `${11 + Math.random() * 6}s`;

    roseParticles.appendChild(rose);
    window.setTimeout(() => rose.remove(), 19000);
  }, 1900);
}

function launchPaperConfetti() {
  for (let i = 0; i < 25; i++) {
    const piece = document.createElement("span");
    piece.className = "paper-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.5}s`;
    piece.style.animationDuration = `${5 + Math.random() * 3}s`;
    piece.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);

    paperParticles.appendChild(piece);
    window.setTimeout(() => piece.remove(), 10000);
  }
}

/* Music: starts only after user interaction */
async function startMusic() {
  if (!music) return false;

  music.volume = 0.45;

  try {
    await music.play();
    musicControl.hidden = false;
    musicToggle.setAttribute("aria-label", "إيقاف الموسيقى");
    return true;
  } catch (error) {
    console.warn("Music could not start:", error);
    musicControl.hidden = false;
    return false;
  }
}

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    musicToggle.setAttribute("aria-label", "تشغيل الموسيقى");
  }
});

music.addEventListener("error", () => {
  console.warn("Could not load love.mp3. Check the file name and upload.");
});

/* Modals */
function openModal(modal) {
  previousFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeModal(modal) {
  modal.hidden = true;

  if (demoModal.hidden && settingsModal.hidden) {
    document.body.classList.remove("modal-open");
  }

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

demoBtn.addEventListener("click", () => openModal(demoModal));
closeDemo.addEventListener("click", () => closeModal(demoModal));

settingsBtn.addEventListener("click", () => openModal(settingsModal));
closeSettings.addEventListener("click", () => closeModal(settingsModal));

[demoModal, settingsModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!demoModal.hidden) closeModal(demoModal);
  if (!settingsModal.hidden) closeModal(settingsModal);
});

/* Initialize */
loadLanguage();
loadTheme();
updateCounter();
