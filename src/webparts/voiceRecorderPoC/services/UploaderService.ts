import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { ISPHttpClientOptions, SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";

export default class UploadService {
    public static readonly serviceKey = ServiceKey.create<UploadService>("voice-recorder:UploadService", UploadService);

    private spHttpClient: SPHttpClient;

    private pageContext: PageContext;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this.spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
            this.pageContext = serviceScope.consume(PageContext.serviceKey);
        });
    }

    public async uploadFile(file: File, name: string): Promise<boolean> {
        try {
            const options: ISPHttpClientOptions = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: file
            };

            await this.spHttpClient.post(this.libraryUrlBuiler(name), SPHttpClient.configurations.v1, options);

            return true;
        } catch (e) {
            console.error(e);

            return false;
        }
    }

    private libraryUrlBuiler(fileName: string): string {
        return `${this.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('Documents')/RootFolder/Files/Add(url='${fileName}', overwrite=true)`;
    }
}
