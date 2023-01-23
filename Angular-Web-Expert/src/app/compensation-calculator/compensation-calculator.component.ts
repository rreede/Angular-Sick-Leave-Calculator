import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compensation-calculator',
  templateUrl: './compensation-calculator.component.html',
  styleUrls: ['../app.component.css']
})
export class CompensationCalculatorComponent {
  
  /* Inputs */ 

  income: number = 0;
  daysOnSickLeave: number = 0;
  hasTubercolosis: boolean = false;

  /* Calculations */

  employerCompensatesDays: number = 0;
  healthInsuranceCompensatesDays: number = 0;
  employerCompensatesAmount: number = 0;
  healthInsuranceCompensatesAmount: number  = 0;
  compensationTotal: number  = 0;

  maximumDurationInsurance:number = 182;
  maximumDurationInsuranceTuberculosis:number = 240;
  percentageOfIncome = (0.7 * this.income);

  // Constants
  amountOfDaysNotCompensated: number = 3;
  maxAmountOfDaysCompensatedByEmployer: number = 5;
  maxAmountOfDaysWhereHealthInsuranceDoesntCompensate: number = 8;
  listOfAverageWorkingDaysInAMonth: number[] = [19, 20, 21, 22];
  
  

  onCalculateCompensation() {
    const averageWorkingDaysInAMonth: number = Math.ceil(this.listOfAverageWorkingDaysInAMonth.reduce((a, b) => {
      return a + b;
    }, 0) / 4)
    // 3 or Less Days No compensation
    if (this.daysOnSickLeave < this.amountOfDaysNotCompensated + 1)  {
      this.employerCompensatesDays = 0;
      this.healthInsuranceCompensatesDays = 0;
    // Estonian health insurance pays
    } else {

      this.employerCompensatesDays = this.daysOnSickLeave > this.amountOfDaysNotCompensated  && this.daysOnSickLeave <= this.maxAmountOfDaysWhereHealthInsuranceDoesntCompensate ?  this.daysOnSickLeave - this.amountOfDaysNotCompensated : this.maxAmountOfDaysCompensatedByEmployer; 

      this.healthInsuranceCompensatesDays = this.employerCompensatesDays === this.maxAmountOfDaysCompensatedByEmployer ? this.daysOnSickLeave - this.maxAmountOfDaysWhereHealthInsuranceDoesntCompensate : this.daysOnSickLeave - this.amountOfDaysNotCompensated - this.employerCompensatesDays; 

      const paidDaily: number = this.percentageOfIncome / averageWorkingDaysInAMonth;
      this.employerCompensatesAmount = this.employerCompensatesDays * paidDaily; 

      this.healthInsuranceCompensatesAmount = this.employerCompensatesDays === this.maxAmountOfDaysCompensatedByEmployer ? (this.daysOnSickLeave - this.employerCompensatesDays) * paidDaily : (this.daysOnSickLeave - this.amountOfDaysNotCompensated - this.employerCompensatesDays) * paidDaily ; 

      this.compensationTotal = 0;

      (averageWorkingDaysInAMonth);
      
    }

  }
}
