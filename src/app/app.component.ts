import { Component, OnInit } from '@angular/core';
import { DataMarvelService } from './data-marvel.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  private sinDatos: string = 'Sin información';
  public images: Array<{ id: number; path: string; extension: string; name: string; }> = [];
  public titleCharacter: string = "";
  public descriptionCharacter: string = "";
  private datos: any;
  constructor(private dataMarvelService: DataMarvelService) { }

  ngOnInit(): void {

    this.dataMarvelService
        .listCharacter()
        .subscribe(data => {

          this.datos = data;
          this.validateResponse();

        });

  }

  validateResponse(): void {

    if (this.datos.status === 200) {

      for(const character of this.datos.arrayCharacters) {

        this.images.push({ id: character.id,
                           path: character.thumbnail.path,
                           extension: character.thumbnail.extension,
                           name: character.name});

      }

    } else {

      this.titleCharacter = `${this.sinDatos}`;
      this.descriptionCharacter = `${this.sinDatos}`;

      $('#descriptionModal').modal('show');

    }

  }

  async showDescription(id: number) {

    Swal.fire({
      title: '<h5>Cargando...</h5>',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const data = await this.dataMarvelService.getCharacter(id).toPromise();

      if (200 === data.status) {
        const character = data.arrayCharacters[0];
        this.titleCharacter = `${character.name}`;
        this.descriptionCharacter = `${character.description}`;
      } else {
        this.titleCharacter = `${this.sinDatos}`;
        this.descriptionCharacter = `${this.sinDatos}`;
      }
    } catch (error) {
      console.error(error);
    }

    Swal.close();
    $('#descriptionModal').modal('show');

  }

  title = 'marvel-data-viewer';
}
