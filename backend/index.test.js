import app from './index.js'
import request from 'supertest';

describe('Express App Tests', () => {

  test('GET /transactions 401 with no token', async () => {
    const getResponse = await request(app).get('/transactions/69986e27-981e-45c3-bfc5-300f0af39710');
    expect(getResponse).toBeDefined();
    expect(getResponse.status).toBe(401)

  })
  test('GET /transactions 200 with matching token', async () => {
    const getResponse = await request(app).get('/transactions/69986e27-981e-45c3-bfc5-300f0af39710').set('token', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4YTYzYmM0NzY3Zjg1NTBhNTMyZGM2MzBjZjdlYjQ5ZmYzOTdlN2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMjUzNDk4OTE5MTItaXRsdDE5dWFzZmFwZjMwZ2RnZDVrMmFodHFxMTc0ajcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMjUzNDk4OTE5MTItaXRsdDE5dWFzZmFwZjMwZ2RnZDVrMmFodHFxMTc0ajcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUwODE3MDQ5MTY1ODE5MzQzNDAiLCJlbWFpbCI6ImU0MDc5ODFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcwNTg3Mzk3NSwibmFtZSI6ImVkaXQgbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLSFpOcS1WTWxqYVF3aTR2eTVuMzQ1UjYtZF9pSFhUc05EUEhFX1JrZU09czk2LWMiLCJnaXZlbl9uYW1lIjoiZWRpdCIsImZhbWlseV9uYW1lIjoibCIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNzA1ODc0Mjc1LCJleHAiOjE3MDU4Nzc4NzUsImp0aSI6IjcyYTNmOTQ0N2FhMGZlMmNiODg2ZTI2ZjBlMGMxYTE4MTExZTdkNmQifQ.jBd9inBlBK43UazQeR2x6jmmxagNCDRmazXmZZWJsneiJW2gglFYTA1tWQgI3j79XIQzTafp0nz2ekZLuij2KEhsNgKJL3nn7SIxDkpC2dm-8k8JjrxOvcHMDc4pLLi6WRFPsP9P7BYGDXeIGtM8RhXOaiT2LyA664jcuEIfNOEb7E3AytmxNA7HnEuRCrnBN3LocFsl2ApvKzxFgiF8W7ADNS6JRYeaL0JB-RQM3ob8RkvcPk8ny5crgQYVkb1BTvCLLc9fesnmWj2dwSLeECF3DS9pTwMk0Fav9C7cX4tGY42Ot7ZSuCCntSR3AcCnxewMUhdy2SHMJ9uAqZw6wg');
    expect(getResponse).toBeDefined();
    expect(getResponse.status).toBe(200)

  })


});