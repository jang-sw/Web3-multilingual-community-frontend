import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css',
})
export class TranslateComponent implements OnInit {

  constructor(){

  }

  ngOnInit(): void {
    this.loadGoogleTranslate();
  }
  
  loadGoogleTranslate(): void {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    (window as any).googleTranslateElementInit = this.googleTranslateElementInit;
  }

  googleTranslateElementInit(): void {
    new (window as any).google.translate.TranslateElement({
      pageLanguage: !sessionStorage.getItem("lang") ? 'ko' : sessionStorage.getItem("lang") ,
      includedLanguages: 'en,ja,ko'
    }, 'google_translate_element');
  }

  translate(event: any){
    const tolang = event.target.value;
    sessionStorage.setItem("lang", tolang);    
		const gtcombo: any = document.querySelector('.goog-te-combo');
    if (gtcombo == null) {
      alert("Error: Could not find Google translate Combolist.");
      return false;
    }
    gtcombo.value = tolang; 
    gtcombo.dispatchEvent(new Event('change')); 

    return false;
  }
}
