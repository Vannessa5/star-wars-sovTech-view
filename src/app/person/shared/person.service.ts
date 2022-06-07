import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class PersonService {

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}`);
  }


  searchPersons(search: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/?search=${search}`);
  }
}
