let throwNum = 4;
let answer = [0,1,2,3,4,5,6,7,8,9].sort(function(a, b){return 0.5 - Math.random()}).slice(0,throwNum)
let outCount = 0;
let inning = 0;
let resultText = document.querySelector(".result");


let counterMaker = () => {
    let k = [];
    for (let i = 0; i < answer.length; i++){
        k[i] = {ballCount:0, strikeCount:0}
    }
    return k;
}


let ballCounter = (q,a,c) => {
    for (let i = 0; i < a.length; i++){
        for (let j = 0; j < q.length; j++){
            a[i] === q[j] ? c[i].ballCount++ : ""
        }
    }
}




let strikeCounter = (q,a,c) => {
    for (let i = 0; i < a.length; i++){
            a[i] === q[i] ? c[i].strikeCount++ : ""
        }
}




let count = (c) => {
    let ball = 0;
    let strike = 0;
    for (let i = 0; i < c.length; i++){
        ball += c[i].ballCount
        ball -= c[i].strikeCount
    }    
    for (let j = 0; j < c.length; j++){
        strike += c[j].strikeCount
    }
    (ball === 0 && strike === 0) ? outCount++ : ""
    return [ball, strike]
}




let counter = (q, a) => {
    let c = counterMaker()
    console.log('counter_board', c)
    console.log('q',q,'a',a)
    ballCounter(q,a,c)
    strikeCounter(q,a,c)
    let result = count(c)
    console.log('counter_board', c, "result", result)
    inning++
    return result
}


document.querySelector(".try").addEventListener("click", function () {

    //-----------------------set_variable-------------------------------

    let rightInput = 0;
    let q2 = document.querySelector(".input").value.toString().split("")

    //------------------------rightInput-----------------------------------

    for (let t1 = 0; t1 < q2.length; t1++){
        for(let t2 = 0; t2 < q2.length; t2++){
            (q2[t1] === q2[t2] && t1 !== t2) ? rightInput++ : ""
        }
    }
    // console.log(rightInput)
    q2.length === answer.length ? "" : rightInput++
    // console.log(rightInput)
    if (rightInput > 0) {
        return alert("Please input right number")
    }

    //-----------------------counter-----------------------------------
   
    let q3 = [];
    for (let i = 0; i < q2.length; i++) {
        q3.push(parseInt(q2[i]))
    }
    let result = counter(q3, answer)
    console.log("inning", inning)

    //------------------------record-----------------------------------
    let recorder = document.querySelector(".record");
    recorder.appendChild(document.createElement("p"));
    recorder.lastChild.textContent = 
       "Inning: " + inning.toString() 
     + " / Ball Count: " + result[0].toString() 
     + " / Strike Count: " + result[1].toString() 
     + " / Out Count: " + outCount.toString()

     //------------------------judge-------------------------------
     if(outCount === 3) {
        resultText.textContent = "Fail, Three Out"
        document.querySelector(".try").classList.add("unshow")   
        return ""
     }
     if(inning === 9 && result[1] < 3) {
        resultText.textContent = "Fail, Over Nine Inning"
        document.querySelector(".try").classList.add("unshow")
        return ""
    }
    if(result[1] > q3.length-1) {
        resultText.textContent = q2.join("") + ", You Win"
        document.querySelector(".try").classList.add("unshow")
        return ""
    }
})




