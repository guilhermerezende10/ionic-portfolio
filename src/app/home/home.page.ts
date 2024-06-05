import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    this.initSlider();
  }

  initSlider() {
    const slider = () => {
      const slides = document.querySelectorAll('.slide');
      const slider = document.querySelector('.slider');
      const btnLeft = document.querySelector('.slider__btn--left');
      const btnRight = document.querySelector('.slider__btn--right');
      const dotContainer = document.querySelector('.dots');
      const btnScrollTo = document.querySelector('.btn--scroll-to');
      const section1 = document.querySelector('#section--1');
      
      // Ensure necessary elements are present
      if (!slides.length || !slider || !btnLeft || !btnRight || !dotContainer) {
        console.error('Slider initialization failed: Missing elements.');
        return;
      }

      let curSlide = 0;
      const maxSlide = slides.length - 1;
      const minSlide = 0;

      const createDots = function () {
        slides.forEach((_, i) => {
          dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button id="btn${i}"data-slide="${i}"></button>`
          );

          const el = document.getElementById(`btn${i}`);
          if(el) {
            el?.classList.add('dots__dot')
            el.style.background = "#b9b9b9"
            el.style.opacity = '0.5'
            el.style.borderRadius = '50%'
            el.style.width = '1rem'
            el.style.height = '1rem'

          } 
        });
      };

      const activeDot = (slide: number) => {
        // Ensure dotContainer exists
        if (!dotContainer) return;
      
        // Find the active dot based on the current slide
        const activeDot = dotContainer.querySelector(
          `.dots__dot[data-slide="${slide}"]`
        ) as HTMLElement;
      
        // Remove the active class and set opacity for all dots
        dotContainer.querySelectorAll('.dots__dot').forEach((dot) => {
          (dot as HTMLElement).style.opacity = '0.5';
          (dot as HTMLElement).style.width = '1rem';
          (dot as HTMLElement).style.height = '1rem';
          dot.classList.remove('dots__dot--active');
        });
      
        // Ensure activeDot is not null before modifying it
        if (activeDot) {
          activeDot.style.transition = '0.3s';
          activeDot.style.opacity = '1';
          activeDot.style.width = '1.15rem'
          activeDot.style.height = '1.15rem'
          activeDot.classList.add('dots__dot--active');
        }
      };
      
      
      

      const goToSlide = (slide: number) => {
        slides.forEach((s, i) => {
          (s as HTMLElement).style.transform = `translateX(${
            (i - slide) * 100
          }%)`;
        });
      };

      const init = () => {
        createDots();
        goToSlide(0);
        activeDot(0);
      };
      init();

      const nextSlide = () => {
        curSlide = curSlide === maxSlide ? 0 : curSlide + 1;
        goToSlide(curSlide);
        activeDot(curSlide);
      };

      const previousSlide = () => {
        curSlide = curSlide === minSlide ? maxSlide : curSlide - 1;
        goToSlide(curSlide);
        activeDot(curSlide);
      };

      btnRight.addEventListener('click', nextSlide);
      btnLeft.addEventListener('click', previousSlide);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') previousSlide();
        else if (e.key === 'ArrowRight') nextSlide();
      });

      dotContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('dots__dot')) {
          const slide = target.dataset['slide'];
          if (slide) {
            const slideIndex = parseInt(slide);
            goToSlide(slideIndex);
            activeDot(slideIndex);
          }
        }
      });
    };

    slider();
    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');
    this.scrollTo(btnScrollTo, section1);
  }

  scrollTo(btn: any, target: any) {
   

    if (btn && target) {
      btn.addEventListener('click', function () {
        target.scrollIntoView({ behavior: 'smooth' });
        console.log('entrou');
      });
    } else {
      console.log('Button or section not found.');
    }
  }

  
}
