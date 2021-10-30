/*jshint esversion: 6 */
var UnaCartaGirat=false;
var primeraCarta,segonaCarta=null;
var parellaCartaGirat=false;
var iniciPartida=false;
var temps=0;
var parellesClickades=0;
var cartesGirades=0;
var midaTauler=0;
var timer=0;

function temporitzador(){
	console.log("Crtes girades "+cartesGirades);
	if (cartesGirades<midaTauler/2) {
  		temps+=1;
		$("#temporitzador").html(temps+" segons jugats");  	
  	}
  	else if (cartesGirades>=midaTauler/2) {
  		console.log("Guanyador");
  		$("#guanya").html("Has guanyat la partida!");	
  	}
}

function girarCarta() {
  console.log("Entra en la funció per girar cartes");	
  //this.classList.toggle('flip');

  //Tot això mostra una carta i l'amaga després de 1 segons
  //this.classList.add('flip');
  //El mateix però en jquery

  //$( this ).addClass( "flip" );
  //Això agafa l'element seleccionat i afegeix la classe flip que per .css el gira 180 graus
  //setTimeout(() => {
  	//Això agafa l'element seleccionat i li treu la classe flip, llavors torna a la posició original (sense girar 180 graus)
    //this.classList.remove('flip');
    //El mateix però en jquery
  	//$( this ).removeClass( "flip" );
  //}, 1000);

  //Ara girem les cartes i comprovem si son iguals o no en jquery:
  console.log("ClassList de this en la funció "+this.classList);
  //Deixem girar una carta només si no hi ha dos parelles de cartes seleccionades ja i que encara no s'hagin girat(amagat)
  //I que la carta a girar no sigui la mateixa 	
  	if (parellaCartaGirat===false && this!==primeraCarta) {
  	  $( this ).addClass( "flip" );
  	  let cartes_girades = $(".flip").length;
  	  console.log("Numero de cartes girades "+cartes_girades);
  	  //Iniciem el temporitzador
  	  if (cartes_girades===1 && !iniciPartida && cartesGirades<midaTauler/2) {
  	  	console.log("Primera carta girada del tauler, iniciem el temps !!!!!!!!");
  	  	iniciPartida=true;
  	  	timer=setInterval(temporitzador,1000);
  	  }
	  
	  if (UnaCartaGirat===false) {
	  	UnaCartaGirat=true;
	  	primeraCarta=this;
	  }
	  else if (UnaCartaGirat===true) {
	  	//Incrementem el nombre de parelles clickades
	  	parellesClickades+=1;
		$("#parellesClickades").html(parellesClickades+" moviments fets");

	  	UnaCartaGirat=false;
	  	segonaCarta=this;
	  	console.log("Dos imatges "+$(primeraCarta).attr("class")+" "+$(segonaCarta).attr("class"));
	  	//Comparem si la primera carta seleccionada i la segona són el mateix imatge(src)
	  	console.log("Dos src "+primeraCarta.dataset.src+" "+segonaCarta.dataset.src);
	  	if (primeraCarta.dataset.src===segonaCarta.dataset.src) {	
	  		//Si les dues cartes son el mateix imatge llavors els treiem el event perquè no es pugui seleccionar un altre cop
	  		$(primeraCarta).unbind( 'click',girarCarta );
	  		$(segonaCarta).unbind( 'click',girarCarta );
	  		//Esborrem els parells de cartes ja seleccionats
	  		UnaCartaGirat=false;
	  		parellaCartaGirat=false;
	  		primeraCarta=null;
	  		segonaCarta=null;
	  		//Incrementem el nombre de cartes girades
	  		cartesGirades+=1;
	  	}
	  	else{
	  		//Tenim dos parells de cartes seleccionats per tant evitem que es seleccioni un altra mentre que no es giri aquestes
	  		parellaCartaGirat=true;
	  		//Si les dues cartes no coincideix llavors els tornem a girar al cap de 1 segon
	  		setTimeout(() => {
	    	//Això agafa l'element seleccionat i li treu la classe flip, llavors torna a la posició original (sense girar 180 graus)(en jquery)
	  			$( primeraCarta ).removeClass( "flip" );
	  			$( segonaCarta ).removeClass( "flip" );
	  			//Ara ja es pot seleccionar un altra carta perquè s'han girat les anteriors
	  			parellaCartaGirat=false;
	  			//Esborrem els parells de cartes ja seleccionats
	  			UnaCartaGirat=false;
	  			primeraCarta=null;
	  			segonaCarta=null;
	  		}, 1000);
	  	}
	  }
	} 
}

function random(limit){
	return Math.floor(Math.random() * limit); 
}

function cleanArray( actual ){
  var newArray = new Array();
  for( var i = 0, j = actual.length; i < j; i++ ){
      if ( actual[ i ] ){
        newArray.push( actual[ i ] );
    }
  }
  return newArray;
}
//Tauler aleatori memory game:
function initial_cards(n){
	let i=0;
	let cards = new Array(n).fill(0).map((element,index)=>i).map((e,i)=>Math.floor(i/2)+1);
	cards.forEach((e,i,a)=> { 
		let p=random(n); 
		let aux=a[p]; 
		a[p]=a[i]; 
		a[i]=aux;
	});
	return cards;
}
		
function sleep(milliseconds) {
    var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		    break;
		}
	}
}

function buidar_tauler(){
	$("#row_1").empty();
	$("#row_2").empty();
	$("#row_3").empty();
	$("#row_4").empty();
	UnaCartaGirat=false;
	primeraCarta=null;
	segonaCarta=null;
	parellaCartaGirat=false;
	iniciPartida=false;
	temps=0;
	parellesClickades=0;
	cartesGirades=0;
	clearInterval(timer);
	$("#temporitzador").html(temps+" segons jugats"); 
	$("#parellesClickades").html(parellesClickades+" moviments fets");
	$("#guanya").html("");
}

function incialitzar_imatges_8(){
	//Buidem el tauler abans d'omplir-lo i inicialitzem el temps i els  moviments fets
	buidar_tauler();
	midaTauler=8;
	//let cards = cleanArray( initial_cards(8));
	let cards = initial_cards(8);
	cards = initial_cards(8);
	console.log("Cards avans "+cards);
	console.log("Cards despres "+initial_cards(8));		
	//Inicialitzem la fila 1
	let img="";
	let contador=0;
	for (let i = 0; i < 4; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "0"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCartaAmagar} noHidden" alt="card"></div>\n`;
		cards.splice(i,1);
		contador+=1;
	}
	//document.getElementById("row_1").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_1").html(img);

	//Inicialitzem la fila 2
	img="";
	for (let i = 0; i < cards.length; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "2"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCarta} noHidden" alt="card"></div>\n`;
		contador+=1;
		// Dona problemes el splice amb només 2 elements
		// cards.splice(i,1);
	}
	//document.getElementById("row_3").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_2").html(img);


	//Girar cartes al fer clic a sobre, per fer-ho agafem tots els fills de la classe column que conte els imatges.
	//"querySelectorAll" és jquery 	
	const cartes = document.querySelectorAll('.column');
	//Per cada carta al sobre del qual s'ha fet clic cridem a la funció "girarCarta"
	//cartes.forEach(carta => carta.addEventListener('click', girarCarta));
	//El mateix però en jquery
	$( cartes ).each(function( ) {
  		$(this).bind('click',girarCarta);
	});
}

function incialitzar_imatges_12(){
	//Buidem el tauler abans d'omplir-lo
	buidar_tauler();
	//let cards = cleanArray(initial_cards(12));
	let cards = initial_cards(12);
	cards = initial_cards(12);
	console.log("Cards avans "+cards);
	console.log("Cards despres "+initial_cards(12));
	midaTauler=12;		
	//Inicialitzem la fila 1
	let img="";
	let contador=0;
	for (let i = 0; i < 4; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "0"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCartaAmagar} noHidden" alt="card"></div>\n`;
		cards.splice(i,1);
		contador+=1;
	}
	//document.getElementById("row_1").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_1").html(img);

	//Inicialitzem la fila 2
	img="";
	for (let i = 0; i < 4; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "1"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu, per accedir al src de cada element fem dataset.src
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCartaAmagar} noHidden" alt="card"></div>\n`;
		cards.splice(i,1);
		contador+=1;
	}
	//document.getElementById("row_2").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_2").html(img);

	//Inicialitzem la fila 3
	img="";
	for (let i = 0; i < cards.length; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "2"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCarta} noHidden" alt="card"></div>\n`;
		contador+=1;
		// Dona problemes el splice amb només 2 elements
		// cards.splice(i,1);
	}
	//document.getElementById("row_3").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_3").html(img);


	//Girar cartes al fer clic a sobre, per fer-ho agafem tots els fills de la classe column que conte els imatges.
	//"querySelectorAll" és jquery 	
	const cartes = document.querySelectorAll('.column');
	//Per cada carta al sobre del qual s'ha fet clic cridem a la funció "girarCarta"
	//cartes.forEach(carta => carta.addEventListener('click', girarCarta));
	//El mateix però en jquery
	$( cartes ).each(function( ) {
  		$(this).bind('click',girarCarta);
	});
}

function incialitzar_imatges_16(){
	//Buidem el tauler abans d'omplir-lo
	buidar_tauler();
	//let cards = cleanArray(initial_cards(16));
	let cards = initial_cards(16);
	cards = initial_cards(16);
	console.log("Cards avans "+cards);
	console.log("Cards despres "+initial_cards(16));
	midaTauler=16;		
	//Inicialitzem la fila 1
	let img="";
	let contador=0;
	for (let i = 0; i < 4; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "0"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCartaAmagar} noHidden" alt="card"></div>\n`;
		cards.splice(i,1);
		contador+=1;
	}
	//document.getElementById("row_1").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_1").html(img);

	//Inicialitzem la fila 2
	img="";
	for (let i = 0; i < 4; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "1"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu, per accedir al src de cada element fem dataset.src
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCartaAmagar} noHidden" alt="card"></div>\n`;
		cards.splice(i,1);
		contador+=1;
	}
	//document.getElementById("row_2").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_2").html(img);

	//Inicialitzem la fila 3
	//Agafem més cartes
	img="";
	for (let i = 0; i < 4; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "2"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCarta} noHidden" alt="card"></div>\n`;
		contador+=1;
		// Dona problemes el splice amb només 2 elements
		cards.splice(i,1);
	}
	//document.getElementById("row_3").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_3").html(img);

	//Inicialitzem la fila 4
	img="";
	for (let i = 0; i < cards.length; i++) {
		let num = cards[i];
		let n = num.toString();
		let idCarta = (contador).toString();
		let idCartaAmagar = "2"+idCarta;
		console.log("ID creats: " + idCarta);
		console.log("ID amagar creats: " + idCartaAmagar);
		console.log("Tipo ID creats: " + typeof idCarta);
		console.log("Tipo ID amagar creats: " + typeof idCartaAmagar);
		n+=".svg";
		//Posem al div el data-src per diferenciar cada imatge dintre seu amb el src de cadascu
		img+=`<div class="column hover" data-src="${n}"><img src="${n}" class="${idCarta} hidden" alt="card"><img src="memoria.svg" class="${idCarta} noHidden" alt="card"></div>\n`;
		contador+=1;
		// Dona problemes el splice amb només 2 elements
		//cards.splice(i,1);
	}
	//document.getElementById("row_3").innerHTML=img;
	//El mateix però amb jquery:
	$("#row_4").html(img);



	//Girar cartes al fer clic a sobre, per fer-ho agafem tots els fills de la classe column que conte els imatges.
	//"querySelectorAll" és jquery 	
	const cartes = document.querySelectorAll('.column');
	//Per cada carta al sobre del qual s'ha fet clic cridem a la funció "girarCarta"
	//cartes.forEach(carta => carta.addEventListener('click', girarCarta));
	//El mateix però en jquery
	$( cartes ).each(function( ) {
  		$(this).bind('click',girarCarta);
	});
}