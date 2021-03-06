import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserAuthDataService } from './userData/user-auth-data.service';
import { video } from 'src/app/models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoWatchedService {
  token: string;
  constructor(private http: HttpClient, private userAuthDataService: UserAuthDataService) {
    this.token = this.userAuthDataService.getToken();
  }
   addVideoWatched(videoWatchedData){
    return this.http.post(
      `${environment.backendAPIBaseUrl}/videos/`,
      videoWatchedData,
      
      {
        headers: new HttpHeaders({
          Authorization: `JWT ${this.token}`,
          'Content-Type': 'application/json',
        }),
      }
     );
   }

   getAllVideos(){
     return this.http.get<video[]>(`${environment.backendAPIBaseUrl}/videos/`, {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    })
   }
}
