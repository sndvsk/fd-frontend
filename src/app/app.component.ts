import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('scrollTop', { static: false }) scrollTop: ElementRef | undefined;
  @ViewChild('preloader', { static: false }) preloader: ElementRef | undefined;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollHeight = window.scrollY;
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
      behavior: 'smooth',
    });
  }

  ngAfterViewInit() {
    // Hide preloader when everything is loaded
    window.addEventListener('load', () => {
      if (this.preloader && this.preloader.nativeElement) {
        this.preloader.nativeElement.style.display = 'none';
      }
    });
  }
}
