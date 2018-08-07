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

var addTwoNumbers = function(l1 ,l2){
	var result = new SinglyLinkedList();
	var carry = 0;
	var a, b, c , val;

	while(l1 !=null || l2 != null){
		a = (l1 == null) ? 0 : l1.value;
		b = (l2 == null) ? 0 : l2.value;
		c = a + b + carry;
		val = c%10;
		carry = Math.floor(c/10);
		result.add(val);
		if(l1 != null){
			l1= l1.next;
		}
		if(l2 != null){
			l2 = l2.next;
		}
	}

	if(carry !=0){
		result.add(carry);
	}

	return result;
}


/*var l1 = {
	value:2,
	next:{
		value:4,
		next:{
			value:3	
		}		
	}
}

var l2 = {
	value:5,
	next:{
		value:6,
		next:{
			value:4
		}		
	}
}*/

var l1 = {
	value:5,
	next:{
		value:0		
	}
}

var l2 = {
	value:1,
	next:{
		value:5,
		next:{
			value:0
		}		
	}
}

addTwoNumbers(l1,l2)