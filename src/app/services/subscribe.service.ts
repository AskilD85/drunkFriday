import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './../model/User';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private url = environment.BackendDBUrl;
  constructor(private http: HttpClient) { }

  getSubscribes(userId: number | string) {
    console.log(userId);
    const body = {};
    return this.http.post(this.url + `subscribes/${userId}`, body);
  }
  destroy(id: number) {
    return this.http.delete(this.url + `subscribes/${id}`);
  }

  saveForm(body) {
    return this.http.post(this.url + 'subscribes', body);
  }

  clearForm(form: FormArray | FormGroup, field: string) {
    if ((form.get(field) as FormArray).length > 0) {
      while ((form.get(field) as FormArray).length !== 0) {
        (form.get(field) as FormArray).removeAt(0);
      }
      form.reset();
    }
  }

}
