import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compensation-calculator',
  templateUrl: './compensation-calculator.component.html',
  styleUrls: ['../app.component.css']
})
export class CompensationCalculatorComponent {
  
  // Inputs

  income: number = 0;
  daysOnSickLeave: number = 0;
  hasTubercolosis: boolean = false;

  // Calculations

  employerCompensatesDays: number = 0;
  healthInsuranceCompensatesDays: number = 0;
  employerCompensatesAmount: number = 0;
  healthInsuranceCompensatesAmount: number  = 0;
  compensationTotal: number  = 0;

  maximumDurationInsurance:number = 182;
  maximumDurationInsuranceTuberculosis:number = 240;
  percentageOfIncome = (0.7 * this.income);
  totalDaysCompensated: number = 0;
  employerDailyAllowance: number = 0;
  InsuranceDailyAllowance: number = 0;
  

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
      
    } else {

      // Estonian health insurance pays

      // How many days employer compensates
      this.employerCompensatesDays = this.daysOnSickLeave > this.amountOfDaysNotCompensated  && this.daysOnSickLeave <= this.maxAmountOfDaysWhereHealthInsuranceDoesntCompensate ?  this.daysOnSickLeave - this.amountOfDaysNotCompensated : this.maxAmountOfDaysCompensatedByEmployer; 

      // How many days health insurance compensates

      this.healthInsuranceCompensatesDays = this.employerCompensatesDays === this.maxAmountOfDaysCompensatedByEmployer ? this.daysOnSickLeave - this.maxAmountOfDaysWhereHealthInsuranceDoesntCompensate : this.daysOnSickLeave - this.amountOfDaysNotCompensated - this.employerCompensatesDays;

      // How much worker is paid daily (70% of gross income)

      const paidDaily: number = this.percentageOfIncome / averageWorkingDaysInAMonth;

      // Amount employer compensates

      this.employerCompensatesAmount = this.employerCompensatesDays * paidDaily;

      // Amount health insurance compensates

      this.healthInsuranceCompensatesAmount = this.employerCompensatesDays === this.maxAmountOfDaysCompensatedByEmployer ? (this.daysOnSickLeave - this.employerCompensatesDays) * paidDaily : (this.daysOnSickLeave - this.amountOfDaysNotCompensated - this.employerCompensatesDays) * paidDaily ; 
      
      // Sum of the days being compensated

      this.totalDaysCompensated = this.employerCompensatesDays + this.healthInsuranceCompensatesDays;

      // Employers Daily Allowance

      this.employerDailyAllowance = this.employerCompensatesAmount / this.employerCompensatesDays;

      // Health Insurance Daily Allowance

      this.InsuranceDailyAllowance = this.healthInsuranceCompensatesAmount / this.healthInsuranceCompensatesDays;

      // Compenstation total

      this.compensationTotal = this.employerCompensatesAmount + this.healthInsuranceCompensatesAmount;
      
    }

  }
}
