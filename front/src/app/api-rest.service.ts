import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

/**
 * Service used to send requests to the backend
 */
export class ApiRestService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.base_url + ':8080/rest';
    }

    /**
       * Sends a GET request to the backend.
       * Applies f to its result
       * if f was specified and returns the result of this.
       * Returns its json cast as T otherwise.
       * WARNING: Do not use with T = string. Please use getString instead.
       *
       * @param endUrl End of the API url to retrieve the data wanted
       * @param f Function that will be applied to the result of the request before
       * returning it, instead of just casting its json to T and returning it
       * @returns If f was specified, f(result) where result is the response of the backend
       * Json of result cast as T otherwise
       */
    public get<T>(endUrl: string, f?: Function): Observable<T> {
        console.log('GET: ' + this.baseUrl + endUrl);
        return this.http.get(this.baseUrl + endUrl).pipe(map(
            (result) => {
                if (f) {
                    return f(result);
                }
                return result as T;
            }));
    }

    /**
     * Retrieves text data from backend
     *
     * @param endUrl End of the API url to retrieve the data wanted
     * @returns String returned by the backend
     */
    public getString(endUrl: string): Observable<string> {
        return this.get<string>(endUrl, (result: any) => {
            return result.text('iso-8859');
        });
    }

    public getBlob(endUrl: string): Observable<Blob> {
        return this.http.get(this.baseUrl + endUrl, { responseType: 'blob' as 'json' }).pipe(map(
            (result) => {
                return result as Blob;
            }));
    }

    /**
     * Sends a PUT request containing data to the backend, applies f to its result
     * if f was specified and
     * returns the result of this, returns its json cast as T otherwise
     *
     * @param endUrl End of the API url to retrieve the data wanted
     * @param data Data to send in the request to the backend
     * @param f Function that will be applied to the result of the request before
     * returning it, instead of just casting its json to T and returning it
     * @returns If f was specified, f(result) where result is the response of the backend
     * Json of result cast as T otherwise
     */
    public put<T>(endUrl: string, data: any, f?: Function): Observable<T> {
        const headers = this.initHeaders();
        return this.http.put(this.baseUrl + endUrl, JSON.stringify(data),
            { headers: headers }).pipe(map(
                (result) => {
                    if (f) {
                        return f(result);
                    }
                    return result as T;
                }
            ));
    }

    /**
     * Sends a POST request containing data to the backend, applies f to its result
     * if f was specified and
     * returns the result of this, returns its json cast as T otherwise
     *
     * @param endUrl End of the API url to retrieve the data wanted
     * @param data Data to send in the request to the backend
     * @param f Function that will be applied to the result of the request before
     * returning it, instead of just casting its json to T and returning it
     * @returns If f was specified, f(result) where result is the response of the backend
     * Json of result cast as T otherwise
     */
    public post<T>(endUrl: string, data: any, f?: Function): Observable<T> {
        const headers = this.initHeaders();
        return this.http.post(this.baseUrl + endUrl, JSON.stringify(data),
            { headers: headers }).pipe(map(
                (result) => {
                    if (f) {
                        return f(result);
                    }
                    return result as T;
                }
            ));
    }

    public postArchive(endUrl: string, data: any): Observable<Blob> {
        const headers = this.initHeaders();
        return this.http.post(this.baseUrl + endUrl,
            JSON.stringify(data),
            { responseType: 'blob' as 'json',
                headers: headers }).pipe(map(
            (result) => {
                return result as Blob;
            }));
    }

    public postString<T>(endUrl: string, data: any, f?: Function): Observable<T> {
        const headers = this.initHeaders();
        return this.http.post(this.baseUrl + endUrl, data,
            { headers: headers }).pipe(map(
                (result) => {
                    if (f) {
                        return f(result);
                    }
                    return result as T;
                }
            ));
    }

    public postFile<T>(endUrl: string, data: any, baseFormData?: FormData): Observable<T> {
        const headers = this.initHeaders();
        let formData;
        if (baseFormData) {
            formData = baseFormData;
        } else {
            formData = new FormData();
        }
        formData.append('file', data);
        return this.http.post(this.baseUrl + endUrl, formData,
            { headers: headers }).pipe(map(
                (result) => {
                    return result as T;
                }
            ));
    }

    /**
     * Sends a DELETE request to the backend, applies f to its result if f was specified and
     * returns the result of this, returns its json cast as T otherwise
     *
     * @param endUrl End of the API url to retrieve the data wanted
     * @param f Function that will be applied to the result of the request before
     * returning it, instead of just casting its json to T and returning it
     * @returns If f was specified, f(result) where result is the response of the backend
     * Json of result cast as T otherwise
     */
    public delete<T>(endUrl: string, f?: Function): Observable<T> {
        const headers = this.initHeaders();
        return this.http.delete(this.baseUrl + endUrl).pipe(map(
            result => {
                if (f) {
                    return f(result);
                }
                return result as T;
            }));
    }

    /**
     * Initalises headers that will be used in a PUT/POST request
     * that sends data as json
     * @returns Headers initialised to be used in a PUT/POST request
     */
    private initHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
