import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

const dialog = document.getElementById("results-modal");
const results = document.getElementById("results");

const dateForm = document.getElementById("datePickerForm");
dateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const day = document.getElementById("dateDayPicker").value;
  const month = document.getElementById("dateMonthPicker").value;

  if (!day || !month) {
    alert("Proszę podać poprawne dane");
    return;
  }

  console.log(day, month);

  // -1 month bo js indeksuje miesiące od 0
  const birthdayMonth = parseInt(month) - 1;
  const birthdayDay = parseInt(day);

  const birthdayMonthDays = dayjs().month(birthdayMonth).daysInMonth();

  if (birthdayDay < 1 || birthdayDay > birthdayMonthDays) {
    alert("Proszę podać poprawne dane");
    return;
  }

  const birthdayDate = dayjs({
    month: birthdayMonth,
    date: birthdayDay,
  });

  const birthdayDiffDays = Math.abs(birthdayDate.diff(dayjs(), "days"));
  const birthdayDiffWeeks = Math.abs(birthdayDate.diff(dayjs(), "weeks"));
  let extraText = ".";
  if (birthdayDiffWeeks === 0) {
    extraText = " W tym tygodniu są Twoje urodziny!";
  }
  if (birthdayDiffDays === 0) {
    extraText = " Dzisiaj są Twoje urodziny! Wszystkiego najlepszego!";
  }
  results.textContent = `${birthdayDiffDays} ${birthdayDiffDays === 1 ? "dzień" : "dni"} (${birthdayDiffWeeks} ${birthdayDiffWeeks === 1 ? "tydzień" : "tygodni"})${extraText}`;
  dialog.showModal();
});
