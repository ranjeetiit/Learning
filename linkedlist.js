function Node (value) {
	this.value = value;
	this.next = null;
}

function SinglyLinkedList(){
	this._length = 0;
	this.head = null;
}

SinglyLinkedList.prototype.add = function(value){
	var node = new Node(value),
		currentNode = this.head;

	if(!currentNode){
		this.head = node;
		this._length ++;
		
		return node;
	}

	while(currentNode.next){
		currentNode = currentNode.next;
	}

	currentNode.next = node;

	this._length ++;

	return node;
};

SinglyLinkedList.prototype.remove = function (position) {
	var currentNode = this.head,
		length = this._length,
		count = 0,
		deLNode = null,
		beforeNodeToDel = null,
		nodeToDelete = null;

	if(position < 0 || position > length){
		throw new Error("node doesn't exist");
	}

	if(position == 1){
		this.head = currentNode.next;
		delNode = currentNode;
		currentNode = null;
		this._length--;
		return delNode;
	}

	while(count < position ){
		beforeNodeToDel = currentNode;
		nodeToDelete = currentNode.next;
		count ++;
	}

	beforeNodeToDel.next = nodeToDelete.next;
	delNode = nodeToDelete;
	nodeToDelete = null;
	this._length --;

	return deLNode;
}

SinglyLinkedList.prototype.searcNodeAt = function(position){
	var length = this._length,
		currentNode = this.head,
		count = 1;
	if(length==0 || position < 1 || position > this._length){
		throw new Error("node doesn't exist");
	}

	while(count < position ){
		currentNode = currentNode.next;
		count ++
	}
	return currentNode;
}



SinglyLinkedList.prototype.reverse = function(){
	if(!this.head)
		return null;

	var prev = null,
		curr = this.head,
		next = null;
	
	while(curr){
		next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	this.head = prev;
	return this;
};

SinglyLinkedList.prototype.isPalindrom = function(argument){
	
	function reverseScondHalf(){
		var prev = null,
			curr = secondHalf,
			next = null;
		while(curr){
			next = curr.next;
			curr.next = prev;
			prev = curr;
			curr = next;
		}
		secondHalf = prev;
	}

	function compareList(head , secondHalf){
		var temp1 = head,
			temp2 = secondHalf;
		
		while(temp1 && temp2){
			if(temp1.value == temp2.value){
				temp1 = temp1.next;
				temp2 = temp2.next;
			}else{
				return false;
			}
		}
		if(temp2 == null){
			return true;
		}
		return false;
	}

	var head = this.head,
		slowPointer = head,
		fastPointer = head,
		prevSLowPointer = head,
		midNode = null,
		secondHalf = null;
		res= true;
	if(head && head.next){
		while(fastPointer && fastPointer.next){
			fastPointer = fastPointer.next.next;
			prevSLowPointer = slowPointer;
			slowPointer = slowPointer.next;
		}
	}

	if(fastPointer){
		midNode = slowPointer;
		slowPointer = slowPointer.next;
	}

	secondHalf = slowPointer;
	prevSLowPointer = null;
	reverseScondHalf();
	
	res = compareList(head, secondHalf);
	
	//Restore Original List
	reverseScondHalf();
	
	return res;
};



function reverseInGroup(head, k){
	var current = head,
		prev = null,
		next = null,
		count = 0;
	while(count <k && current){
		next = current.next;
		current.next = prev;
		prev = current;
		current = next;
		count++;
	}


	if(next != null){
		head.next = reverseInGroup(next , k) 
	}

	return prev;
}

function detectLoop(head){
	var fastPointer = head,
		slowPointer = head;

	while(slowPointer && fastPointer && fastPointer.next){
		if(slowPointer ==  fastPointer){
			return true;
		}
	}
	return false;
}

/* ---------------------------------------------------------- */
function sumTwoLinkedList(ll1, ll2){
	var len1 = getLengthOfLinkedList(ll1),
		len2 = getLengthOfLinkedList(ll2);
	var diff =  Math.abs(len1 - len2);

	if(len1 > len2){
		addNodesWithValZero(ll1 , diff)
	}else if(len1 < len2){
		addNodesWithValZero(ll2 , diff)
	}
	ll1.reverse()
	ll2.reverse();
	var carry = 0,
		total = 0,
		value;
	var ll3 = new SinglyLinkedList();
	var ll1Curr = ll1.head,
		ll2Curr = ll2.head;

	while (ll1Curr && ll2Curr) {
		total = ll1Curr.value + ll2Curr.value + carry;
		value = total % 10;
		carry = total / 10;
		ll1Curr = ll1Curr.next;
		ll2Curr = ll2Curr.next;
		ll3.add(value);
	}

	if(carry){
		ll.add(carry);
	}
	ll3.reverse();
	return ll3;
}

function getLengthOfLinkedList(head){
	var count = 0,
		curr = head;
	while(curr){
		count++;
		curr = curr.next;
	}
	return count;
}

function addNodesWithValZero(ll , count){
	while(count){
		ll.add(0);
		count--;
	}
}

/* ---------------------------------------------------------- */