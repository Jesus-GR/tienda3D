import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  products?: Observable<Product[]>;
  arrayDatos:number[] = [];
  arrayNombres:string[] = [];
  basicData: any;
  basicOptions:any
  constructor(private productService: ProductsService) {

    this.productService.getProducts().subscribe(data => {
      data.map(data => {
        this.arrayDatos.push(data.like),
        console.log(this.arrayDatos);

      })
    })

    this.productService.getProducts().subscribe(data => {
      data.map(data => {
        this.arrayNombres.push(data.title),
        console.log(this.arrayNombres);
      })
    })


   }

  ngOnInit(): void {
    this.basicData = {
      labels: this.arrayNombres,
      datasets: [
          {
              label: 'Likes',
              backgroundColor: '#DAD7D6',
              data: this.arrayDatos
          }
      ]
  };
  }

  applyLightTheme() {
    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#DAD7D6'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
  }
}
