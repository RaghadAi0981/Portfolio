function initProjectsSlider() {
  const slider = document.querySelector('.projects-slider');
  if (!slider) return;
  if (slider.dataset.sliderInitialized) return;
  slider.dataset.sliderInitialized = 'true';

  const track = slider.querySelector('.proj-track');
  const viewport = slider.querySelector('.proj-viewport');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const cards = Array.from(track.children);

  const getVisibleCount = () => {
    return window.matchMedia('(max-width:100%)').matches ? 1 : 2;
  };

  let index = 0;
  const maxIndex = () => Math.max(0, cards.length - getVisibleCount());

  // توليد النقاط
  const dotsWrap = slider.querySelector('.proj-dots');
  dotsWrap.innerHTML = '';
  const dots = Array.from({ length: maxIndex() + 1 }, (_, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('active');
    dotsWrap.appendChild(b);
    b.addEventListener('click', () => goTo(i));
    return b;
  });

  function update() {
    const cardWidth = cards[0].getBoundingClientRect().width + 24; // + gap
    track.style.transform = `translateX(${-index * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    prev.disabled = index === 0;
    next.disabled = index === maxIndex();
  }

  function goTo(i){
    index = Math.min(Math.max(i, 0), maxIndex());
    update();
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
  window.addEventListener('resize', () => {
    // أعد بناء النقاط عند تغيير عدد العناصر الظاهرة
    const oldLen = dots.length;
    const needed = maxIndex() + 1;
    if (needed !== oldLen) {
      dotsWrap.innerHTML = '';
      const nd = Array.from({ length: needed }, (_, i) => {
        const b = document.createElement('button');
        if (i === index) b.classList.add('active');
        dotsWrap.appendChild(b);
        b.addEventListener('click', () => goTo(i));
        return b;
      });
      nd.forEach((d,i)=> d.classList.toggle('active', i===index));
    }
    update();
  });

  // أول تحديث
  update();
}

window.initProjectsSlider = initProjectsSlider;
document.addEventListener('DOMContentLoaded', initProjectsSlider);
