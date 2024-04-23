import { Component, Input, OnInit } from '@angular/core';
import { FilmsModel } from '../models/films_model';
import { FilmsService } from '../services/films.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  filmlist: FilmsModel[] = [];
  filterfilm: FilmsModel[] = [];
  currentCategory: string | null = null;
  categories: string[] = [
    'Drama',
    'Action',
    'Comedy',
    'Horror',
    'Science',
    'Fantasy',
  ];

  constructor(
    private filmService: FilmsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFilmsApi();
  }

  filterByCategory(category: string) {
    this.filmService.getFilmByCategory(category).subscribe((data) => {
      this.filmlist = data;
    });
  }

  filterName(text: string) {
    if (!text) {
      this.filterfilm = this.filmlist;
    } else {
      this.filmlist = this.filmlist.filter((film) =>
        film?.name?.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  getFilmsApi() {
    this.filmService.getFilmsFromApi().subscribe((data) => {
      this.filmlist = data;
    });
  }

  filterByFavorites(favorite: string) {
    this.filmService.getFavoriteFilm(favorite).subscribe((data) => {
      this.filmlist = data;
    });
  }

  handleDeletedFilm(id: number) {
    console.log('Film with this id ' + id + ' is deleted');
    this.filmlist = this.filmlist.filter((film) => film.id !== id);
  }

  goToDetails(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
