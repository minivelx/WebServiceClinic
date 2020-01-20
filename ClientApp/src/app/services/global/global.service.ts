import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public lenguajeDataTable: any;
  public BASE_URL: string;
  public BASE_SERVER: string;
  public headerToken: HttpHeaders;
  public roles: string[];
  public currentUser: string;
  public headers: HttpHeaders;

  constructor(public http: HttpClient, private navigationService: NavigationService) {
    this.BASE_URL = "http://localhost:2956/";
    this.BASE_SERVER = "http://localhost:2956/";
     
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST: GET: OPTIONS: PUT', 'Authorization': 'Bearer ' });
    var localStorageToken = localStorage.getItem("token");
    if (localStorageToken === null || localStorageToken === undefined) {
      this.roles = [];
      this.currentUser = "";
      this.navigationService.loginPage();
    } else {
      let tokenLS = JSON.parse(localStorageToken);
      let fechaToken = new Date(tokenLS.expiration);
      let fechaActual = new Date();
      if (fechaToken < fechaActual) {
        this.roles = [];
        this.currentUser = "";
        localStorage.clear();
        this.navigationService.loginPage();
      } else {
        this.setTokenHeader(tokenLS.token);
        this.roles = tokenLS.roles;
        this.currentUser = tokenLS.nombre;
        this.navigationService.medicalAppointmentPage();
      }
    }
    this.lenguajeDataTable = {
      "search": "Buscar",
      "oPaginate": {
        "sPrevious": "Anterior",
        "sNext": "Siguiente"
      },
      "sProcessing": "Cargando...",
      "lengthMenu": "_MENU_ registros por página",
      "zeroRecords": " ",
      "info": "",
      "infoEmpty": "",
      "infoFiltered": "(filtrados de _MAX_ registros en total)"
    };
  }

  //Funcion que verifica si el usuario tienes los roles necesarios
  public findRoles(roles: string[]): boolean {
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < this.roles.length; j++) {
        if (roles[i] == this.roles[j]) {
          return true;
        }
      }
    }
    return false;
  }

  public setTokenHeader(token: string) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + token);
  }

  public get(url: string, id?: string) {
    if (id === undefined) {
      id = "";
    }
    let api = this.BASE_URL + url + id;
    return new Promise((resolve, reject) => {
      this.http.get(api, { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public getTwoId(url: string, id?: string, id2?: string) {
    if (id === undefined) {
      id = "";
    }
    if (id2 === undefined) {
      id2 = "";
    }
    let api = this.BASE_URL + url + id + "/" + id2;
    return new Promise((resolve, reject) => {
      this.http.get(api, { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public post(url: string, object: any) {
    let api = this.BASE_URL + url;
    return new Promise((resolve, reject) => {
      this.http.post(api, JSON.stringify(object), { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public postList(url: string, object: any[]) {
    let api = this.BASE_URL + url;
    return new Promise((resolve, reject) => {
      this.http.post(api, JSON.stringify(object), { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public postWithId(url: string, object: any, id?: string) {
    if (id === undefined) {
      id = "";
    }
    let api = this.BASE_URL + url + id;
    return new Promise((resolve, reject) => {
      this.http.post(api, JSON.stringify(object), { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public put(url: string, object: any, id?: string) {
    if (id === undefined) {
      id = "";
    }
    let api = this.BASE_URL + url + id;
    return new Promise((resolve, reject) => {
      this.http.put(api, JSON.stringify(object), { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  public putTwoId(url: string, object: any, id?: string, id2?: string) {
    if (id === null) {
      id = "";
    }
    let api = this.BASE_URL + url + id + "/" + id2;
    return new Promise((resolve, reject) => {
      this.http.put(api, JSON.stringify(object), { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  public putThreeId(url: string, object: any, id?: string, id2?: string, id3?: string) {
    if (id === null) {
      id = "";
    }
    let api = this.BASE_URL + url + id + "/" + id2 + "/" + id3;
    return new Promise((resolve, reject) => {
      this.http.put(api, JSON.stringify(object), { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  public delete(url: string, id: string) {
    let api = this.BASE_URL + url + id;
    return new Promise((resolve, reject) => {
      this.http.delete(api, { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public deleteTwoId(url: string, id: string, id2: string) {
    let api = this.BASE_URL + url + id + "/" + id2;
    return new Promise((resolve, reject) => {
      this.http.delete(api, { headers: this.headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public postDocuments(url: string, object: FormData) {
    let api = this.BASE_URL + url;
    let headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return new Promise((resolve, reject) => {
      this.http.post(api, object, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}