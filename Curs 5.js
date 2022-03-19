let numar =1; //definesc variabila numar si asignez valoarea 1 (comentariu pe o linie)
let numarCuVirgula =1.5;
let sirDeCaractere ="Ana are mere"; 
let sirDeCaractere2 ='Ana are mere !!!';
let boolTrue = true;
let boolFalse = false;
/*
cometariu
pe mai 
multe linii
*/
//matematica
numar = 1 + 2;
numar = numar * 2;
numarCuVirgula = 1 + (2 * 3) - 7;
numar *= 2; //inseamna numar = numar * 2;
numar += 2; //inseamna numar = numar + 2;
numar -= 2; //inseamna numar = numar - 2;
numar /= 2; //inseamna numar = numar / 2;
numar++; // inseamna numar= numar + 1
numar--; // inseamna numar= numar - 1
numar = numar%2; // restul impartiri; daca da 0 este par daca da 1 este impar;
numar = numar**; //ridicare la putere;
numar= Math.pow(numar,3)// inseamna numar la puterea 3;
//sa tin minte string(sir de caractere)

let sir = "A" + "B"; //un nou sir de caractere "AB"
sir +="Mergeee";
//nu se pot scadea numar de caractere si nu putem aduna numere cu caractere (se poate dar nu se recomanda)
//Exemplu de caracter+cifra.
let nuFaceAsa= 3+"A" // "3A"
let nuFaceAsta2= 2+3+"A" // "5A"
let nuFaceAsta3= "B" + 2 + 3 +"A"; // "B23A" daca pun parenteze la 2 si 3 atunci da B5A;
String(23) // transforma in sir de caractere ex:"23"


//Facem boolean 
// Exista doar treu(1) si false(0) 
// !(not)-> !true = false
// !(not)-> !false = true

// AND (in cod se scrie asa "&&") inmultire
let x = true && false;
// OR (in cod se scrie asa "||") adunare
let x = true || false;

if (conditia) {
    //in cazul in care conditia este adevarata 
}
else{
    //in cazul in care conditia este falsa.
}

//=======================================================================================================

let ghiciNumarul= 5;
let numarIncercari= 3;

if (ghiciNumarul === 6) {
    numarIncercari--;
    ghiciNumarul++;
} 
else {
    alert ("Bravo ai ghicit");
}

// egalitate  ===
// diferit !==
// mai mare >
// mai mic <
// mai mic sau egal <=
// mai mare sau egal >=
// negare ! 

if(ghiciNumarul1 % 2 === 0){
    alert( "Numarul " ghiciNumarul1 + "este par");// Numarul 5 este par
    
} else {
    alert( `Numarul ${ghiciNumarul1} este impar`);
}

"ana are \"3\" mare" //Ana are 3 mere 



// ========================================================================================================================================================================             Curs 6 

