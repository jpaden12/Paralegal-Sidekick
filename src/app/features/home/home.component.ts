import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from "@angular/router";
import { AppService } from '../../app.service';
import { FormGroup } from '@angular/forms';

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
  selector: 'home',
  imports: [MatFormFieldModule, MatSelectModule, MatGridListModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  protected globalState: AppService = inject(AppService);
  

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

  form = new FormGroup({
    
  })

}
