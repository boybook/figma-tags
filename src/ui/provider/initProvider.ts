import DataProvider from "./DataProvider";
import {DataProviderBlobSave} from "./DataProviderBlobSave";
import BlobLocalProvider from "./blob/BlobLocalProvider";
import {NotionProvider} from "./NotionProvider";

export default (config: Transfer.ProviderConfig): DataProvider => {
    switch (config?.type) {
        default:
        case "local":
            return new DataProviderBlobSave(BlobLocalProvider);
        case "notion":
            return new NotionProvider(config.token, config.database);
    }
}