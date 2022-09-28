import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-profile-view',
  templateUrl: './candidate-profile-view.component.html',
  styleUrls: ['./candidate-profile-view.component.scss']
})
export class CandidateProfileViewComponent implements OnInit {

  abcd = 'swathi';
  xyz= 'priya';
  mnop= 'N';
  ss= 'rss@gmail.com';
  gmm= '9988556789';
  datevalue= '01.01.2022'
  gender= 'female'
  lineName1 = 'No.40/34 Narayanaswamy ';
  lineName3= '1st Cross Street';
  lineName2= '2nd Main Road';
  cityName= 'T.Nagar';
  districtName= 'Chennai';
  stateName= 'TamilNadu'
  pinCode= '600017'

  constructor() { }

  ngOnInit(): void {
  }


  step = 0;
  setStep(index: number) {
    this.step = index;
  }

}
