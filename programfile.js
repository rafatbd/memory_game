/* This is my first
 JavaScript program */
// let r = 5; // Defines a variable r and gets 5 as the initial value
// // Computes and prints to console the perimeter of a circle of radius r
// console.log("The perimeter of a circle of radius "+r+" is "+ 2 * Math.PI * r);
// console.log("The area of a circle of radius "+r+" is "+ r * r * Math.PI);

// function menu() { // Function definition. menu is the name of the function.
//  console.log("1. Create an student");
//  console.log("2. Modify an student");
//  console.log("3. Delete an student");
//  console.log("4. List students");
// }
// menu(); // Call to the function
// function sum(a, b) {return a+b;} // Function definition with two parameters, sum is its name
// console.log(sum(2, 3)); // Call to the function and print the result returned by the function
// console.log( Math.sqrt(-2)); 


//Sessio 3:
//Funcions
function random(limit){
	return Math.floor(Math.random() * limit); 
}

function clock(segons,separador = ":"){
	let hours = Math.floor( segons / 3600 );  
	let minutes = Math.floor( (segons % 3600) / 60 );
	let seconds = segons % 60;

	//Anteponiendo un 0 a los minutos si son menos de 10 
	//minutes = minutes < 10 ? '0' + minutes : minutes;

	//Anteponiendo un 0 a los segundos si son menos de 10 
	//seconds = seconds < 10 ? '0' + seconds : seconds;

	let result = hours + separador + minutes + separador + seconds;  // 2:41:30
	return result;
}

console.log(random(12)); 
console.log(clock(3734,"-"));
console.log(clock(3734,"#"));

//Arrays
let l=["John", "Mary", "Frank", "Nicole", "Joseph"];
console.log(l);
l.push("Jane");
l.push("George");
console.log(l);
l.shift();
l.sort();
l.splice(0,2);
console.log(l);

function concat_sort(a1,...a){
	 //Spread
	
	return a1.concat(...a).sort();
}
console.log(concat_sort([7], [3,2], [5,6,4], [1]));

function days_of_month(m){
	let d=31;
	switch(m) {
		case 11:
		case 9:
		case 6:
		case 4:
			d=30;
			break;
		case 2:
		// code block to be executed if expression matches case y
			d=28;
			break;
		// code block to be executed if previous cases have not matched
	}
	return d;
}
console.log(days_of_month(new Date().getMonth()+1));

function average(v){
	let sum = 0;
	let i = 0;
	while (i < v.length) {
		sum += v[i];
		i++;
	}
	return sum/v.length;
}
let v=[5,4,3];
console.log(average(v));

//Tauler aleatori memory game:
function initial_cards(n){
	let i=0;
	let cards = new Array(n).fill(0).map((element,index)=>i).map((e,i)=>Math.floor(i/2)+1);
	cards.forEach((e,i,a)=> { let p=random(12); let aux=a[p]; a[p]=a[i]; a[i]=aux;});
	return cards;
}
console.log("Tauler aleatori");
console.log(initial_cards(12));