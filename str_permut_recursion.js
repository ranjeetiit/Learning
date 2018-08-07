var count = 0;
function permute(str, l, r){
	l = l || 0;
	r = r || str.length-1;
	if(l == r){
		console.log(str);
	}else{
		for(var i = l; i <=r; i++){
			count ++
			str = swap(str, l, i);
			permute(str, l+1 , r);
			str = swap(str, l, i);
		}
	}
}

function swap(str, l, r){
	var arr = str.split(""),
		temp;
	temp = arr[l];
	arr[l] = arr[r];
	arr[r] = temp;
	return arr.join("")
}

permute("ABC")



Array.prototype.map = function(callback, thisArgs){
	return this.reduce(function(mappedArray, currentValue, index, array){
		mappedArray[index] = callback.call(thisArgs, currentValue, index, array);
		return mappedArray;
	},[])
};

Array.prototype.reduce = function(callback, thisArgs){
	
};