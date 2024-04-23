import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-add-films',
  templateUrl: './add-films.component.html',
  styleUrls: ['./add-films.component.css'],
})
export class AddFilmsComponent implements OnInit {
  filmForm!: FormGroup;

  constructor(private filmsService: FilmsService, private router: Router) {}

  ngOnInit(): void {
    this.filmForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      releayseYear: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    if (this.filmForm.valid) {
      const filmData = this.filmForm.value;
      this.filmsService.createFilm(filmData).subscribe((response) => {
        console.log('Film created successfully:', response);
      });
    }
    this.router.navigate(['/films']);
  }

  goToHome() {
    this.router.navigate(['/films']);
  }
}
