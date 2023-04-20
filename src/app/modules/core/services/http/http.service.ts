import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../../../environments/environment';

abstract class HttpServiceBaseService {
  protected abstract get baseUrl(): string;
}

interface API_Config {
  APIName: string,
  body?: any,
  params?: { [header: string]: string | string[]; },
  showAlert?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService extends HttpServiceBaseService {

  private domainName = environment.HOST_API;

  constructor(private http: HttpClient, private alertService: AlertService) { super(); }

  get<T>(API_Config: API_Config) {
    return this.http
      .get<T>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, { params: API_Config.params });
  }

  post<T>(API_Config: API_Config) {
    return this.http
      .post<T>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, API_Config.body, { params: API_Config.params })
      .pipe(map(event => {
        API_Config.showAlert ? this.alertService.success('Successfully Done...') : '';
        return event;
      }));
  }

  put(API_Config: API_Config): Observable<boolean> {
    return this.http
      .put<boolean>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, API_Config.body, { params: API_Config.params })
      .pipe(map(event => {
        API_Config.showAlert ? this.alertService.success('Successfully Done...') : '';
        return event;
      }));
  }

  delete(API_Config: API_Config): Observable<boolean> {
    return this.http.
      delete<boolean>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, { body: API_Config.body, params: API_Config.params })
      .pipe(map(event => {
        API_Config.showAlert ? this.alertService.success('Successfully Done...') : '';
        return event;
      }));
  }
}
