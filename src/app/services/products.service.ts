import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore:Firestore) { }

  public async addProduct(product: Product) {
    await addDoc(collection(this.firestore, 'items'), product);
  }

  public getProducts(): Observable<Product[]> {
    return collectionData(collection(this.firestore, 'items'), {
      idField: 'itemId',
    }) as Observable<Product[]>;
  }

  //docData es una fila de la bbdd
  getProduct(id:string): Observable<Product>{
    return docData(doc(this.firestore,`products/${id}`),{idField: 'productId'}) as Observable<Product>;
  }

  //Eliminar producto
  async deleteProduct(id: string){
    const docRef = doc(this.firestore,`products/${id}`)
    await deleteDoc(docRef);
  }

  //Actualizar producto
  async updateProduct(product : Product){
    await setDoc(doc(this.firestore, `products/${product.productId}`), product);
  }

}
