class  Tree{
  constructor(data){
    let rootNode = new Node(data);
    this.root = rootNode;
  }
  getRoot(){
    return this.root;
  }
  preOrderTraversalRecursion(root){
    if(root == null){
      return null;
    }
    console.log(root.data);
    this.preOrderTraversalRecursion(root.left);  
    this.preOrderTraversalRecursion(root.right);
  }
  inOrderTraversalRecursion(root){
    if(!root){
      return
    }
    this.inOrderTraversalRecursion(root.left);
    console.log(root.data);
    this.inOrderTraversalRecursion(root.right);
  }
  postOrderTraversalRecursion(root){
    if(!root){
      return;
    }
    this.postOrderTraversalRecursion(root.left);
    this.postOrderTraversalRecursion(root.right);
    console.log(root.data);
  }
  preOrderTraversalIterative(root){
    if(!root){
      return;
    }
    let stack = new Stack();
    stack.push(root);
    let popedNode;
    while(!stack.isEmpty()){
      popedNode = stack.top();
      console.log(popedNode.data);
      stack.pop();
      if(popedNode.right){
        stack.push(popedNode.right)
      }
      if(popedNode.left){
        stack.push(popedNode.left);
      }
    }
  }
  inOrderTraversalIterative(root){
    if(!root){
      return;
    }

    let stack = new Stack();
    let current = root;
    
    while(current){
      stack.push(current);
      current = current.left;
    }

    while(!stack.isEmpty()){
      current = stack.pop();
      console.log(current.data);
      if(current.right){
        current = current.right;  
        while(current){
          stack.push(current);
          current = current.left;
        }
      }
    }
  }
  postOrderTraversalIterative(root){
    if(!root){
      return;
    }
    var stack = new Stack();
    var current = root;
    var temp;
    while(current  || !stack.isEmpty()){
      if(current){
        stack.push(current);
        current = current.left;
      }else{
        temp = stack.top().right;
        if(!temp){
          temp = stack.pop();
          console.log(temp.data);
          while(!stack.isEmpty() && temp == stack.top().right){
            temp = stack.pop();
            console.log(temp.data);
          }
        }else{
          current = temp;
        }
      }
    }
  }
  bfs(root){
    var queue = new Queue();
    queue.enqueue(root);
    var temp;
    while(!queue.isEmpty()){
      temp = queue.dequeue();
      console.log(temp.data);
      if(temp.left){
        queue.enqueue(temp.left)
      }
      if(temp.right){
        queue.enqueue(temp.right);
      }
    }
  }
}

class Node{
  constructor(data){
    this.data = data;
    this.left = null;
    this.right = null;
  }
  getData(){
    return this.data;
  }
  setLeft(left){
    this.left = left;
  }
  setRight(right){
    this.right = right;
  }
  getLeft(){
    return this.left;
  }
  getRight(){
    return this.right;
  }
}

class Stack{
  constructor(){
    this.stack = [];
  }
  push(ele){
    this.stack.push(ele);
  }
  pop(){
    if(!this.size()){
      console.log("stack is empty");
      return;
    }else{
      return this.stack.pop();
    }
  }
  size(){
    return this.stack.length;
  }
  top(){
    return this.stack[this.size() -1];
  }
  isEmpty(){
    return this.size() ? false : true;
  }
}

class Queue{
  constructor(){
    this.queue = []
  }
  enqueue(ele){
    this.queue.push(ele)
  }

  dequeue(){
    if(this.size() == 0){
      throw new Error("queue is empty");
    }
    return this.queue.shift();
  }

  front(){
    if(this.size() == 0){
      throw new Error("queue is empty");
    }
    return this.queue[0];
  }

  size(){
    return this.queue.length;
  }

  isEmpty(){
    return this.queue.size == 0;
  }
}


let tree = new Tree(8);

tree.getRoot().setLeft(new Node(7));
tree.getRoot().setRight(new Node(6));
tree.getRoot().getLeft().setLeft(new Node(5));
tree.getRoot().getLeft().setRight(new Node(4));
tree.getRoot().getRight().setLeft(new Node(3));
tree.getRoot().getRight().setRight(new Node(2));
console.log("tree --->> ", tree);
/*console.log("-------------------preOrderTraversalRecursion-------------------");
tree.preOrderTraversalRecursion(tree.getRoot());
console.log("-------------------preOrderTraversalIterative---------------------");
tree.preOrderTraversalIterative(tree.getRoot());
console.log("-------------------inOrderTraversalRecursion-------------------");
tree.inOrderTraversalRecursion(tree.getRoot());
console.log("-------------------inOrderTraversalIterative-------------------");
tree.inOrderTraversalIterative(tree.getRoot());
console.log("-------------------postOrderTraversalRecursion-------------------");
tree.postOrderTraversalRecursion(tree.getRoot());
console.log("-------------------postOrderTraversalIterative-------------------");
tree.postOrderTraversalIterative(tree.getRoot());


console.log("----------BFS----------------")
tree.bfs(tree.getRoot())
*/
function sumAtEachLevel(root){
  var stack1 = new Stack();
  var stack2 = new Stack();
  var current, level = 0, sum = 0;
  stack1.push(root);
  while(!stack1.isEmpty() || !stack2.isEmpty()){
    if(!stack1.isEmpty()){
      while(!stack1.isEmpty()){
        current = stack1.pop();
        if(current.left){
          stack2.push(current.left);
        }
        if(current.right){
          stack2.push(current.right);
        }
        sum = sum + current.data;
      }
      console.log("sum at level " , level, " --- >> ", sum);
      sum = 0;
      level++;  
    }
    if(!stack2.isEmpty()){
      while(!stack2.isEmpty()){
        current = stack2.pop();
        if(current.left){
          stack1.push(current.left);
        }
        if(current.right){
          stack1.push(current.right);
        }
        sum = sum + current.data;
      }
      console.log("sum at level " , level, " --- >> ", sum);
      sum = 0;
      level++;
    }
  }
}

sumAtEachLevel(tree.getRoot());

function zigzagTraversal(root){
  var stack1 = new Stack();
  var stack2 = new Stack();
  var current;
  stack1.push(root);
  while(!stack1.isEmpty() || !stack2.isEmpty()){
    while(!stack1.isEmpty()){
      current = stack1.pop();
      if(current.left){
        stack2.push(current.left);
      }
      if(current.right){
        stack2.push(current.right);
      }
      console.log(current.data);
    }
    while(!stack2.isEmpty()){
      current = stack2.pop();
      if(current.right){
        stack1.push(current.right);
      }
      if(current.left){
        stack1.push(current.left);
      }
      console.log(current.data);
    }
  }
}

zigzagTraversal(tree.getRoot())



