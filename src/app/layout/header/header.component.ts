import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  buscador: FormGroup = new FormGroup({
    busqueda: new FormControl('')
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  buscar() {
    this.router.navigate(['/search', this.buscador.value.busqueda]);
  }

}
