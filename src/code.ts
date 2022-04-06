import { dispatch, handleEvent } from './codeMessageHandler';
import SelectionChange = TransferDeclare.CurrentSelection;
figma.showUI(__html__);
figma.ui.resize(288, 600);

switch (figma.command) {
	case 'node':
	default:
	{
		let file = figma.fileKey;
		if (!file) {
			file = figma.root.getPluginData('file-id');
		}
		dispatch("init", <TransferDeclare.InitData> {
			file_id: file,
			selection: packageCurrentSelection()
		});
		break;
	}
}

// Handle events from UI
handleEvent('client-storage-get', (data: TransferDeclare.ClientStorageGetRequest) => {
	figma.clientStorage.getAsync(data.key).then(r => {
		const result: TransferDeclare.ClientStorageGetResult = {
			key: data.key,
			result: r
		}
		dispatch('client-storage-get', result);
	});
});
handleEvent('client-storage-set', (data: TransferDeclare.ClientStorageSetRequest) => {
	figma.clientStorage.setAsync(data.key, data.data).then(() => {
		const result: TransferDeclare.ClientStorageSetResult = {
			key: data.key,
			suc: true
		}
		dispatch('client-storage-set', result);
	});
});
handleEvent('document-plugin-data-set', (data: TransferDeclare.DocumentPluginData) => {
	figma.root.setPluginData(data.key, data.value);
})

figma.on("selectionchange", () => {
	dispatch("selectionchange", packageCurrentSelection());
});

figma.on("currentpagechange", () => {
	dispatch("selectionchange", packageCurrentSelection());
});

function packageCurrentSelection() : SelectionChange {
	const node = figma.currentPage.selection.length > 0 ? getPageRootNode(figma.currentPage.selection[0]) : figma.currentPage;
	return {
		type: node.type === 'PAGE' ? 'PAGE' : 'FRAME',
		id: node.id,
		name: node.name
	};
}

function isRootFrame(node: BaseNode): node is FrameNode | ComponentNode | InstanceNode {
	return node.parent.type == "PAGE";
}

function getPageRootNode(node: BaseNode): SceneNode {
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