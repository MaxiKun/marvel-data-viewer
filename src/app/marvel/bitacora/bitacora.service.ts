import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  private urlBitacora: string = 'http://localhost:9001/consumer/api/marvel/getDataBitacora';

  constructor(private http: HttpClient) { }

  async getDatosBitacora(): Promise<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const response$ = this.http.get(this.urlBitacora, { headers: headers });
    const response = await firstValueFrom(response$);

    return response;
  }

}
