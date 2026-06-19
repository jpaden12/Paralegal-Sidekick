import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from "@angular/router";

interface ClientProfile {
  name: string;
  date_of_birth: Date; 
  home_address: string;
  medical_provider: string;
}

interface Form {
  name: string; 
  state: string;
  number: number;
}


@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule, MatSelectModule, MatGridListModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  clients: ClientProfile[] = [
    {
      name: "John Stamos",
      date_of_birth: new Date(1996, 4, 4), 
      home_address: "123 Sesame St", 
      medical_provider: "Sanjay Gupta"
    },
    {
      name: "SpongeBob SquarePants",
      date_of_birth: new Date(1999, 3, 4), 
      home_address: "123 Sesame St", 
      medical_provider: "Dr. Krabs"
    },
    {
      name: "Jalen Brunson",
      date_of_birth: new Date(1990, 5, 4), 
      home_address: "Madison Sq Garden", 
      medical_provider: "Sanjay Gupta"
    }
  ]

  forms: Form[] = [
    {
      name: "HIPAA Authorization",
      state: "NY",
      number: 960
    }
  ]

}
