import DataProvider from "./DataProvider";
import { DataProviderBlobSave } from "./DataProviderBlobSave";
import * as BlobLocalProvider from "./blob/BlobLocalProvider";
import * as BlobDocumentProvider from "./blob/BlobDocumentProvider";
import {NotionProvider} from "./NotionProvider";
import {CloudProvider} from "./CloudProvider";

export default (config: Transfer.ProviderConfig): DataProvider => {
    switch (config?.type) {
        default:
        case "document": {
            const provider = new DataProviderBlobSave(BlobDocumentProvider);
            provider.type = 'document';
            return provider;
        }
        case "local": {
            const provider = new DataProviderBlobSave(BlobLocalProvider);
            provider.type = 'local';
            return provider;
        }
        case "notion": {
            return new NotionProvider(config.token, config.database);
        }
        case "cloud": {
            return new CloudProvider(config.uuid)
        }
    }
}