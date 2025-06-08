import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {}

  subirArchivo(data: any): Observable<number> {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('accion', data.accion);
    formData.append('fecha', data.fecha);
    formData.append('file', data.file);

    return this.http.post('/api/analizar', formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      filter(event => event.type === HttpEventType.UploadProgress),
      map(event => {
        // const percentDone = Math.round(100 * (event.loaded / (event.total || 1)));
        const percentDone = Math.round(100 * 1);
        return percentDone;
      })
    );
  }
  
}
