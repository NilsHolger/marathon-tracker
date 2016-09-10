import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import { ExceptionService, SpinnerService } from '../blocks/blocks';
import { CONFIG, MessageService } from '../shared/shared';

let marathonsUrl = '../api/marathons.json';

export interface Marathon {
  id: number;
  name: string;
  type: string;
}

@Injectable()
export class MarathonService {
  constructor(private _http: Http,
    private _exceptionService: ExceptionService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService) {
    this._messageService.state.subscribe(state => this.getMarathons());
  }

  addMarathon(marathon: Marathon) {
    let body = JSON.stringify(marathon);
    this._spinnerService.show();
    return this._http
      .post(`${marathonsUrl}`, body)
      .map(res => res.json().data)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deleteMarathon(marathon: Marathon) {
    this._spinnerService.show();
    return this._http
      .delete(`${marathonsUrl}/${marathon.id}`)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getMarathons() {
    this._spinnerService.show();
    return this._http.get(marathonsUrl)
      .map((response: Response) => <Marathon[]>response.json().data)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getMarathon(id: number) {
    this._spinnerService.show();
    return this._http.get(`${marathonsUrl}/${id}`)
      .map((response: Response) => response.json().data)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  onDbReset = this._messageService.state;

  updateMarathon(marathon: Marathon) {
    let body = JSON.stringify(marathon);
    this._spinnerService.show();

    return this._http
      .put(`${marathonsUrl}/${marathon.id}`, body)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
}