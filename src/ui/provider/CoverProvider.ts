import { dispatch, handleEvent } from "../uiMessageHandler";

const exportCover = (nodeId: string) : Promise<string> => (
    new Promise<string>((resolve, reject) => {
        // TODO 导出并保存封面至云端
        resolve("https://static.figma.com/uploads/28811d94ebbbeed985725e23e0a560215cc43f7b");
    })
);

export { exportCover }