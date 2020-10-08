import {ServiceKey,ServiceScope,Text} from '@microsoft/sp-core-library';
import {SPHttpClient,SPHttpClientResponse} from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { IGVAListService } from '../Model/IGVAListService';


export class GVAListDataService implements IGVAListService {

    public static readonly serviceKey: ServiceKey<IGVAListService> = ServiceKey.create<IGVAListService>('GVA.IGVAListService', GVAListDataService);
    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _currentWebUrl: string;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);

            this._pageContext = serviceScope.consume(PageContext.serviceKey);

            this._currentWebUrl = this._pageContext.web.absoluteUrl;
        });
    }

   
    public getAllItems(listName: string): Promise<any>{
        //FileSystemObjectType=0 file 1 folder
        if(listName==null){return null;}
        const serviceUrl: string = Text.format("{0}/_api/Lists/getByTitle('{1}')/items?$select=FileLeafRef,FileRef,FileSystemObjectType", this._currentWebUrl, listName);
        return this._spHttpClient.get(serviceUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json()
                    .then(data => {
                        var res=data.value;

                        return res;
                    });
                    
            });
    }
    


}

