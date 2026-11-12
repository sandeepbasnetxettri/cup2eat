import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Coffee, Instagram, Leaf, Menu, MoveUpRight, Package, Sparkles, X } from 'lucide-react';

type Product = { id: string; name: string; description: string; image: string; note: string };

// Edit product names, copy, images, and small labels in this single catalog.
export const PRODUCT_CATALOG: Product[] = [
  { id: 'edible-coffee-cups', name: 'Edible Coffee Cups', description: 'A crisp, delicious cup made for the last sip to be just as good as the first.', image: '/cup2eat-hero.png', note: 'A little cup, a full finish' },
  { id: 'chocolate-edible-cups', name: 'Chocolate Edible Cups', description: 'A cocoa-rich bite with a chocolate-lined finish. Made for coffee and cocoa moments.', image: '/cup2eat-products.png', note: 'Chocolate, all the way through' },
  { id: 'cookie-cups', name: 'Cookie Cups', description: 'Golden, crunchy and ready to turn your favourite drink into a treat.', image: '/cup2eat-gallery.png', note: 'Your drink comes with dessert' },
  { id: 'customized-edible-cups', name: 'Customized Edible Cups', description: 'A playful canvas for thoughtful gatherings, counters and brand moments.', image: '/cup2eat-products.png', note: 'Made for your kind of moment' },
  { id: 'special-beverage-cups', name: 'Special Beverage Cups', description: 'Distinctive edible cups for signature serves and occasions worth remembering.', image: '/cup2eat-gallery.png', note: 'A better kind of serveware' },
];

const navItems = [
  { label: 'Our story', href: '#story' },
  { label: 'The cups', href: '#products' },
  { label: 'Our why', href: '#why' },
  { label: 'Find us', href: '#contact' },
];
const EMAIL = 'Varunkhera6@gmail.com';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 550);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!dialogProduct) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setDialogProduct(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [dialogProduct]);

  function openInquiry(product = '') {
    setInquirySent(false);
    setDialogProduct(product || ' ');
  }
  function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const product = String(form.get('product') || '');
    const quantity = String(form.get('quantity') || '').trim();
    const location = String(form.get('location') || '').trim();
    if (!name || !phone || !product || !quantity || !location) return;
    const subject = `CUP2EAT product inquiry — ${product}`;
    const body = `Hello Varun,\n\nI'd like to enquire about CUP2EAT.\n\nName: ${name}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nDelivery location: ${location}\n\nPlease share availability and a quote.\n`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setInquirySent(true);
  }
  function sendContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const message = String(form.get('message') || '').trim();
    if (!name || !email || !phone || !message) return;
    const subject = `CUP2EAT message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setContactSent(true);
    event.currentTarget.reset();
  }
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="grain min-h-[100dvh]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3">Skip to content</a>
      <div className="announcement"><span>Good things come full circle.</span><a href="#products">Meet your new favourite cup <ArrowRight size={14} /></a></div>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="CUP2EAT home"><span className="logo-cup">C</span><span>CUP<span className="logo-two">2</span>EAT</span><small>THE EDIBLE CUP CO.</small></a>
        <nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <button className="header-cta" onClick={() => openInquiry()} data-testid="button-order-header">Let’s talk <ArrowUpRight size={16} /></button>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}<ArrowUpRight size={16} /></a>)}<button onClick={() => { closeMenu(); openInquiry(); }}>Ask about a cup <ArrowRight size={16} /></button></nav>}

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-copy reveal">
            <span className="eyebrow"><span className="eyebrow-dot" /> A delicious little rethink</span>
            <h1>EAT YOUR<br /><em>DRINK!</em></h1>
            <p className="hero-sub">Revolutionizing the way you drink!</p>
            <p className="hero-desc">Meet the cup that turns your last sip into your next bite. CUP2EAT makes beverage moments a little more joyful—and a lot more memorable.</p>
            <div className="hero-actions"><a className="button button-green" href="#products">Explore the cups <ArrowRight size={17} /></a><button type="button" className="button hero-order" onClick={() => openInquiry()} data-testid="button-order-hero">Order Now <ArrowUpRight size={16} /></button><a className="text-link" href="#story">A taste of our story <ArrowDown size={15} /></a></div>
            <div className="hero-caption"><span className="caption-line" /> BAKED FOR THE MOMENT. MADE TO BE EATEN.</div>
          </div>
          <div className="hero-art reveal-delay">
            <div className="hero-image-frame"><img src="/cup2eat-hero.png" alt="Espresso served in a golden edible cookie cup" /></div>
            <div className="round-stamp"><span>GOOD TO THE</span><b>LAST<br />BITE</b><span>AND SIP</span></div>
            <span className="hero-side-note">A new kind of<br />coffee break ↗</span>
            <div className="hero-photo-label"><Coffee size={15} /> Sip. Smile. Crunch.</div>
          </div>
          <div className="hero-bottom-note"><span>01 / 05</span><span>Scroll to savour</span><ArrowDown size={15} /></div>
        </section>

        <section className="slogan-band" aria-label="CUP2EAT slogan"><p>Eat Your Drink! 🍸😋</p><span>Good taste, with a twist.</span></section>

        <section className="story section-wrap" id="story">
          <div className="section-kicker"><span>01</span><span className="kicker-rule" /> THE CUP THAT STARTED A CONVERSATION</div>
          <div className="story-grid">
            <div className="story-heading"><h2 className="serif">A small cup.<br /><em>A big idea.</em></h2><div className="story-sticker"><Sparkles size={18} /><span>Not just<br />a container.</span></div></div>
            <div className="story-text"><p className="story-lede">What if the best part of your drink was the cup you could eat after?</p><p>CUP2EAT began with a simple question and a founder who wanted everyday beverage rituals to feel more thoughtful. Varun Khera imagined a cup that could be part of the treat—not something you set aside when the good part is over.</p><p>Today, we’re exploring edible cups and more considered ways to serve. One delicious moment at a time.</p><a href="#contact" className="text-link">Say hello to Varun <ArrowRight size={16} /></a></div>
          </div>
          <div className="mission-row"><div><span className="mini-label">OUR MISSION</span><p>Make the everyday drink break more imaginative, with edible cups made for sharing, savouring and talking about.</p></div><div><span className="mini-label">OUR VISION</span><p>A world of beverage moments where the serving itself becomes part of the experience.</p></div><div className="founder-tag"><span className="founder-mark">VK</span><div><span className="mini-label">FOUNDED BY</span><strong>VARUN KHERA</strong></div></div></div>
        </section>

        <section className="products-section" id="products">
          <div className="section-wrap">
            <div className="section-kicker light-kicker"><span>02</span><span className="kicker-rule" /> GOOD THINGS COME IN EDIBLE CUPS</div>
            <div className="products-heading"><div><span className="mini-label">THE CUP COLLECTION</span><h2 className="serif">Pick your <em>crunch.</em></h2></div><p>Different sips call for different bites. Find the one that feels like you.</p></div>
            <div className="product-list">{PRODUCT_CATALOG.map((product, index) => <article className={`product-row product-row-${index + 1}`} key={product.id} id={product.id}>
              <div className="product-visual"><img src={product.image} alt={`${product.name} by CUP2EAT`} loading="lazy" /><span className="product-number">0{index + 1}</span><span className="product-note">{product.note}</span></div>
              <div className="product-copy"><span className="product-category">CUP2EAT / {String(index + 1).padStart(2, '0')}</span><h3 className="serif">{product.name}</h3><p>{product.description}</p><div className="product-bottom"><span className="price-label">Price on request</span><button className="order-button" onClick={() => openInquiry(product.name)} data-testid={`button-order-${product.id}`}>Order Now <ArrowUpRight size={16} /></button></div></div>
            </article>)}</div>
            <p className="product-footnote"><Package size={16} /> Tell us what you have in mind—we’ll help you find the right fit.</p>
          </div>
        </section>

        <section className="why section-wrap" id="why">
          <div className="why-intro"><div className="section-kicker"><span>03</span><span className="kicker-rule" /> THE CUP2EAT DIFFERENCE</div><h2 className="serif">Why sip when<br />you can <em>savour?</em></h2><p>Because a good drink deserves an ending that’s just as fun.</p><a className="text-link" href="#contact">Let’s dream up your serve <ArrowRight size={16} /></a></div>
          <div className="why-points">
            <article className="why-point"><span className="why-icon"><Coffee size={21} /></span><div><span className="point-index">01 / EXPERIENCE</span><h3>A cup with a second act</h3><p>Finish your drink, then enjoy the cup. It’s an unexpected little moment built into the ritual.</p></div></article>
            <article className="why-point"><span className="why-icon"><Sparkles size={21} /></span><div><span className="point-index">02 / DELIGHT</span><h3>Made to make people smile</h3><p>For café counters, celebrations and conversations that deserve something a little different.</p></div></article>
            <article className="why-point"><span className="why-icon"><Leaf size={21} /></span><div><span className="point-index">03 / INTENTION</span><h3>A more thoughtful serving</h3><p>We’re curious about how the cup can be part of the treat—and part of a better conversation around serving.</p></div></article>
          </div>
        </section>

        <section className="sustainability">
          <div className="sustain-image"><img src="/cup2eat-products.png" alt="Edible cups arranged for a thoughtful beverage serving" loading="lazy" /><span className="image-annotation">A different kind of finish</span></div>
          <div className="sustain-copy"><span className="mini-label">A LITTLE MORE THOUGHTFUL</span><h2 className="serif">Drink Responsibly.<br /><em>Leave Less Waste.</em></h2><p>We believe the serving can be part of the experience, not an afterthought. CUP2EAT is exploring edible alternatives to conventional cups—with care, curiosity and no grand promises.</p><a href="#products" className="button button-cream">See what’s cooking <ArrowRight size={17} /></a><span className="honest-note">Every choice has its context. Ask us about the right fit for your serve.</span></div>
          <span className="sustain-index">A BETTER BITE, NOT A BIG CLAIM.</span>
        </section>

        <section className="gallery section-wrap" id="gallery">
          <div className="section-kicker"><span>04</span><span className="kicker-rule" /> SERVED WITH A SIDE OF JOY</div>
          <div className="gallery-heading"><h2 className="serif">A few good <em>moments.</em></h2><p>Some ways we imagine the edible cup at the table.<br />Not a live feed—just a little inspiration.</p></div>
          <div className="gallery-grid"><figure className="gallery-tall"><img src="/cup2eat-gallery.png" alt="A spread of beverages in edible cups" loading="lazy" /><figcaption><span>01 — THE AFTERNOON PAUSE</span><b>Something to sip. Something to savour.</b></figcaption></figure><figure className="gallery-small gallery-orange"><img src="/cup2eat-products.png" alt="Cookie and chocolate edible cups on a platter" loading="lazy" /><figcaption><span>02 — THE SWEET SIDE</span><b>Made for the last bite.</b></figcaption></figure><figure className="gallery-small gallery-green"><div className="gallery-quote"><span>“</span><p>Make your<br />drink break<br /><em>count.</em></p><small>— CUP2EAT</small></div></figure></div>
          <a className="instagram-link" href="https://www.instagram.com/cup2eat" target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Follow us on Instagram <MoveUpRight size={16} /></a>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-wrap">
            <div className="contact-copy"><div className="section-kicker light-kicker"><span>05</span><span className="kicker-rule" /> GOOD THINGS START WITH A HELLO</div><h2 className="serif">Let’s make<br />a <em>moment.</em></h2><p>Have a question, an idea, or a special serve in mind? We’d love to hear what you’re thinking.</p><div className="contact-details"><a href="tel:9818192575"><span className="detail-icon"><ArrowUpRight size={16} /></span><span><small>GIVE US A RING</small><strong>9818192575</strong></span></a><a href={`mailto:${EMAIL}`}><span className="detail-icon"><ArrowUpRight size={16} /></span><span><small>DROP US A NOTE</small><strong>{EMAIL}</strong></span></a><a href="https://www.instagram.com/cup2eat" target="_blank" rel="noopener noreferrer"><span className="detail-icon"><Instagram size={16} /></span><span><small>FOLLOW THE GOOD BITS</small><strong>@cup2eat</strong></span></a></div></div>
            <form className="contact-form" onSubmit={sendContact} noValidate><h3 className="serif">Send a little note</h3><p className="form-intro">We’ll open your email app with the details ready to go.</p><label>Your name<input name="name" autoComplete="name" required minLength={2} placeholder="What should we call you?" data-testid="input-contact-name" /></label><label>Your email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" data-testid="input-contact-email" /></label><label>Your phone<input name="phone" type="tel" autoComplete="tel" required pattern="[0-9+() .-]{7,}" placeholder="A number we can reach you on" data-testid="input-contact-phone" /></label><label>Your message<textarea name="message" rows={3} required minLength={5} placeholder="Tell us what’s on your mind..." data-testid="input-contact-message" /></label><button className="button button-green submit-button" type="submit">Open email draft <ArrowRight size={17} /></button><p className="privacy-note"><Check size={14} /> This site doesn’t store or send your message. Your email app will open a draft for you to review and send.</p>{contactSent && <p className="form-success" role="status">Your email draft is ready to review. Nothing has been sent by this site.</p>}</form>
          </div>
        </section>
      </main>

      <footer className="footer"><a href="#home" className="wordmark footer-mark" aria-label="CUP2EAT back to top"><span className="logo-cup">C</span><span>CUP<span className="logo-two">2</span>EAT</span><small>THE EDIBLE CUP CO.</small></a><p>Good taste, with a twist.</p><div className="footer-links"><a href="#products">The cups</a><a href="#story">Our story</a><a href="https://www.instagram.com/cup2eat" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a></div><span className="copyright">© {new Date().getFullYear()} CUP2EAT · VARUN KHERA</span></footer>

      {showTop && <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-back-to-top"><ArrowDown size={17} /></button>}
      {dialogProduct !== null && <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialogProduct(null); }}><section className="inquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button className="dialog-close" aria-label="Close inquiry form" onClick={() => setDialogProduct(null)} data-testid="button-close-inquiry"><X size={20} /></button><span className="dialog-eyebrow">A GOOD PLACE TO START</span><h2 className="serif" id="dialog-title">Let’s talk <em>cups.</em></h2><p className="dialog-intro">Share a few details and we’ll prepare an email inquiry for you.</p><form onSubmit={sendInquiry} className="inquiry-form" noValidate><label>Your name<input name="name" required minLength={2} autoComplete="name" placeholder="Your name" data-testid="input-inquiry-name" /></label><label>Phone number<input name="phone" required type="tel" pattern="[0-9+() .-]{7,}" autoComplete="tel" placeholder="Your phone number" data-testid="input-inquiry-phone" /></label><label>Choose a cup<select name="product" required defaultValue={dialogProduct.trim()} data-testid="select-inquiry-product"><option value="" disabled>Select a product</option>{PRODUCT_CATALOG.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select><ChevronDown className="select-chevron" size={16} /></label><div className="quantity-location"><label>Quantity<input name="quantity" required minLength={1} placeholder="e.g. 100 cups" data-testid="input-inquiry-quantity" /></label><label>Delivery location<input name="location" required minLength={2} placeholder="City / PIN code" data-testid="input-inquiry-location" /></label></div><button type="submit" className="button button-green submit-button">Prepare my email <ArrowRight size={17} /></button><p className="privacy-note"><Check size={14} /> This site does not store or send inquiries. Your email app opens a prefilled draft to {EMAIL}; review and send it yourself.</p>{inquirySent && <p className="form-success" role="status">Your email app should open with a draft. The inquiry has not been sent by this site.</p>}</form></section></div>}
    </div>
  );
}

export default App;
