import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment.prod";
import { debounceTime } from "rxjs/operators";
@Injectable()
export class SharedService {
  public headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Access-Control-Allow-Origin", "*");

  public uri = environment.localurl;

  constructor(private http: HttpClient) {}

  public getParkingCapacity(data) {
    return this.http.post(`${this.uri}/totalparkingslot`, data);
  }

  public updateParkingCapacity(data) {
    return this.http.post(`${this.uri}/totalparkingslot/calculate`, data);
  }
}
