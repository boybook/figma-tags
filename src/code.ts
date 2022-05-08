import { dispatch, handleEvent } from './codeMessageHandler';
import SelectionChange = Transfer.CurrentSelection;
import { interval, markNode, unmarkNode, refreshFileAllMarks } from "./codeCanvasTag";
import WindowResize = Transfer.WindowResize;
import PageNode from "./ui/pagenode/PageNode.vue";
import NodeRename = Transfer.NodeRename;

figma.showUI(__html__, { visible: false });

let uiShowed = false;

// figma.clientStorage.setAsync("tags", undefined).then();
// figma.clientStorage.setAsync("nodes", undefined).then();
// figma.clientStorage.setAsync("language", "ch").then();
// figma.clientStorage.setAsync("provider", undefined).then();h
// figma.clientStorage.setAsync("access-token", undefined).then();
// figma.root.setPluginData("file-id", "");
// figma.root.setPluginData("tags", "");
// figma.root.setPluginData("nodes", "");

let file = figma.fileKey;
if (!file) {
	file = figma.root.getPluginData('file-id');
}

let mNodeType: string;

const storageInit = async () : Promise<[string, string, string, string]> => {
	return await Promise.all(
		[
			figma.clientStorage.getAsync("language"),
			figma.clientStorage.getAsync("access-token"),
			figma.clientStorage.getAsync("provider"),
			figma.clientStorage.getAsync("node-type"),
		]
	);
}

switch (figma.command) {
	case 'lookup': {
		(async() => {
			const [language, accessToken, provider, nodeType] = await storageInit();
			mNodeType = provider === 'document' ? 'frame' : (nodeType ? nodeType : 'frame');
			checkSelectCanvasTag();
			dispatch("init", <Transfer.InitData> {
				language: language ? language : "en",
				accessToken: accessToken,
				userId: figma.currentUser.id,
				userName: figma.currentUser.name,
				provider: provider,
				nodeType: mNodeType,
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
			const [language, accessToken, provider, nodeType] = await storageInit();
			mNodeType = provider === 'document' ? 'frame' : (nodeType ? nodeType : 'frame');
			checkSelectCanvasTag();
			dispatch("init", <Transfer.InitData> {
				language: language ? language : "en",
				accessToken: accessToken,
				userId: figma.currentUser.id,
				userName: figma.currentUser.name,
				provider: provider,
				nodeType: mNodeType,
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

handleEvent('document-plugin-data-get', (key: string) => {;
	const result: Transfer.DocumentPluginData = {
		key: key,
		value: figma.root.getPluginData(key)
	}
	dispatch('document-plugin-data-get', result);
});

handleEvent('document-plugin-data-set', (data: Transfer.DocumentPluginData) => {
	figma.root.setPluginData(data.key, data.value);
	dispatch('document-plugin-data-set', {
		key: data.key,
		suc: true
	});
});

handleEvent('document-shared-plugin-data-set', (data: Transfer.DocumentPluginData) => {
	figma.root.setSharedPluginData('figma-nodes', data.key, data.value);
});

let lastNotify: NotificationHandler;

handleEvent('notify', (msg) => {
	lastNotify?.cancel();
	if (typeof msg === 'string') {
		lastNotify = figma.notify(msg);
	} else {
		lastNotify = figma.notify(JSON.stringify(msg));
	}
});

handleEvent('notify-err', (msg) => {
	lastNotify?.cancel();
	if (typeof msg === 'string') {
		lastNotify = figma.notify(msg, { error: true });
	} else {
		lastNotify = figma.notify(JSON.stringify(msg), { error: true });
	}
});

handleEvent('canvas-mark-node', (data: Transfer.CanvasSignNode) => {
	markNode(new Map<string, Storage.TagGroup>(JSON.parse(data.fullTags)), JSON.parse(data.node));
});

handleEvent('canvas-unmark-node', (nodeId: string) => {
	unmarkNode(nodeId);
});

handleEvent('canvas-refresh-all-marks', (fullTagsJson: string) => {
	console.log("canvas-refresh-all-marks.json", fullTagsJson);
	const fullTags: Storage.FullTags = new Map(JSON.parse(fullTagsJson));
	console.log("canvas-refresh-all-marks.map", fullTags);
	refreshFileAllMarks(fullTags);
});

handleEvent('request-selection', () => {
	console.log("request-selection", figma.currentPage.selection);
	dispatch("selectionchange", packageCurrentSelection());
})

handleEvent('select-node', (nodeId: string) => {
	const node = figma.getNodeById(nodeId);
	if (node) {
		figma.currentPage = getPageNode(node);
		if (node.type !== 'PAGE') {
			figma.currentPage.selection = [getPageRootNode(node)];
			figma.viewport.scrollAndZoomIntoView([node]);
		}
	} else {
		figma.notify("Missing node " + nodeId + "?");
	}
});

handleEvent('node-rename', (data: NodeRename) => {
	const node = figma.getNodeById(data.nodeId);
	if (node && data.name) {
		node.name = data.name;
	}
});

handleEvent('toggle-node-type', (type: 'document' | 'frame') => {
	figma.clientStorage.setAsync("node-type", type).then();
	mNodeType = type;
	if (type === 'document') {
		figma.viewport.scrollAndZoomIntoView(figma.root.children[0].children);
		figma.currentPage.selection = [];
	}
	dispatch("selectionchange", packageCurrentSelection());
});

figma.on("selectionchange", () => {
	if (mNodeType === 'document') {
		if (figma.currentPage.selection.length > 0) {
			checkSelectCanvasTag();
			dispatch("force-change-node-type", 'frame');
		}
		return;
	}
	// 点击标签的Group，自动选择到对应的内容
	checkSelectCanvasTag();
	dispatch("selectionchange", packageCurrentSelection());
});

figma.on("currentpagechange", () => {
	if (mNodeType === 'document') return;
	dispatch("selectionchange", packageCurrentSelection());
});

figma.on("close", () => {
	clearInterval(interval);
});

function checkSelectCanvasTag() {
	if (figma.currentPage.selection.length > 0) {
		const select = figma.currentPage.selection[0];
		if (select.type === 'GROUP' && select.name.startsWith("Tag#")) {
			const nodeId = select.name.slice(4);
			const node = figma.getNodeById(nodeId);
			if (node) {
				figma.currentPage = getPageNode(node);
				figma.currentPage.selection = [<SceneNode> node];
			}
		}
	}
}

function packageCurrentSelection() : SelectionChange {
	console.log("packageCurrentSelection.mNodeType", mNodeType);
	if (mNodeType === 'frame') {
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
	} else if (mNodeType === 'document') {
		const document = figma.root;
		return {
			type: 'DOCUMENT',
			id: undefined,
			name: document.name,
			width: -1
		}
	}
}

function isRootFrame(node: BaseNode): node is FrameNode | ComponentNode | InstanceNode {
	return node.parent.type == "PAGE";
}

function getPageRootNode(node: BaseNode): SceneNode {
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