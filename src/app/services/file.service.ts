import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getFile(id: string) {
    //TODO
    return this.http.get(this.URL + `/offers/${id}/file`);
  }
}
