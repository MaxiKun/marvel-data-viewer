import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private urlToken: string = 'http://localhost:9001/consumer/api/marvel/access';
  public token: string = '';

  constructor (private http: HttpClient, private router: Router) { }

  async login(username: string, password: string) {

    const response = await this.getToken(username, password);

      if(200 == response.status){

        this.token = response.token;

        Swal.fire({
          title: '<h5>Bienvenido</h5>',
          icon : 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-sm btn-outline-primary',
          },
          buttonsStyling: false
        }).then(() => {

          this.router.navigate(['/']);

        });

      }else{

        Swal.fire({
          title: '<h5>Datos inválidos</h5>',
          icon : 'error',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-sm btn-outline-primary',
          },
          buttonsStyling: false
        });

      }

  }

  logout() {

    this.token = '';

  }

  isAuthenticated(): boolean {

    return !!this.token;

  }

  async getToken(user: string, password: string): Promise<any> {

    let params = new HttpParams();
    params = params.append('user', user);
    params = params.append('password', password);
    const response$ = this.http.post(this.urlToken, {}, { params: params });
    const response = await firstValueFrom(response$);
    return response;
  }

}
