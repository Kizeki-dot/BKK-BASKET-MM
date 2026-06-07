const translations = document.querySelectorAll('[data-en][data-mm]');
const placeholderTranslations = document.querySelectorAll('[data-placeholder-en][data-placeholder-mm]');
const langButtons = document.querySelectorAll('.lang-btn');

function setLanguage(lang) {
  translations.forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  placeholderTranslations.forEach((el) => {
    el.placeholder = lang === 'mm' ? el.dataset.placeholderMm : el.dataset.placeholderEn;
  });
  langButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
  document.documentElement.lang = lang === 'mm' ? 'my' : 'en';
  localStorage.setItem('bkkBasketLanguage', lang);
}

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

setLanguage(localStorage.getItem('bkkBasketLanguage') || 'en');

document.getElementById('orderForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const product = document.getElementById('product').value.trim();
  const qty = document.getElementById('qty').value.trim();
  const location = document.getElementById('location').value.trim();
  const note = document.getElementById('note').value.trim();
  const lang = localStorage.getItem('bkkBasketLanguage') || 'en';

  const rawMessage = lang === 'mm'
    ? `မင်္ဂလာပါ BKK Basket MM 💚\n\nအော်ဒါတင်ချင်ပါတယ်ရှင့်\nနာမည်: ${name}\nဖုန်း: ${phone}\nပစ္စည်း: ${product}\nအရေအတွက်: ${qty}\nပို့ဆောင်ရန်နေရာ: ${location}\nမှတ်ချက်: ${note}`
    : `Hello BKK Basket MM 💚\n\nI want to order:\nName: ${name}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${qty}\nDelivery Location: ${location}\nNote: ${note}`;
    navigator.clipboard.writeText(rawMessage);

alert(
  "✅ အော်ဒါစာကို Copy ကူးထားပြီးပါပြီ။\n\n" +
  "အကယ်၍ Telegram ထဲတွင် စာသားများ အလိုအလျောက် မပေါ်လာပါက Messagebox မှာ Paste (ထည့်ကူး) လုပ်ပေးပါရှင့် 💚"
);

window.location.href =
  `https://t.me/bkk_basket_mm?text=${encodeURIComponent(rawMessage)}`;
});

const revealItems = document.querySelectorAll('.section, .card, .receipt-box');

revealItems.forEach((item) => item.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach((item) => revealObserver.observe(item));