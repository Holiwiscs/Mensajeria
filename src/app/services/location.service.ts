import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { apiRest } from '../models/apiRest';
import { Region } from '../models/region';
import { Comuna } from '../models/comuna';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  async obtenerRegion(){
    return await lastValueFrom(this.http.get<apiRest<Region>>(`${environment.apiUrl}region`));
  }

  async obtenerComuna(idRegion:number){
    return await lastValueFrom(this.http.get<apiRest<Comuna>>(`${environment.apiUrl}Comuna?par_region_id=`+idRegion));
  }
  
}
