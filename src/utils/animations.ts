
// Animation utilities for enhanced user experience

export class AnimationUtils {
  // Intersection Observer for scroll animations
  static createScrollObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  }

  // Animate elements on scroll
  static animateOnScroll(selector: string, animationClass: string = 'animate-fade-in'): void {
    const elements = document.querySelectorAll(selector);
    
    const observer = this.createScrollObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach(el => observer.observe(el));
  }

  // Stagger animations for multiple elements
  static staggerAnimation(
    elements: NodeListOf<Element> | Element[],
    animationClass: string = 'animate-slide-up',
    delay: number = 100
  ): void {
    Array.from(elements).forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * delay);
    });
  }

  // Page transition animations
  static pageTransition(): Promise<void> {
    return new Promise((resolve) => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease-out';
      
      setTimeout(() => {
        document.body.style.opacity = '1';
        resolve();
      }, 300);
    });
  }

  // Smooth scroll with animation
  static smoothScrollTo(
    element: Element | string,
    options?: ScrollIntoViewOptions
  ): void {
    const target = typeof element === 'string' 
      ? document.querySelector(element) 
      : element;

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        ...options
      });
    }
  }

  // Loading animation
  static showLoadingSpinner(target: Element, message: string = 'Loading...'): void {
    target.innerHTML = `
      <div class="flex items-center justify-center space-x-2 animate-fade-in">
        <div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-b-transparent"></div>
        <span class="text-gray-600">${message}</span>
      </div>
    `;
  }

  // Success animation
  static showSuccess(target: Element, message: string): void {
    target.innerHTML = `
      <div class="flex items-center justify-center space-x-2 text-green-600 animate-scale-in">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span>${message}</span>
      </div>
    `;
  }

  // Enhanced hover effects
  static addHoverEffects(): void {
    const hoverElements = document.querySelectorAll('.hover-enhance');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('animate-pulse-subtle', 'transform', 'scale-105');
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('animate-pulse-subtle', 'transform', 'scale-105');
      });
    });
  }
}

// Auto-initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Animate cards on scroll
  AnimationUtils.animateOnScroll('.card-animate', 'animate-fade-in');
  
  // Animate product items
  AnimationUtils.animateOnScroll('.product-item', 'animate-slide-up');
  
  // Add hover effects
  AnimationUtils.addHoverEffects();
  
  // Stagger animate navigation items
  const navItems = document.querySelectorAll('.nav-item');
  if (navItems.length > 0) {
    AnimationUtils.staggerAnimation(navItems, 'animate-fade-in', 50);
  }
});
