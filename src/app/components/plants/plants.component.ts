import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { PlantService } from 'src/app/services/plant.service';
import Fuse from 'fuse.js';

export interface Plant {
  name: string;
  image: string;
  price: number;
  link: string;
}

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css'],
})
export class PlantsComponent implements OnInit {
  difficulty = 'Easy';
  formGroup!: FormGroup;
  plants: Plant[] = [];

  constructor(
    private cart: CartService,
    private plant: PlantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reloadData();
    this.formGroup = this.fb.group({
      search: '',
    });
  }

  reloadData() {
    this.plant.getAll().subscribe(({ data }: any) => {
      this.plants = data;
    });
  }

  addToCart(product: Plant) {
    this.cart.addProduct(product);
  }

  search() {
    const params = this.formGroup.value;
    this.plant
      .searchPlant('%' + params.search + '%')
      .subscribe(({ data }: any) => {
        const fuse: any = new Fuse(data, { keys: ['name'] });
        this.plants = params.search
          ? fuse.search(params.search).map((result: any) => result.item)
          : data;
      });
  }
}
