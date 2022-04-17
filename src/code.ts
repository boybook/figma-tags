import { dispatch, handleEvent } from './codeMessageHandler';
import SelectionChange = Transfer.CurrentSelection;
import { interval, markNode, unmarkNode } from "./codeCanvasTag";
import WindowResize = Transfer.WindowResize;

figma.showUI(__html__, { visible: false });

let uiShowed = false;

//figma.clientStorage.setAsync("tags", undefined).then();
//figma.clientStorage.setAsync("nodes", undefined).then();
//figma.clientStorage.setAsync("language", "ch").then();
//figma.clientStorage.setAsync("provider", undefined).then();
//figma.root.setPluginData("file-id", "");

let file = figma.fileKey;
if (!file) {
	file = figma.root.getPluginData('file-id');
}

const storageInit = async () : Promise<[string, string, string]> => {
	return await Promise.all(
		[
			figma.clientStorage.getAsync("language"),
			figma.clientStorage.getAsync("access-token"),
			figma.clientStorage.getAsync("provider"),
		]
	);
}

switch (figma.command) {
	case 'lookup': {
		(async() => {
			const [language, accessToken, provider] = await storageInit();
			dispatch("init", <Transfer.InitData> {
				language: language ? language : "en",
				accessToken: accessToken,
				provider: provider,
				page: 'PageSelect',
				fileId: file,
				selection: packageCurrentSelection()
			});
		})();
		break;
	}
	case 'node':
	default: {
		(async() => {
			const [language, accessToken, provider] = await storageInit();
			dispatch("init", <Transfer.InitData> {
				language: language ? language : "en",
				accessToken: accessToken,
				provider: provider,
				page: 'PageNode',
				fileId: file,
				selection: packageCurrentSelection()
			});
		})();
		break;
	}
}

// Handle events from UI

handleEvent('resize', (data: WindowResize) => {
	if (!uiShowed) {
		figma.ui.show();
		uiShowed = true;
	}
	figma.ui.resize(data.width, data.height);
});

handleEvent('client-storage-get', (data: Transfer.ClientStorageGetRequest) => {
	figma.clientStorage.getAsync(data.key).then(r => {
		const result: Transfer.ClientStorageGetResult = {
			key: data.key,
			result: r
		}
		dispatch('client-storage-get', result);
	});
});

handleEvent('client-storage-set', (data: Transfer.ClientStorageSetRequest) => {
	figma.clientStorage.setAsync(data.key, data.data).then(() => {
		const result: Transfer.ClientStorageSetResult = {
			key: data.key,
			suc: true
		}
		dispatch('client-storage-set', result);
	});
});

handleEvent('document-plugin-data-set', (data: Transfer.DocumentPluginData) => {
	figma.root.setPluginData(data.key, data.value);
});

handleEvent('notify', (msg) => {
	if (typeof msg === 'string') {
		figma.notify(msg);
	} else {
		figma.notify(JSON.stringify(msg));
	}
});

handleEvent('notify-err', (msg) => {
	if (typeof msg === 'string') {
		figma.notify(msg, { error: true });
	} else {
		figma.notify(JSON.stringify(msg), { error: true });
	}
});

handleEvent('canvas-mark-node', (data: Transfer.CanvasSignNode) => {
	markNode(new Map<string, Storage.TagGroup>(JSON.parse(data.fullTags)), JSON.parse(data.node));
});

handleEvent('canvas-unmark-node', (nodeId: string) => {
	unmarkNode(nodeId);
});

handleEvent('request-selection', () => {
	console.log("request-selection", figma.currentPage.selection);
	dispatch("selectionchange", packageCurrentSelection());
})

figma.on("selectionchange", () => {
	dispatch("selectionchange", packageCurrentSelection());
});

figma.on("currentpagechange", () => {
	console.log("currentpagechange", figma.currentPage.selection);
	dispatch("selectionchange", packageCurrentSelection());
});

figma.on("close", () => {
	clearInterval(interval);
});

function packageCurrentSelection() : SelectionChange {
	try {
		const node = figma.currentPage.selection.length > 0 ? getPageRootNode(figma.currentPage.selection[0]) : figma.currentPage;
		const width = isEmbedNodeLike(node) ? node.width : undefined;
		console.log("width", width)
		return {
			type: node.type === 'PAGE' ? 'PAGE' : 'FRAME',
			id: node.id,
			name: node.name,
			width: width
		};
	} catch (e) {
		console.log('packageCurrentSelection', e);
		return {
			type: 'PAGE',
			id: figma.currentPage.id,
			name: figma.currentPage.name,
			width: -1
		}
	}
}

function isRootFrame(node: BaseNode): node is FrameNode | ComponentNode | InstanceNode {
	return node.parent.type == "PAGE";
}

function getPageRootNode(node: BaseNode): SceneNode {
	console.log("===========", node.parent);
	if (node.parent === null) {
		return <SceneNode> node;
	}

	while (node.parent.type !== "PAGE") {
		node = node.parent;
	}
	return <SceneNode> node;
}

function getPageNode(node: BaseNode): PageNode {
	while (node.type !== "PAGE") {
		node = node.parent;
	}
	return <PageNode> node;
}

function isEmbedNodeLike(node: BaseNode): node is EmbedNode {
	return true;
}