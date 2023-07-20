import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('scrollTop', {static: false}) scrollTop: ElementRef | undefined;
  @ViewChild('preloader', {static: false}) preloader: ElementRef | undefined;

  preloaderTimeout: any;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight > 300) {
      this.scrollTop?.nativeElement.classList.add('show');
    } else {
      this.scrollTop?.nativeElement.classList.remove('show');
    }
  }

  scrollToTop() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  }

  ngAfterViewInit() {
    // Delay the visibility of preloader
    this.preloaderTimeout = setTimeout(() => {
      if (this.preloader && this.preloader.nativeElement) {
        this.preloader.nativeElement.style.display = 'block';
      }
    }, 2000);  // Show preloader after 2 seconds if page hasn't been loaded
    
    // Hide preloader when everything is loaded
    window.addEventListener('load', () => {
      clearTimeout(this.preloaderTimeout);  // Clear the timeout for preloader visibility
      if (this.preloader && this.preloader.nativeElement) {
        this.preloader.nativeElement.style.display = 'none';
      }
    });
}
  
}
