import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { City } from 'src/app/model/City';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: City[];
  addCityForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private adminService: AdminService,
              private httpService: HttpService) { }

  ngOnInit() {
    this.getCities();
  }


  getCities() {
    this.httpService.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
      }
    );
  }
  create() {
    this.adminService.addCity(this.addCityForm.value).subscribe(
      data => {console.log(data);
      }
    );
  }
}
