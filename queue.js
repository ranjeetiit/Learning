//Circular queue

function Queue (size) {
	if(!size){
		throw  new new Error("please pass size of queue as first argument");
	}
	this.queue = new Array(size);
	this.rear = 0;
	this.front =0;
	this.max_size = size;
}


Queue.prototype.size = function(){
	var size = 0
		size = (this.max_size - this.front + this.rear) % this.max_size
	return size;
};

Queue.prototype.isEmpty = function(){
	return this.size() == 0;
}

Queue.prototype.enqueue = function(ele){
	if(this.size() == this.max_size){
		throw new Error("queue is overflowed");
	}
	this.queue[this.rear] = ele;
	this.rear = (this.rear+1) % this.max_size
};

Queue.prototype.dequeue = function(){
	var x;
	if(this.isEmpty){
		throw new Error("queue is Empty")
	}else{
		x = this.queue[this.front];
		
		this.front = (this.front+1) % this.max_size
	}
	return x;
};

Queue.prototype.front = function(){
	if(this.isEmpty()){
	 	throw new Error("queue is empty");
	}
	return this.queue[this.front];
};

Queue.prototype.printElements = function(){
	// body... 
};