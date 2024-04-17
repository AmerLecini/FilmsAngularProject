import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/films.service';
import { FilmsModel } from 'src/app/films_model';

@Component({
  selector: 'app-films-item',
  templateUrl: './films-item.component.html',
  styleUrls: ['./films-item.component.css'],
})
export class FilmsItemComponent {
  constructor(private router: Router, private filmService: FilmsService) {}

  @Input('film_item') film!: FilmsModel;

  goToEdit(id: number) {
    this.router.navigate(['/edit'], { queryParams: { filmId: id } });
  }

  goToDelete(id: number) {
    this.filmService.deleteFilm(id).subscribe();
    this.router.navigate(['/films']).then(() => {
      window.location.reload();
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/details'], { queryParams: { filmId: id } });
  }
}
