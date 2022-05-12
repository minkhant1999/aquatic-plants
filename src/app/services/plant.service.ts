import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { supabase } from '../firebase';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private plantsUrl =
    'https://art-of-bloom-default-rtdb.firebaseio.com/plants.json';
  private plantDetailsUrl =
    'https://art-of-bloom-default-rtdb.firebaseio.com/plantDetails';
  private _plants: any[] = [];
  private _fetched = false;
  private plants = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private loading: LoadingBarService) {}

  getAllPlants() {
    if (!this._fetched) {
      this.loading.start();
      this.http.get<any>(this.plantsUrl).subscribe((data) => {
        this._fetched = true;
        this._plants = Object.entries(data).map(function (entry) {
          const id = entry[0];
          const value: any = entry[1];
          return { id, ...value };
        });
        this.plants.next(this._plants);
        this.loading.complete();
      });
    }
    return this.plants.asObservable();
  }
  getPlantDetails(link: string) {
    // return this.http.get<any>(this.plantDetailsUrl + '/' + id + '.json');
    return from(supabase.from('plants').select('*').eq('link', link));
  }

  searchPlant(name_input: string) {
    return from(supabase.rpc('search_plants_by_name', { name_input }));
  }

  getAll() {
    return from(
      supabase.from('plants').select('id,name,price,image,link,created_at')
    );
  }
}
