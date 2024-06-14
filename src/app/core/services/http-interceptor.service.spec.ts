import { TestBed } from '@angular/core/testing';
import { HttpInterceptorService } from './http-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(HttpInterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should correctly catch 400 error', (done) => {
    const status = 400;
    const statusText = 'ERROR';
    const testUrl = '/test';
    
    httpClient.post(testUrl, {data: 'test'}).subscribe({
      next: () => fail('Can be handle an error'),
      error: error => {
        expect(error).toEqual({status, message: 'Http failure response for /test: 400 ERROR'});
        done();
      }
    });

    const req = httpMock.expectOne(testUrl);

    req.flush({}, {status, statusText});
  });
  
  it('should correctly catch 404 error', (done) => {
    const status = 404;
    const statusText = 'ERROR';
    const testUrl = '/test';
    
    httpClient.post(testUrl, {data: 'test'}).subscribe({
      error: error => {
        expect(error).toEqual({status, message: 'Http failure response for /test: 404 ERROR'});
        done();
      }
    });

    const req = httpMock.expectOne(testUrl);

    req.flush({}, {status, statusText});
  });
  
  it('should correctly catch default error', (done) => {
    const status = 500;
    const statusText = 'ERROR';
    const testUrl = '/test';
    
    httpClient.post(testUrl, {data: 'test'}).subscribe({
      error: error => {
        expect(error).toEqual({status, message: 'Http failure response for /test: 500 ERROR'});
        done();
      }
    });

    const req = httpMock.expectOne(testUrl);

    req.flush({}, {status, statusText});
  });
  
});
