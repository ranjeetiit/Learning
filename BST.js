class Node{
	constructor(data){
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class BinarySearch{
	constructor(){
		this.root = null;
	}

	insert(data){
		let newNode = new Node(data);
		if(this.root == null){
			this.root = newNode
		}else{
			this.insertNode(this.root, newNode);
		}
	}

	insertNode(node, newNode){
		if(newNode.data < node.data){
			if(node.left == null){
				node.left = newNode;
			}else{
				this.insertNode(node.left , newNode);
			}
		}else{
			if(node.right == null){
				node.right = newNode;
			}else{
				this.insertNode(node.right , newNode);
			}
		}
	}

	remove(data){
		this.root = this.removeNode(this.root , data)
	}

	removeNode(node, key){
		if(node== null){
			return null;
		}else if(key < node.data){
			node.left = this.removeNode(node.left , key);
			return node;
		}else if(key > node.data){
			node.right = this.removeNode(node.right, key);
			return node;
		}else{
			if(node.left == null && node.right == null){
				node = null;
				return node;
			}

			if(node.left = null){
				node= node.right;
				return node;
			}

			if(node.right = null){
				node = node.left;
				return node;
			}

			let aux = this.findMinNode(node.right);
			node.left = aux.data;
			node.right = this.removeNode(node.right, aux.data);
			return node;
		}
	}

	findMinNode(node){
		if(node.left ==null){
			return node;
		}
		return this.findMinNode(node.left);
	}

	getRootNode(){
		return this.root;
	}

	findMaxNode(node){
		if(node.right == null){
			return node;
		}
		return this.findMaxNode(node.right);
	}

	isBalanced(){
		return (this.findMaxHeight() - this.findMinHeight()) <= 1 ;
	}

	findMinHeight(node = this.root){
		if(node == null){
			return -1;
		}

		let left = this.findMinHeight(node.left);
		let right = this.findMinHeight(node.right);
		if(left < right){
			return left + 1;
		}else{
			return right + 1;
		}
	}

	findMaxHeight(node = this.root){
		if(node == null){
			return -1;
		}

		let left = this.findMaxHeight(node.left);
		let right = this.findMaxHeight(node.right);

		if(left > right){
			return left + 1;
		}else{
			return right +1;
		}
	}

	inOrder(){
		if(this.root = null){
			return null;
		}
		let result = new Array();

		function traverseInorder(node){
			node.left && traverseInorder(node.left);
			result.push(node.data);
			node.right && traverseInorder(node.right);
		}
		traverseInorder(this.root);
		return result;
	}


	preOrder(){
		if(this.root == null){
			return null;
		}
		let result = new Array();

		function traversePreOrder(node){
			result.push(node.data);
			node.left && traversePreOrder(node.left);
			node.right && traversePreOrder(node.right);
		}
		traversePreOrder(this.root);
		return result;
	}

	postOrder(){
		if(this.root = null){
			return null;
		}

		let result = new Array();
		function traversePostOrder(node){
			node.right && traversePostOrder(node.right);
			node.left && traversePostOrder(node.right);
			result.push(node.data);
		}

		traversePostOrder(this.root);

		return result;
	}

	levelOrder(){
		
	}
}