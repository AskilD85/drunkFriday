import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-day-calculator',
  templateUrl: './day-calculator.component.html',
  styleUrls: ['./day-calculator.component.scss']
})
export class DayCalculatorComponent implements OnInit {

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
   }
  form = new FormGroup({
    date1: new FormControl('', [ Validators.required]),
    date2: new FormControl('', [Validators.required]),
    // recaptcha: new FormControl('', [Validators.required])
  });
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  showResult = false;
  chooseDate: string;
  mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  message: string;
  ngOnInit() {

  }



  sendForm() {
    console.log(1, this.showResult);
    this.dayCalc(this.form.value.date1, this.form.value.date2);
  }

  dayCalc(date1: Date | any, date2: any) {

    const date11 = new Date(date1);
    const date22 = new Date();

    const diff = date22.getTime() - date11.getTime();

    this.chooseDate = new Date(date11).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.milliseconds = diff;

    if (this.milliseconds < 0) {
      this.message = 'Дата ещё не наступила! До наступления даты осталось:';
    } else {
      this.message = 'Времени прошло:';
    }
    this.seconds = Math.abs(Math.round(this.milliseconds / 1000));
    this.minutes = Math.abs( Math.round(this.seconds / 60));
    this.hours = Math.abs(Math.round(this.minutes / 60));
    this.days =  Math.abs(Math.round(this.hours / 24));
    this.showResult = true;

}
}
