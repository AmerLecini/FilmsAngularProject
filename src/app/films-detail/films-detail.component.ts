import { Component, OnInit } from '@angular/core';
import { FilmsModel } from '../films_model';
import { FilmsService } from '../films.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-films-detail',
  templateUrl: './films-detail.component.html',
  styleUrls: ['./films-detail.component.css'],
})
export class FilmsDetailComponent implements OnInit {
  filmsModel = {} as FilmsModel;

  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log('ktu: ' + param['filmId']);

      const filmId = param['filmId'];
      this.getFilmsById(filmId);
    });
  }

  getFilmsById(id: number) {
    this.filmsService.getFilmsById(id).subscribe((data) => {
      this.filmsModel = data;
      console.log(data);
    });
  }

  goToHome() {
    this.router.navigate(['/films']);
  }
}
