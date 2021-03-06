import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, empty } from 'rxjs';
import { LoggerService } from './logger.service';
import { ResponseModel } from '../models/response.model';
import { LoaderService } from '../loader/loader.service';
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class HttpService  {

    constructor(
        private http: HttpClient,
        private log: LoggerService,
        private loaderService: LoaderService
    ) {

    }

    public get<T>(url: string): Observable<T>;
    public get<T>(url: string, requestParams: HttpParams);

    public get<T>(url: string, requestParams?: HttpParams): Observable<T> {
        this.loaderService.activateLoading();
        if (requestParams) {
            let result = this.http.get<T>(url, {params: requestParams});
            result = this.holdRequest(result, url, 'get');
            return result;
        } else {
            let result =  this.http.get<T>(url);
            result = this.holdRequest(result, url, 'get');
            return result;
        }
    }

    public getSmall<T>(url: string, requestParams?: HttpParams): Observable<T> {
        this.loaderService.acitvateSmallLoading();

        let result =  this.http.get<T>(url, {params: requestParams});
        result = this.holdSmallRequest(result, url, 'get');

        return result;
    }

    public post<T>(url: string, body: any): Observable<T> {
        this.loaderService.activateLoading();

        let result = this.http.post<T>(url, body);
        result = this.holdRequest(result, url, 'post');

        return result;
    }

    public postSmall<T>(url: string, body: any): Observable<T> {
        this.loaderService.acitvateSmallLoading();

        let result = this.http.post<T>(url, body);
        result = this.holdSmallRequest(result, url, 'post');

        return result;
    }

    public put<T>(url: string, body: any): Observable<T> {

        this.loaderService.activateLoading();

        let result = this.http.put<T>(url, body);
        result = this.holdRequest(result, url, 'put');
        return result;
    }

    public putSmall<T>(url: string, body: any): Observable<T> {

        this.loaderService.acitvateSmallLoading();

        let result = this.http.put<T>(url, body);
        result = this.holdSmallRequest(result, url, 'put');
        return result;
    }

    public delete<T>(url: string): Observable<T> {

        this.loaderService.activateLoading();

        let result = this.http.delete<T>(url);
        result = this.holdRequest(result, url, 'delete');

        return result;
    }

    public deleteSmall<T>(url: string): Observable<T> {

        this.loaderService.acitvateSmallLoading();

        let result = this.http.delete<T>(url);
        result = this.holdSmallRequest(result, url, 'delete');

        return result;
    }

    private holdRequest(request: Observable<any>, url: string, requestType: string): Observable<any> {
        const result = request.pipe<any>(
            tap( (response: any) => {
              this.tapResponse(response, url, requestType);
            }),
            catchError( (error) => {
                this.catchErrorResponse(error);
                return error;
            })
        );



        return result;
    }

    private holdSmallRequest(request: Observable<any>, url: string, requestType: string): Observable<any> {
        const result = request.pipe<any>(
            tap( (response: any) => {
              this.tapSmallResponse(response, url, requestType);
            }),
            catchError( error => {
                this.catchSmallErrorResponse(error);
                return error;
            })
        );

        return result;
    }

    private tapResponse(model: any, url: string, requestType: string): void {
        const result = new ResponseModel(requestType, url, model);
        this.log.info(result);
        this.loaderService.deactivateLoading();
    }

    private tapSmallResponse(model: any, url: string, requestType: string): void {
        const result = new ResponseModel(requestType, url, model);
        this.log.info(result);
        this.loaderService.deactivateSmallLoading();
    }

    private catchErrorResponse(error: any) {
        this.log.error(error);
        this.loaderService.deactivateLoading();
    }

    private catchSmallErrorResponse(error: any) {
        this.log.error(error);
        this.loaderService.deactivateLoading();
    }

}
