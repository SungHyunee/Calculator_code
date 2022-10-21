// display를 가지고 있는 dom요소에 접근하기.
let display = document.getElementById('display');
//display값을 저장할 array[];
let resultingList=[];
//연산자 종류를 저장할 array(상수)
const operatorList=["+","-","*","/"];
//연산자 임시저장 리스트 생성
let operators=[];


// 덧셈함수에 대한 것.
function plus(number1, number2){
    return number1 + number2;
}

//  뺄셈함수에 대한 것.
function minus(number1, number2){
    return number1 - number2;
}

//  곱셈함수에 대한 것.
function multiply(number1, number2){
    return number1 * number2;
}

// 나눗셈함수에 대한 것.
function divide(number1, number2){
    if(number2!=0){
        return number1/number2;
    }
    else{
        console.log("0으로 나눌수 없습니다.");
    }
}

// CE(Clear)입력에 대한 함수.
function inputClear(){
    let display = document.getElementById("display");
    display.innerHTML="";
    operators=[];
}

// ←(backspace)입력에 대한 함수.
function inputBackspace(){
    let display = document.getElementById("display");
    display.innerText = display.innerText.substring(0,display.innerText.length-2);
}

// .(Dot)입력에 대한 함수.
function inputDot(){
    let display = document.getElementById("display");
}
// 곱셈과 나눗셈먼저 가능하게할 함수추가.
function mulDiv(numberArray,operatorArray){
    let location;
    while(true){
        let mulLoc=operatorArray.indexOf("*");
        let divLoc=operatorArray.indexOf("/");

        if(mulLoc==-1 && divLoc==-1){
            break;
        } else if(mulLoc==-1 && divLoc!=-1){
            location=divLoc;
        } else if(mulLoc!=-1 && divLoc==-1){
            location=mulLoc;
        } else if(mulLoc!=-1 && divLoc!=-1){
            if(mulLoc>divLoc){
                location=divLoc;
            } else{
                location=mulLoc;
            }
        }

        let result;
        if(operatorArray[location]=="*"){
            result=multiply(parseFloat(numberArray[location]),parseFloat(numberArray[location+1]));
        } else if(operatorArray[location]=="/" && parseFloat(numberArray[location+1])!=0){
            result=divide(parseFloat(numberArray[location]),parseFloat(numberArray[location+1]));
        }
        numberArray.splice(location,2,result);
        operatorArray.splice(location,1);
    }
}
// plus와 minus 함수를 실행
function plusMinus(numberArray,operatorArray){
    while(true){
        if(numberArray.length==1){
            break;
        }

        let result;
        if(operatorArray[0]=="+"){
            result=plus(parseFloat(numberArray[0]),parseFloat(numberArray[1]));
        } else if(operatorArray[0]=="-"){
            result=minus(parseFloat(numberArray[0]),parseFloat(numberArray[1]));
        }
        numberArray.splice(0,2,result);
        operatorArray.splice(0,1);
    }
}
// Equal(=)클릭시 발생할 함수
function inputEqual(){
    let display = document.getElementById("display");
    let formula=display.innerHTML;
    // 연산자를 스플릿해서 쪼개기
    let numbers=formula.split(/\+|\-|\*|\//);
    mulDiv(numbers,operators);
    console.log(numbers,operators);
    plusMinus(numbers,operators);
    console.log(numbers,operators);
    operators=[];
    display.innerHTML=numbers[0];
}


//모든 버튼에서 버튼 클릭시 발생할 이벤트
function clickEvent(){
    switch(this.className){
        // equal클래스이면 계산할 수 있는 함수 적용
            case "result":
                inputEqual();
                break;
        // Clear클래스이면 inputClear를 실행
            case "clear":
                inputClear();
                break;
        // dot클래스이면 inputDot를 실행
            case "dot":
                inputDot();
                break;
        // backspace클래스이면 inputBackspace를 실행
            case "backspace":
                inputBackspace();
                break;
    }
}

function setEvents(){
    //버튼 요소를 모두 불러옴
    let elementList=document.querySelectorAll("button")

    //모든 버튼에 onclick 이벤트로 clickEvent를 할당
    for(let i=0; i<elementList.length; i++){
        elementList[i].addEventListener("click",clickEvent);
    }
}

// display에 버튼입력 함수
function inputCommand(){    
    let display = document.getElementById('display');

    if(this.innerHTML!="="){
        display.innerHTML+=this.innerHTML;
    }

    if(operatorList.includes(this.innerHTML)){
        operators.push(this.innerHTML);
    }
}

// 이벤트를 세팅하고 모든 버튼에 대해서 click 이벤트를 할당.
function setFunctions(){
    let buttons=document.querySelectorAll("button");
    //console.log(buttons);
    for(let i=0; i<buttons.length; i++){
        //console.log(buttons[i]);
        buttons[i].addEventListener("click",inputCommand);
    }
    console.log("setfuntions");
}

setFunctions();
setEvents();