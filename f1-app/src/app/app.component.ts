import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";

export interface Stint {
  type: "p" | "o" | "i" | "c";
}
export interface Strategy {
  stints: Stint[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSliderModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, MatSelect, MatOption, MatDivider, MatButton, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  public pushLapTime:string = "01:23";
  public cooldownTime:string = "01:45";
  public pitLaneTime:string = "00:41";

  private inLapTime!:number;
  private outLapTime!:number;

  public trackPerformance:"Top Speed" | "Balanced" | "Downforce" | undefined = undefined;
  public tyreWear:"High" | "Medium" | "Low" | undefined = undefined;
  public trackLength:number = 5.241;
  public trackLengthPattern = "^\\d\\.\\d\\d\\d$";

  public q1duration:string = "18:00";
  public q2duration:string = "15:00";
  public q3duration:string = "12:00";

  public q1strategies:Strategy[] = [];
  public q2strategies:Strategy[] = [];
  public q3strategies:Strategy[] = [];

  public calculate() {
    this.calculateInOutLapTime();
    this.calculateQ1();
    this.calculateQ2();
    this.calculateQ3();
    this.visualise();
  }
  private calculateInOutLapTime() {
    this.inLapTime = (this.getPushLapTime()*0.6+this.getCooldownLapTime()*0.4)/2 + 0.5*this.getPitLaneTime();
    this.outLapTime = this.getCooldownLapTime() + 0.8*this.getPitLaneTime();
  }
  private calculateQ1() {
    const single = this.outLapTime + this.inLapTime + this.getPushLapTime();
    const double = this.outLapTime + this.inLapTime + 2*this.getPushLapTime() + this.getCooldownLapTime();
    const triple = this.outLapTime + this.inLapTime + 3*this.getPushLapTime() + 2*this.getCooldownLapTime();

    const doubleStrategy:Stint[] = [{type: "o"},{type: "p"},{type: "c"},{type: "p"},{type: "i"}];

    if (this.getTyreWear() == "High") {
      //no doublepush
    } else {
      console.log(this.getQ1Duration()/double)
      console.log(this.getQ1Duration()/single)
      this.q1strategies.push({stints:doubleStrategy});
      console.log(this.q1strategies)
      //double push good
    }
  }

  private calculateQ2() {

  }

  private calculateQ3() {

  }

  private visualise() {

  }


  getPushLapTime(): number {
    return this.stringToSeconds(this.pushLapTime);
  }
  getCooldownLapTime(): number {
    return this.stringToSeconds(this.cooldownTime);
  }
  getPitLaneTime(): number {
    return this.stringToSeconds(this.pitLaneTime);
  }
  getQ1Duration(): number {
    return this.stringToSeconds(this.q1duration);
  }
  getQ2Duration(): number {
    return this.stringToSeconds(this.q2duration);
  }
  getQ3Duration(): number {
    return this.stringToSeconds(this.q3duration);
  }
  getTrackPerformance() {
    return this.trackPerformance;
  }
  getTyreWear() {
    return this.tyreWear;
  }
  getTrackLength():number {
    return this.trackLength*1000;
  }

  stringToSeconds(mmss:string):number {
    const h = Number(mmss.substring(0,2)) * 60;
    const m = Number(mmss.substring(3,5));
    return h+m;
  }
}
