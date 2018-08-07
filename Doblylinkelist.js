function Node (value) {
	this.data = value;
	this.previous = null;
	this.next = null;
}

function DoublyList (){
	this._length = 0;
	this.head = null;
	this.tail = null;
}

DoublyList.prototype.insert = function(value){
	var node = new Node(value);

	if(this._length){
		this.tail.next = node;
		node.previous = this.tail;
		this.tail = node;
	}else{
		this.head = node;
		this.tail = node;
	}
	this._length ++ ;

	return node;
};

DoublyList.prototype.delete = function(position){
	var currentNode = this.head,
		len = this._length,
		beforeNodeToDel = null,
		nodeToDel = null,
		delNode = null;

	if(len == 0 || position > len || position < 1){
		throw new Error("this node doesn't exist")
	}

	if(position == 1){
		this.head = currentNode.next;
		//2nd node is there
		if(!this.head){
			this.head.previous = null;
		}else{
			this.tail = null;
		}
	}else if(position = len){
		
	}
};