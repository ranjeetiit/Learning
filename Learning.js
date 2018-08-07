function memoization(fn){
	var cache = [0,1];
	return function(num){
		if(cache[num]){
			return cache[num]
		}else{
			var value = fn.call(null,num);
			cache[num] = value;
			return value;
		}
	}
}

var fib = function(num){
	if(num < 0 ) return 0;
	return fib(num-1) +  fib(num-1)
};

var fib = memoization(fib);

----------------------------------

function findIfNumberPresent (arr , num){
	var m = arr.length , n = arr[0].length;
	var i =0; j = n-1;

	while(i < m && j >= 0){
		if(arr[i][j] == num){
			return true;
		}
		if(arr[i][j] > num){
			j--
		}else{
			i++
		}
	}
	return false; 
}


var arr = [
	[1,2,3], 
	[2,4,6], 
	[5,7,8]
]

findIfNumberPresent(arr , 5)




-----------------------------------------


function mergeSorteLinkedList(L1, L2){
	if(L1 ==  null) return L2;
	if(L2 ==  null) return L1;

	if(L1.value < L2.value){
		L1.next = mergeSorteLinkedList(L1.next , L2);
		return L1;
	}else{
		L2.next = mergeSorteLinkedList(L2.next, L1 );
		return L2;
	}
}


var list1 = {
	value : 1 , 
	next:{ 
		value : 3,
		next :null
	}
}


var list2 = {
	value : 2 , 
	next:{ 
		value : 5,
		next :null
	}
} 

JSON.stringify(mergeSorteLinkedList(list1, list2))
-------------------------------------

function removeCharInSeq(arr){
	var lastMatch;
	return arr.reduce(function(prev,curr){
		if(prev[prev.length-1] == curr ){
			lastMatch = prev.pop();
		}else if(curr == lastMatch){
			prev.pop()
		} else{
			lastMatch = undefined;
			prev.push(curr);
		}
		return prev;
	},[])
}

---------------------------------------------

function balancedStr(str){
	let balanced = "(){}[]",
		char , i, 
		len= str.length,
		stack = [],
		bracePos ;
	for(i = 0 ; i < len ; i ++){
		char = str[i];
		bracePos = balanced.indexOf(char)
		if(bracePos === -1){
			continue;
		}

		if(bracePos % 2 == 0){
			stack.push(bracePos + 1)
		}else{
			if(stack.length == 0 || stack.pop() != bracePos){
				return false;
			}
		}
	}
	return stack.length === 0 
}

------------------------------------------------

var categories =[
	{id:"animals" , parent : null},
	{id:"mamals" , parent : "animals"},
	{id:"cats" , parent : "mamals"},
	{id:"dogs" , parent : "mamals"},
	{id:"xyz" , parent : "dogs"},
	{id:"abc" , parent : "dogs"},
	{id:"pqr" , parent : "cats"}
]


function makeTrees(cat,parent){
	var tree = {}
	cat.filter(function(ele){
		return ele.parent == parent;
	}).forEach(function(ele){
		tree[ele.id] = makeTrees(categories, ele.id)
	})
	return tree;
}

JSON.stringify(makeTrees(categories), null ,2);

--------------------------------------------------

function curryIt(fn){
	var arity = fn.length;
	return function f1(){
		var args = Array.prototype.slice.call(arguments);
		if(arguments.length >= arity){
			 return fn.apply(null, args)
		}else{
			return function f2(){
				var args2 = Array.prototype.slice.call(arguments);
				return f1.apply(null , args.concat(args2));
			}
		}
	}
}

function sum(a,b,c,d){
	return a+b+c+d;
}

var add = curryIt(sum);

----------------------------------------------

function throttle (callback, delay, maxCall) {
    var wait = false, 
    	timerId = null, 
    	numTimes = 0, 
    	maxCall =  maxCall || 1 ;

    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.apply(null , arguments);           // Execute users function
            wait = true;               // Prevent future invocations
			numTimes ++;
			timerId = setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
				numTimes = 0;
				timerId = null;          
			}, delay);
        }else{
			if(timerId && numTimes < maxCall){
				callback.apply(null , arguments);
				numTimes ++;
			}
        }
    }
}

-----------------------------------------------
function debounce (callback, delay){
	var timeout = null;
	return function(){
		if(timeout){
			clearTimeout(timeout);
		}
		timeout = setTimeout(function(){
			callback.apply(null,arguments);
			timeout = null;
		},delay)
	}
}
-----------------------------------------------

function sum (a,b){
	return new Promise(function(resolve , reject){
		setTimeout(function(){
			resolve(a+b)
		},500)
	})
}

----------------------------------------
function Promise(fn){
	
}

Promise.prototype.then = function(onResolve , onError){
	
}

Promise.prototype.catch = function(fn){
	fn()
}	
 ----------------------------------------------


 The deep reason why promises are often better is that they're more composeable, which roughly means that combining multiple promises "just works", while combining multiple callbacks often doesn't. For instance, it's trivial to assign a promise to a variable and attach additional handlers to it later on, or even attach a handler to a large group of promises that gets executed only after all the promises resolve. While you can sort of emulate these things with callbacks, it takes a lot more code, is very hard to do correctly, and the end result is usually far less maintainable.


 ----------------------------------------------



function permutation (str){
	if(str.length < 2){
		return str;
	}
	var permutations = [];
	var char , remainingStr;
	for(var i =0 , len = str.length ; i < len ;  i++){
		char = str[i];
		if(str.indexOf(char) != i){
			continue;
		} // for removing dupliacte
		remainingStr = str.slice(0,i) + str.slice(i+1);
		for(var subPermut of permutation(remainingStr)){
			permutations.push(char + subPermut);
		}
	}
	return permutations;
}

--------------------------------------------------------------

function minDiff(arr , x ,y){
	var diff = Number.MAX_SAFE_INTEGER;
	var  i = 0 , len = arr.length ,prev;
	for( ; i < len ; i ++ ){
		if(arr[i] == x || arr[i] == y){
			prev = i;
			break;
		}
	}

	if( typeof(prev) == "number" && prev >= 0){
		for(; i < len ; i++){
			if(arr[i] == x || arr[i] == y){
				if(arr[prev] != arr[i] && (i - prev) < diff){
					diff = i - prev;
					prev = i
				}else{
					prev = i
				}
			}		
		}
	}

	return diff;
}

var arr = [4,3,5,4,2,6,3,0,0,5,4,8,3]
minDiff(arr,3,6)

-------------------------------------------------------------

function creatPromie(fn){
	var successCallBack = [] , errorCallBack = [] , response;
	function resolve(resp) {
		response = resp;
		successCallBack.forEach(function(fn){
			fn(resp);
		})
	}

	function reject(){

	}

	return{
		then : function(onSuccess , onError){
			if(response){
				onSuccess(response);
			}else{
				successCallBack.push(onSuccess);
			}
		}
	}
}



-----------------------------------------

function printPath(tree,x){
	var arr =[];
	if(hasPath(tree, arr,x)){
		var len = arr.length-1;
		var path = arr.reduce(function(prev , curr , index){
			if(index == len ){
				return prev+curr
			}else{
				return prev+ curr  +"-->";
			}
		},"")
		console.log(path)
	}
}

function hasPath(root, arr , x){
	if(!root){
		return false;
	}
	arr.push(root.data)

	if(root.data == x){
		return true
	}
	if(hasPath(root.left , arr , x) || hasPath(root.right , arr , x)){
		return true
	}

	arr.pop();
	return false
}

var tree = {
	"data": 1,
	"left": {
		"data": 2,
		"left": {
			"data": 4
		},
		"right": {
			"data": 5
		}
	},
	"right": {
		"data": 3,
		"left": {
			"data": 6
		},
		"right": {
			"data": 7
		}
	}
}
printPath(tree , 5)

---------------------------------

function trapWater(arr){
	var len = arr.length, 
		left = 0, 
		right = len-1,
		left_max = 0,
		right_max = 0,
		result = 0;

	while(left <= right){
		if(arr[left] < arr[right]){
			if(arr[left] > left_max){
				left_max = arr[left];
			}else{
				result += (left_max - arr[left])
			}
			left ++
		}else{
			if(arr[right] > right_max){
				right_max = arr[right];
			}else{
				result +=  (right_max- arr[right]);
			}
			right --
		}
	}

	return result;
}

---------------------------------------


function sortMatrixRowAndColWise(matrix){
	matrix =  sortByRow(matrix);
	matrix = transposeMatrix(matrix);
	matrix = sortByRow(matrix);
	matrix=  transposeMatrix(matrix);

	return matrix;
}

function transposeMatrix(matrix){
	return matrix.reduce(function(prev,curr){
		return curr.map(function(item , i){
			return (prev[i] || []).concat(curr[i]);
		})
	}, [])
}

function sortByRow(matrix){
	return matrix.reduce(function(prev,curr){
		prev.push([...curr].sort(function(a,b){
			return a-b
		}))
		return prev;
	}, [])
}

var matrix = [
    [1,5,2],
    [6,11,4],
    [10,2,9],
]

sortMatrixRowAndColWise(matrix);





function insertSortedArray(arr, ele, startIdx , endIdx){
	let start = startIdx || 0;
	let end = endIdx || 0;
	if(arr.length == 0){
		arr.push(ele);
		return;
	}

	let m = start + Math.floor((end - start)/2);

	if(ele > arr[end] ){
		arr.splice(end + 1, 0, ele);
		return;
	}

	if(ele < arr[end] ){
		arr.splice(start, 0, ele);
		return;
	}

	if(start > end){
		return;
	}

	if(ele < arr[m]){
		insertSortedArray(arr,ele,start , m-1);
		return;
	}
	if(ele > arr[m]){
		insertSortedArray(arr , ele , m+1 , end );
		return;
	}
}


var arr = [3,6,7,8,10,12,14]
insertSortedArray(arr,2);



-------------------------------

function findNextGreaterElement(sortedList, num){
	var len = sortedList.length , nxtGrtEle;
	var start = 0, end = len -1, mid; 

	if(num > sortedList[len-1]){
		console.log('greter element not present');
		return;
	}

	if(num < sortedList[0]){
		nxtGrtEle = sortedList[0];
	}else{
		while(start <= end){
			mid = Math.floor(start + (end-start)/2);
			if(num > sortedList[mid]){
				start = mid + 1;
			}else if(num < sortedList[mid]){
				end = mid -1
			}else if(num == sortedList[mid]){
				nxtGrtEle = sortedList[mid + 1];
				break;
			}
		}
	}
	if(start > end){
		nxtGrtEle = sortedList[start];
	}	
	return nxtGrtEle;
}

var array = [1,2,3,5]
var  num = 3
findNextGreaterElement(array , 4)





-----

Element.prototype.on = function(eventName, selector, fn){
	var element = this;

	element.addEventListener(eventName, function(event){
		var possibleTargets = element.querySelectorAll(selector);
		var target = event.target;
		var p;
		for(i=0, len = possibleTargets.length, i< len, i++){
			var el = target;
			p= possibleTargets[i];
			while(el && el != element){
				if(el === p){
					return fn.apply(p, event)
				}
				el = el.parentNode;
			}
		}
	})
}