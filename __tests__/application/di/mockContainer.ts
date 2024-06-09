import { Container } from "inversify";
import { HttpClient } from "../../../src/infrastructure/http/httpClient";
import { MockHttpClient } from "../../infrastructure/http/mockHttpClient";
import { HttpService } from "../../../src/infrastructure/http/httpService";
import { MockHttpService } from "../../infrastructure/http/mockHttpService";

const mockContainer = new Container();
mockContainer.bind<HttpClient>(HttpClient).to(MockHttpClient).inSingletonScope();
mockContainer.bind<HttpService>(HttpService).to(MockHttpService).inSingletonScope();

export {mockContainer};