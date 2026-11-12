const EMAIL = "Varunkhera6@gmail.com";

// Update product names, descriptions, images, and labels here.
const PRODUCT_CATALOG = [
  {
    id: "edible-coffee-cups",
    name: "Edible Coffee Cups",
    description: "A crisp, delicious cup made for the last sip to be just as good as the first.",
    image: "/cup2eat-hero.png",
    note: "A little cup, a full finish",
  },
  {
    id: "chocolate-edible-cups",
    name: "Chocolate Edible Cups",
    description: "A cocoa-rich bite with a chocolate-lined finish. Made for coffee and cocoa moments.",
    image: "/cup2eat-products.png",
    note: "Chocolate, all the way through",
  },
  {
    id: "cookie-cups",
    name: "Cookie Cups",
    description: "Golden, crunchy and ready to turn your favourite drink into a treat.",
    image: "/cup2eat-gallery.png",
    note: "Your drink comes with dessert",
  },
  {
    id: "customized-edible-cups",
    name: "Customized Edible Cups",
    description: "A playful canvas for thoughtful gatherings, counters and brand moments.",
    image: "/cup2eat-products.png",
    note: "Made for your kind of moment",
  },
  {
    id: "special-beverage-cups",
    name: "Special Beverage Cups",
    description: "Distinctive edible cups for signature serves and occasions worth remembering.",
    image: "/cup2eat-gallery.png",
    note: "A better kind of serveware",
  },
];

const productList = document.querySelector("#product-list");
const productSelect = document.querySelector("#inquiry-product");
const inquiryDialog = document.querySelector("#inquiry-dialog");
const inquiryForm = document.querySelector("#inquiry-form");
const inquiryStatus = document.querySelector("#inquiry-status");
const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");
const menuButton = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("#mobile-menu");
const backToTop = document.querySelector("[data-back-to-top]");

function arrowIcon() {
  return '<span class="arrow-icon" aria-hidden="true">↗</span>';
}

function renderProducts() {
  productList.innerHTML = PRODUCT_CATALOG.map((product, index) => `
    <article class="product-row product-row-${index + 1}" id="${product.id}">
      <div class="product-visual">
        <img src="${product.image}" alt="${product.name} by CUP2EAT" width="1024" height="1024" loading="lazy" />
        <span class="product-number">0${index + 1}</span>
        <span class="product-note">${product.note}</span>
      </div>
      <div class="product-copy">
        <span class="product-category">CUP2EAT / ${String(index + 1).padStart(2, "0")}</span>
        <h3 class="serif">${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="price-label">Price on request</span>
          <button class="order-button" type="button" data-open-inquiry data-product="${product.name}">
            Order Now ${arrowIcon()}
          </button>
        </div>
      </div>
    </article>
  `).join("");

  PRODUCT_CATALOG.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productSelect.append(option);
  });
}

function openInquiry(productName = "") {
  inquiryForm.reset();
  inquiryStatus.textContent = "";
  productSelect.value = productName;
  inquiryDialog.showModal();
  requestAnimationFrame(() => inquiryForm.elements.name.focus());
}

function createMailto(subject, body) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function handleInquirySubmit(event) {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const values = new FormData(inquiryForm);
  const name = String(values.get("name")).trim();
  const phone = String(values.get("phone")).trim();
  const product = String(values.get("product"));
  const quantity = String(values.get("quantity")).trim();
  const location = String(values.get("location")).trim();
  if (!name || !phone || !product || !quantity || !location) return;

  const subject = `CUP2EAT product inquiry — ${product}`;
  const body = `Hello Varun,\n\nI'd like to enquire about CUP2EAT.\n\nName: ${name}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nDelivery location: ${location}\n\nPlease share availability and a quote.\n`;
  inquiryStatus.textContent = "Your email app should open with a draft. Nothing has been sent by this site.";
  window.location.href = createMailto(subject, body);
}

function handleContactSubmit(event) {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const values = new FormData(contactForm);
  const name = String(values.get("name")).trim();
  const email = String(values.get("email")).trim();
  const phone = String(values.get("phone")).trim();
  const message = String(values.get("message")).trim();
  if (!name || !email || !phone || !message) return;

  const subject = `CUP2EAT message from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
  contactStatus.textContent = "Your email app should open with a draft. Nothing has been sent by this site.";
  window.location.href = createMailto(subject, body);
}

renderProducts();
document.querySelector("#current-year").textContent = new Date().getFullYear();

document.addEventListener("click", (event) => {
  const orderButton = event.target.closest("[data-open-inquiry]");
  if (orderButton) {
    openInquiry(orderButton.dataset.product || "");
  }
});

document.querySelector("[data-close-dialog]").addEventListener("click", () => inquiryDialog.close());
inquiryDialog.addEventListener("click", (event) => {
  if (event.target === inquiryDialog) inquiryDialog.close();
});
inquiryForm.addEventListener("submit", handleInquirySubmit);
contactForm.addEventListener("submit", handleContactSubmit);

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  mobileMenu.hidden = isOpen;
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});
mobileMenu.querySelector("[data-open-inquiry]").addEventListener("click", () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
});

window.addEventListener("scroll", () => {
  backToTop.hidden = window.scrollY < 550;
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
