let navBtn = document.querySelector('.Navbar__Responsive');
      
navBtn.addEventListener('click', () => {
  console.dir(navBtn.children);
  let child = navBtn.children;
  if(child[0].classList.length === 1) {
    child[0].classList.add('hamburger-top')
    child[1].classList.add('hamburger-mid')
    child[2].classList.add('hamburger-bottom')
    document.querySelector('.Responsive__Nav').style.right = 0;
    document.querySelector('.Responsive__Nav').style.display = 'block';
  }
  else if(child[0].classList.length > 1) {
    child[0].classList.remove('hamburger-top')
    child[1].classList.remove('hamburger-mid')
    child[2].classList.remove('hamburger-bottom')
    document.querySelector('.Responsive__Nav').style.right = '-75%';
    document.querySelector('.Responsive__Nav').style.display = 'none';

  }
});

window.addEventListener('resize', () => {
  if(window.innerWidth < 950) {
    document.querySelector('.Navbar__Responsive').style.display = 'block'
    document.querySelector('.Responsive__Nav').style.right = '-75%';
    let child = navBtn.children
    child[0].classList.remove('hamburger-top')
    child[1].classList.remove('hamburger-mid')
    child[2].classList.remove('hamburger-bottom')
  }
  if(window.innerWidth > 950) {
    document.querySelector('.Navbar__Responsive').style.display = 'none'
    document.querySelector('.Responsive__Nav').style.right = '-75%';
    let childs = navBtn.children
    childs[0].classList.add('hamburger-top')
    childs[1].classList.add('hamburger-mid')
    childs[2].classList.add('hamburger-bottom')
  }
});

setInterval(() => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').innerHTML = new Date().toLocaleDateString(undefined, options) + ' ' +  new Date().toLocaleTimeString();
    //document.getElementById('time').innerHTML = new Date().toLocaleTimeString();
}, 100);
