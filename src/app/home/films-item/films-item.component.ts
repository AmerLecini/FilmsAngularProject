import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { FilmsModel } from 'src/app/models/films_model';

@Component({
  selector: 'app-films-item',
  templateUrl: './films-item.component.html',
  styleUrls: ['./films-item.component.css'],
})
export class FilmsItemComponent {
  @Input('film_item') film!: FilmsModel;
  @Output() deletedFilm = new EventEmitter<number>();
  constructor(
    private router: Router,
    private filmService: FilmsService,
    private route: ActivatedRoute
  ) {}

  goToEdit(id: number) {
    this.router.navigate(['/edit'], { queryParams: { filmId: id } });
  }

  goToDelete(id: number) {
    this.filmService.deleteFilm(id).subscribe(() => {
      this.deletedFilm.emit(id);
    });
    // this.router.navigate(['/films']).then(() => {
    //   window.location.reload();
    // });
  }

  goToDetail(id: number) {
    this.router.navigate(['/details'], { queryParams: { filmId: id } });
  }
}
