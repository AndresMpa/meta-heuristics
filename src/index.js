const simulate = document.querySelector('#simulate');

simulate.onclick = (event) => {
  event.preventDefault();
  simulate.classList += `animate__animated animate__backOutLeft`;
  simulate.style.display = 'none';
};
