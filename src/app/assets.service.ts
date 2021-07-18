import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  constructor(private http: HttpClient) { }

  get(filePath: string): Promise<void | any> {
    return this.http.get('/assets/' + filePath)
      .toPromise()
      .catch(this.error);
  }

  private error (error: any) {
    let message = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
