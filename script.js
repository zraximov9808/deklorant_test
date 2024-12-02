const userForm = document.getElementById("user-form");
const welcomeScreen = document.getElementById("welcome-screen");
const testScreen = document.getElementById("test-screen");
const resultScreen = document.getElementById("result-screen");
const resultSummary = document.getElementById("result-summary");
const questionsContainer = document.getElementById("questions-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let timer;
let timeLeft = 30 * 60; // 30 daqiqa (sekundlarda)

// Savollar va javoblar
const questions = [
  {
    question: "1. Bojxona yuk dekloratsiyada nechta rejim mavjud mavjud?",
    options: ["14", "12", "16", "15"],
    correct: "16",
  },
  {
    question: "2. ИМ-70 va ИМ-74 rejimini qanday farqi bor?",
    options: [
      "ИМ-70 vaqti 2 oy va tolov mavjud, ИМ-74 vaqti 2 yil va tolov mavjud",
      "ИМ-70 vaqti 2 oy va tekin, ИМ-74 vaqti 2 yil va tolov mavjud",
      "ИМ-70 vaqti 2 oy va tekin, ИМ-74 vaqti 2 yil va tekin",
      "ИМ-70 vaqti 2 yil va tolov mavjud, ИМ-74 vaqti 2 yil va tolov mavjud",
    ],
    correct: "ИМ-70 vaqti 2 oy va tekin, ИМ-74 vaqti 2 yil va tolov mavjud",
  },
  {
    question: "3. Bojxona yuk dekloratsiyada nechta grafa mavjud?",
    options: [
      "54ta sonli va 4ta harfli grafa mavjud",
      "50ta sonli va 4ta harfli grafa mavjud",
      "54ta sonli va 3ta harfli grafa mavjud",
      "Hamma javob to’g’ri",
    ],
    correct: "54ta sonli va 4ta harfli grafa mavjud",
  },
  {
    question: "4. ИМ-70 rejimida qaysi grafalar to’ldirilmaydi?",
    options: [
      "4; 10; 16; 17; 24; 28; 36; 39",
      "4; 10; 16; 17; 24; 27; 37",
      "4; 11; 16; 17; 24; 36; 39",
      "4; 10; 16; 17; 24; 27; 36; 39",
    ],
    correct: "4; 10; 16; 17; 24; 27; 36; 39",
  },
  {
    question: "5. 18 -grafada nechta transport turi mavjud?",
    options: ["7", "8", "9", "6"],
    correct: "8",
  },
  {
    question: "6. Справочный номер qaysi grafani nomi?",
    options: ["6-grafa", "9-grafa", "7-grafa", "5-grafa"],
    correct: "7-grafa",
  },
  {
    question: "7. 20-grafa qanday ma’lumot yoziladi?",
    options: [
      "yetkazib berish sharti ",
      "qayerga yetkazib berish ",
      "AQSH dollar kursi",
      "Mamlakat kodi va nomi",
    ],
    correct: "yetkazib berish sharti ",
  },
  {
    question: "8. C grafaning 2 bo’limiga nima yoziladi?",
    options: [
      "Invoys sanasi",
      "Transport chegarani kesib o’tgan sanasi",
      "Dekloratsiya sanasi",
      "Deklorantni tu’g’ilgan kuni",
    ],
    correct: "Transport chegarani kesib o’tgan sanasi",
  },
  {
    question: "9. Qaysi grafaga doim dollar kursi yoziladi?",
    options: ["14-grafa", "13-grafa", "15-grafa", "12-grafa"],
    correct: "13-grafa",
  },
  {
    question: "10. Bojxonada nechta qiymat mavjud?",
    options: ["2-ta", "4-ta", "2.5-ta", "3-ta"],
    correct: "3-ta",
  },
  {
    question:
      "11. Bojxona qiymati 272257.65 ga teng shuni statistika qiymatini aniqlang?",
    options: ["272.25", "2722.57", "272.65", "hammasi to'g'ri"],
    correct: "272.25",
  },
  {
    question: "12. Деклорант / представитель bu qaysi grafani nomi?",
    options: ["19-grafa", "25-grafa", "14-grafa", "11-grafa"],
    correct: "14-grafa",
  },
  {
    question: "13. 37-grafa nechtaga bo’lidi?",
    options: ["2-ta", "4-ta", "5-ta", "3-ta"],
    correct: "3-ta",
  },
  {
    question: "14. Код товара nomi qaysi grafaga tegishli?",
    options: ["34-grafa", "33-grafa", "35-grafa", "31-grafa"],
    correct: "33-grafa",
  },
  {
    question: "15. 29-Grafada nimlar ko’rsatiladi?",
    options: [
      "Post raqami",
      "VED post raqami",
      "Chegara post raqami",
      "Hammasi to’g’ri",
    ],
    correct: "Chegara post raqami",
  },
  {
    question: "16. 40-Grafani to’ldirish uchun ma’lumotlarni qayerdan olamiz?",
    options: [
      "Yuk operatsiyalardan",
      "E-ombor.customs.uz saytidan",
      "КГДГ kitobchasidan",
      "Hammasi to’g’ri",
    ],
    correct: "E-ombor.customs.uz saytidan",
  },
  {
    question: "17. 43-Grafa qaysi rejimlarda to’ldirilmaydi?",
    options: [
      "ИМ-74 va ИМ-70 rejimlarida",
      "НД rejimida",
      "Export ЭК-10 rejimida",
      "Hammasi to’g’ri",
    ],
    correct: "ИМ-74 va ИМ-70 rejimlarida",
  },
  {
    question: "18. Bojxona Yuk Dekloratsiyasida nechta qiymat bor?",
    options: ["4-ta", "2-ta", "3-ta", "1-ta"],
    correct: "3-ta",
  },
  {
    question: "19. Bojxona Yuk Dekloratsiyasida mavjud qiymatlar qaysilar?",
    options: [
      "Bojxona qiymati ",
      "Faktura qiymati",
      "Statistik qiymati",
      "Hammasi to’gri",
    ],
    correct: "Hammasi to’gri",
  },
];

let userAnswers = {};

// Taymer funksiyasi
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishTest();
    }
  }, 1000);
}

// Savolni yuklash
function loadQuestion(index) {
  const questionData = questions[index];
  questionsContainer.innerHTML = `
        <h5>${questionData.question}</h5>
        ${questionData.options
          .map(
            (option, i) => `
            <div>
                <input type="radio" name="q${index}" id="q${index}-opt${i}" value="${option}" ${
              userAnswers[`q${index}`] === option ? "checked" : ""
            }>
                <label for="q${index}-opt${i}">${option}</label>
            </div>`
          )
          .join("")}
    `;
}

// Tugmalarning holatini boshqarish
function updateButtons() {
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.classList.toggle(
    "d-none",
    currentQuestionIndex === questions.length - 1
  );
  finishBtn.classList.toggle(
    "d-none",
    currentQuestionIndex !== questions.length - 1
  );
}

// Testni tugatish
function finishTest() {
  clearInterval(timer);
  let correct = 0;
  questions.forEach((q, index) => {
    if (userAnswers[`q${index}`] === q.correct) correct++;
  });

  const wrong = questions.length - correct;
  resultSummary.innerHTML = `
        <p class="fs-4">Hurmatli <b>${
          document.getElementById("fullName").value
        }</b>,</p>
        <p class="fs-5">Siz ${correct} ta to'g'ri va ${wrong} ta noto'g'ri javob berdingiz.</p>
    `;
  testScreen.classList.add("d-none");
  resultScreen.classList.remove("d-none");
}

// Hodisalar boshqaruvi
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  welcomeScreen.classList.add("d-none");
  testScreen.classList.remove("d-none");
  loadQuestion(currentQuestionIndex);
  startTimer();
});

prevBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="q${currentQuestionIndex}"]:checked`
  );
  if (selectedOption)
    userAnswers[`q${currentQuestionIndex}`] = selectedOption.value;
  currentQuestionIndex--;
  loadQuestion(currentQuestionIndex);
  updateButtons();
});

nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="q${currentQuestionIndex}"]:checked`
  );
  if (selectedOption)
    userAnswers[`q${currentQuestionIndex}`] = selectedOption.value;
  currentQuestionIndex++;
  loadQuestion(currentQuestionIndex);
  updateButtons();
});

finishBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="q${currentQuestionIndex}"]:checked`
  );
  if (selectedOption)
    userAnswers[`q${currentQuestionIndex}`] = selectedOption.value;
  finishTest();
});
