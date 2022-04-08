//=====================================================================================================
//O functie "equals" care primeste 2 parametrii si returneaza daca cei 2 parametrii sunt egali, strict

function equals (a, b) {
    if ( a===b) {
        return true;
    } else {
        return false;
    }
} 

//==============================================================================
//O functie "compare" care primeste 2 parametrii si returneaza -1 daca primul e mai mic ca al doilea, 0 daca sunt egale si 1 daca primul e mai mare ca al doilea
function compare (a, b) {
    if (a<b) {
        return -1;
    } else if (a===b) {
        return 0;
    } else {
        return 1
    }
}

//========================================================================================================================================================================
//O functie "max" care primeste 2 parametrii si returneaza maximul dintre cele 2
function max (a, b) {
    if (a>b) {
        return a;
    } else {
        return b;
    }
}
//===============================================================================================================================================================================
//O functie "min" care primeste 2 parametrii si returneaza minimul dintre cele 2
function min (a, b) {
 if (a<b) {
     return a;
} else {
    return b;
}
}

//=====================================================================================================================================================
//O functie "suma" care primeste 1 parametru, numar intreg si returneaza suma primelor N numere naturale pozitive (exemplu: daca N este 3, trebuie sa returneze 6)
function suma (a) {
let m = 0;
for (let i=0; i <= a; i++){
    m += i;
} return m;
} 
console.log(suma(3));    
//=====================================================================================================================================================================
//O functie "prim" care primeste 1 parametru si returneaza true/false daca N este numar prim sau nu (restul impartirii la 1 si la N ==0)
function prim (a) {
    for (let i=2; i<a; i++) {
        if (a%i===0 && a%a===0) {
            return false;
    } 
}   return true;
}  

//================================================================================================================================================================
//O functie "sumaPrime" care primeste 1 parametru si returneaza suma primelor N numere prime (pentru N=5 trebuie sa returneze 2+3+5+7+11=28)
function sumaPrime(num) {
let x = 2;
let sum = 0;
let counter = 0;
while(counter < num) {
if(prim(x)) {
    sum += x;
    console.log(x);
    counter++;
}
x++;
}

return sum;
}

//==============================================================================================================================================================================
//O functie "invers" care primeste un parametru de tip numar si intoarce inversul acestuia (ca numar) (123 => 321)
function invers (a) {
let number;
let reverse=0;
while (a !== 0) {
    number = a%10;
    reverse = reverse * 10 + number;
    a = Math.floor(a/10);
} return reverse;
}
console.log(invers(4225))

//============================================================================================================================
//O functie "produsImpare" care primeste 1 parametru si returneaza produsul primelor N numere impare pozitive (pentru N=5; returneaza 1*3*5*7*9=945)
function produsImpare (a) {
    let x=1;
    let counter = 0 
    let cric=1
    if (counter<a) {
        while (x%2===1 && counter<a) {
            x*=cric
            cric+=2
            counter++;
        } return x;
} 
} console.log(produsImpare(4))

//O functie "contains" care primeste 2 parametri(arr - array de nr intregi si x - numar) si verifica daca x exista in array (rezultatul este true/false)
function contains (a,b) {
 for (let i=0; i<=a.length; i++) {
    if (a[i]===b) {
        return true;
        }  
    }   
    return false;
} 
console.log(contains([1,2,3,4],2))

//O functie "maxArray" care primeste un array si returneaza valoarea maxima (ar trebui sa functioneze si pentru numere si pentru stringuri)
//trebuie sa reac 

function maxArray(arr) {
let max = -Infinity;
let str = '';

for(let i = 0; i < arr.length; i++) {
if(typeof arr[i] === 'string') {
    if(max < arr[i].length) {
        max = arr[i].length;
        str = arr[i];
    }
} else if(typeof arr[i] === 'number') {
    if(max < arr[i]) {
        max = arr[i];
        str = arr[i];
    }
}
}

return str;
}


// O functie "sumMinMax" care primeste un array de numere si returneaza suma dintre valoare maxima si valoare minima  
function sumMinMax (arr) {
let max = -Infinity
let min = Infinity
 for( let i=0; i < arr.length; i++){
     if (max < arr[i]) {
         max = arr[i]
     } if (min > arr[i]){
         min = arr[i]
     }
 } return min + max
}  

//O functie "hasDuplicates" care primeste un array si returneaza daca exista duplicate intr-un array primit ca parametru (true/false)
function hasDuplicates(arr) {
let value = [];
for (let i = 0; i < arr.length; ++i) {
    let x = arr[i];
     if (value.indexOf(x) !== -1) {
        return true;
    }
    value.push(x);
 }
 return false;
}

//===============================================================================================================================================
//O functie "produsPozitive" care primeste un array si returneaza produsul numerelor pozitive intr-un array primit ca parametru.
function produsPozitive (arr) {
let produs = 1;
for (let i=0; i<arr.length; i++) {
    if (arr[i]>0) {
        produs*= arr[i]
    }
} return produs
}

console.log(produsPozitive([-1,5,-6,8]))

//===============================================================================================================================================
//O functie "palindrom" care primeste un string si returneaza daca este palindrom (inversul == originalul, ex: "1234321", "55", "787") (true/false)

function palindrom(str) {
let invers='';
for( let i=str.length-1; i>=0; i--){
invers+=str[i]
} 

return str === invers;
}