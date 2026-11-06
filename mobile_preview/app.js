// State
const state = {
  lang: 'en', // 'en' or 'hi'
  unit: 'g'   // 'g' or 'kg'
};

// Translations
const translations = {
  en: {
    title: 'Utensil Calculator',
    subtitle: 'Rate & Weight Price',
    langBtn: 'हिंदी',
    rateLabel: '1. Rate of 1 kg (₹)',
    weightLabel: '2. Weight of Utensil',
    unitGrams: 'Grams (g)',
    unitKg: 'Kg',
    clearBtn: '🗑️ Clear',
    resultLabel: 'CALCULATED PRICE',
    formulaHint: 'Enter rate and weight above',
    formulaTemplate: (rate, weight, unit, price) =>
      unit === 'g'
        ? `₹${rate}/kg × ${weight} g ÷ 1000 = ₹${price}`
        : `₹${rate}/kg × ${weight} kg = ₹${price}`,
    bottomHint: 'Price = Rate per kg × (Weight in grams ÷ 1000)'
  },
  hi: {
    title: 'बर्तन कैलकुलेटर',
    subtitle: 'भाव और वजन से कीमत',
    langBtn: 'English',
    rateLabel: '1. 1 किलो का भाव (₹)',
    weightLabel: '2. बर्तन का वजन',
    unitGrams: 'ग्राम (g)',
    unitKg: 'किलो (kg)',
    clearBtn: '🗑️ साफ़ करें',
    resultLabel: 'कुल कीमत',
    formulaHint: 'ऊपर भाव और वजन डालें',
    formulaTemplate: (rate, weight, unit, price) =>
      unit === 'g'
        ? `₹${rate}/किलो × ${weight} ग्राम ÷ 1000 = ₹${price}`
        : `₹${rate}/किलो × ${weight} किलो = ₹${price}`,
    bottomHint: 'कीमत = 1 किलो का भाव × (वजन ग्राम में ÷ 1000)'
  }
};

// Elements
const rateInput = document.getElementById('rate-per-kg');
const weightInput = document.getElementById('weight');
const unitGramsBtn = document.getElementById('unit-grams');
const unitKgBtn = document.getElementById('unit-kg');
const unitSuffix = document.getElementById('unit-suffix');
const totalPriceEl = document.getElementById('total-price');
const formulaBreakdownEl = document.getElementById('formula-breakdown');
const btnClear = document.getElementById('btn-clear');
const btnLangToggle = document.getElementById('btn-lang-toggle');

const txtTitle = document.getElementById('txt-title');
const txtSubtitle = document.getElementById('txt-subtitle');
const lblRate = document.getElementById('lbl-rate');
const lblWeight = document.getElementById('lbl-weight');
const lblResult = document.getElementById('lbl-result');
const txtFormulaHint = document.getElementById('txt-formula-hint');

// Format Currency
function formatCurrency(amount) {
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Calculate
function calculate() {
  const rate = parseFloat(rateInput.value);
  const weight = parseFloat(weightInput.value);
  const t = translations[state.lang];

  if (isNaN(rate) || rate <= 0 || isNaN(weight) || weight <= 0) {
    totalPriceEl.textContent = '₹0.00';
    formulaBreakdownEl.textContent = t.formulaHint;
    return;
  }

  const weightInKg = state.unit === 'g' ? weight / 1000.0 : weight;
  const price = rate * weightInKg;
  const formattedPrice = formatCurrency(price);

  totalPriceEl.textContent = `₹${formattedPrice}`;
  formulaBreakdownEl.textContent = t.formulaTemplate(rate, weight, state.unit, formattedPrice);
}

// Switch Unit
function setUnit(unit) {
  if (state.unit === unit) return;
  const currentWeight = parseFloat(weightInput.value);
  state.unit = unit;

  if (unit === 'g') {
    unitGramsBtn.classList.add('active');
    unitKgBtn.classList.remove('active');
    unitSuffix.textContent = 'g';
    if (!isNaN(currentWeight) && currentWeight > 0) {
      weightInput.value = parseFloat((currentWeight * 1000).toFixed(2));
    }
  } else {
    unitKgBtn.classList.add('active');
    unitGramsBtn.classList.remove('active');
    unitSuffix.textContent = 'kg';
    if (!isNaN(currentWeight) && currentWeight > 0) {
      weightInput.value = parseFloat((currentWeight / 1000).toFixed(4));
    }
  }
  calculate();
}

// Switch Language
function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'hi' : 'en';
  applyLanguage();
}

function applyLanguage() {
  const t = translations[state.lang];
  txtTitle.textContent = t.title;
  txtSubtitle.textContent = t.subtitle;
  btnLangToggle.textContent = t.langBtn;
  lblRate.textContent = t.rateLabel;
  lblWeight.textContent = t.weightLabel;
  unitGramsBtn.textContent = t.unitGrams;
  unitKgBtn.textContent = t.unitKg;
  btnClear.textContent = t.clearBtn;
  lblResult.textContent = t.resultLabel;
  txtFormulaHint.textContent = t.bottomHint;
  calculate();
}

// Event Listeners
rateInput.addEventListener('input', calculate);
weightInput.addEventListener('input', calculate);
unitGramsBtn.addEventListener('click', () => setUnit('g'));
unitKgBtn.addEventListener('click', () => setUnit('kg'));
btnLangToggle.addEventListener('click', toggleLanguage);

btnClear.addEventListener('click', () => {
  weightInput.value = '';
  calculate();
  weightInput.focus();
});

// Init
applyLanguage();
