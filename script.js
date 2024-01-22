'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// IMPLEMENTING SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function (e) {
  const s1coors = section1.getBoundingClientRect();
  console.log(s1coors);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coors.left + window.pageXOffset,
  //   s1coors.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: s1coors.left + window.pageXOffset,
  //   top: s1coors.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// --EVENT DELEGATION: IMPLEMENTING PAGE NAVEGATION--

// document.querySelectorAll('.nav__link').forEach(function (el, i) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // document
//     //   .getElementById(`section--${i + 1}`)
//     //   .scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// --BUILDING A TABBED COMPONENT--

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/* SELECTING, CREATING AND DELETING ELEMENTS */
/*
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);
document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

const allText = document.getElementsByTagName('p');
console.log(allText);

console.log(document.getElementsByClassName('btn'));

// Creating Elements
// .insertAdjancentHTML()

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
// 'We use cookies to improve our functionality and analytics';
message.innerHTML =
  'We use cookies to improve our functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  // message.remove();
  message.parentElement.removeChild(message);
});
*/
/* STYLES, ATTRIBUTES AND CLASSES */
/* STYLES */
/*
message.style.backgroundColor = '#37383d';
message.style.width = '103.3%';

console.log(message.style.height);
console.log(message.style.color);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES

const logo = document.querySelector('.nav__logo');

console.log(logo.src);
console.log(logo.alt);
console.log(logo.designer);
console.log(logo.className);

console.log(logo.getAttribute('designer'));
logo.alt = 'Beautiful logo Bank';

logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

// Data atributes
console.log(logo.dataset.versionNumber);

// CLASSES
logo.classList.add('j', 'c');
logo.classList.remove('j', 'c');
logo.classList.toggle('j');
logo.classList.contains('j');

logo.className = 'color';
*/

// TYPES OF EVENTS AND EVENT HANDLERS
/*
const h1 = document.querySelector('h1');

const alertH1 = e => {
  alert("You're hovering the h1");
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Old way of doing event handlers
// h1.onmouseenter = e => {
//   alert("You're hovering the h1 from the onmouseenter");
// };
*/

// --EVENT PROPAGATION: BUBBLING AND CAPTURING--
// --EVENT PROPAGATION IN PRACTICE--
/*
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true
);
*/

// --DOM TRAVERSING--
/*
const h1 = document.querySelector('h1');

// Going downwards: children
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
