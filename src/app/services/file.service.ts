import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';
import {AppError} from '../errors/appError';
import {catchError, map} from 'rxjs/operators';
import {NotFoundError} from '../errors/notFoundError';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getFile(id: string) {
    return this.http.get(this.URL + `/offers/${id}/file`, {responseType: 'blob'}).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          throw new NotFoundError(err);
        } else {
          throw new AppError(err);
        }
      }),
      map((response) => {
        return response;
      }));
  }
}
