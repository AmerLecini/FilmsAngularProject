import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { FilmsModel } from 'src/app/models/films_model';

@Component({
  selector: 'app-edit-films',
  templateUrl: './edit-films.component.html',
  styleUrls: ['./edit-films.component.css'],
})
export class EditFilmsComponent implements OnInit {
  filmForm!: FormGroup;
  filmsModel = {} as FilmsModel;

  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filmForm = this.createForm();
    this.route.queryParams.subscribe((param) => {
      const filmId = param['filmId'];
      this.getFilmsById(filmId);
    });
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.filmsModel.id, Validators.required],
      name: [this.filmsModel.name, Validators.required],
      category: [this.filmsModel.category, Validators.required],
      state: [this.filmsModel.state, Validators.required],
      releayseYear: [this.filmsModel.releayseYear, Validators.required],
      imageUrl: [this.filmsModel.imageUrl, Validators.required],
      description: [this.filmsModel.description, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.filmForm.valid) {
      const filmdate = this.filmForm.value;
      const filmId = filmdate.id;
      this.filmsService.editFilm(filmId, filmdate).subscribe((date) => {
        console.log('Film is edited sucessfully', date);
        this.router.navigate(['/films']);
      });
    }
  }

  getFilmsById(id: number) {
    this.filmsService.getFilmsById(id).subscribe((data) => {
      this.filmsModel = data;
      this.filmForm = this.createForm();
    });
  }

  goToHome() {
    this.router.navigate(['/films']);
  }
}
