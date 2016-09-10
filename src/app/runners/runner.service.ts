import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import { ExceptionService, SpinnerService } from '../blocks/blocks';
import { CONFIG, MessageService } from '../shared/shared';

let runnersUrl = '../api/runners.json';

export interface Runner {
  id: number;
  name: string;
  side: string;
}

@Injectable()
export class RunnerService {
  runners : Runner;
  constructor(private _http: Http,
    private _exceptionService: ExceptionService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService) {
    this._messageService.state.subscribe(state => this.getRunners());
  }

  addRunner(runner: Runner) {
    let body = JSON.stringify(runner);
    this._spinnerService.show();
    return this._http
      .post(`${runnersUrl}`, body)
      .map(res => res.json().data)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deleteRunner(runner: Runner) {
    this._spinnerService.show();
    return this._http
      .delete(`${runnersUrl}/${runner.id}`)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getRunners() {
    this._spinnerService.show();
    return this._http.get(runnersUrl)
      .map((response: Response) => <Runner[]>response.json().data)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getRunner(id: number) {
    return this.getRunners();
  }

  onDbReset = this._messageService.state;

  updateRunner(runner: Runner) {
    let body = JSON.stringify(runner);
    this._spinnerService.show();

    return this._http
      .put(`${runnersUrl}/${runner.id}`, body)
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
}
