import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-candidate-summary',
  templateUrl: './candidate-summary.component.html',
  styleUrls: ['./candidate-summary.component.scss']
})
export class CandidateSummaryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  arraydata=[
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ashwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Ram',
    designation: 'Developer',
    mobile: 99853214232,
    image: '/assets/userimage.png',

  },

  {
    name: 'Monesh',
    designation: 'Developer',
    mobile: 99853214233,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'Bushwani',
    designation: 'Developer',
    mobile: 99853214234,
    image: '/assets/userimage.png',
    
  },
  {
    name: 'JayaPriya',
    designation: 'Developer',
    mobile: 99853214235,
    image: '/assets/userimage.png',
    
  },


]


editscreen(){
  this.router.navigate(['candidate/candidateinfo']);
}

viewScreen(){
  this.router.navigate(['candidate/dashboard']);
}





}
