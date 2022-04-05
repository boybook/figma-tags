import { dispatch, handleEvent } from './codeMessageHandler';
import SelectionChange = TransferDeclare.CurrentSelection;
figma.showUI(__html__);

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

figma.on("selectionchange", () => {
	selectionChange();
});

figma.on("currentpagechange", () => {
	selectionChange();
});

function selectionChange() {
	const file = figma.fileKey;
	const node = figma.currentPage.selection.length > 0 ? getPageRootNode(figma.currentPage.selection[0]) : figma.currentPage;
	dispatch("selectionchange", <SelectionChange>{
		file_id: file,
		node: {
			type: node.type === 'PAGE' ? 'PAGE' : 'FRAME',
			id: node.id,
			name: node.name
		}
	});
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