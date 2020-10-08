console.log("Hello from app.js");

var transaction = {};
var monthKeys = {
    "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July",
    "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"
};

var managePassword = [];

addTransaction = () => {
    let form = document.transaction;

    let type = form.type.value.trim();
    let catagory = form.catagory.value.trim();
    let date = form.date.value.trim();
    let amount = parseInt(form.amount.value);
    let description = form.description.value.trim();


    // console.log(type, catagory, date, amount, typeof(amount), description);

    // if (catagory.length === 0 || catagory === " "){
    //     alert("Plz enter catagory");
    //     form.catagory.focus();
    //     return false;
    // }
    // if (date.length === 0 || date === ""){
    //     alert("Plz enter date");
    //     form.date.focus();
    //     return false;
    // }
    // if (isNaN(amount)){
    //     alert("Plz enter amount");
    //     form.amount.focus();
    //     return false;
    // }
    // if (description.length === 0 || description === ""){
    //     alert("Plz enter description");
    //     form.description.focus();
    //     return false;
    // }



    // date = new Date(date);
    console.log(date);
    day = date.slice(8);
    date = date.slice(0,7);  //"2020-10" ==> "year-month"

    if (date in transaction){

        transaction[date].push({
            day : day + " " + monthKeys[date.slice(5,7)],
            type : type,
            catagory : catagory,
            amount : amount,
            description : description
        });

        transaction[date].sort((a, b) => {
                let keyA = a.date;
                let keyB = b.date;
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
              })
    }
    else{
        transaction[date] = [];
        transaction[date].push({
            day : day + " " + monthKeys[date.slice(5,7)],
            type : type,
            catagory : catagory,
            amount : amount,
            description : description
        });

        transaction[date].sort((a, b) => {
                let keyA = a.date;
                let keyB = b.date;
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
              })
    }

 

    console.log(transaction)

     displayTransaction();

}

displayDate = (x) => {
    // x is like "2020-10"

    

    let month = x.slice(5);

    return monthKeys[month] + " " + x.slice(0,4);

    


}

displayTransaction = () => {
    let keys = Object.keys(transaction);
    keys.sort();
    keys.reverse();
    console.log(keys);
    let div = document.getElementById("display_transaction");
    div.innerHTML = '<h4>Your Transactions</h4><hr>';

    let index = 0;
    keys.forEach(element=>{
        
        let income = 0;
        let expense = 0;
        transaction[element].forEach(element=>{
            if(element.type === 'INCOME')   income += element.amount
            else expense += element.amount
        })

        let net = income - expense
        if (net > 0)    net = "+ " + net.toString();
        
        div.innerHTML += ` <p class="mt-5"><h4><span class="badge bg-secondary p-2" >${displayDate(element)}</span><span class="ml-5 fa fa-circle text-success" style="font-size: 15px"> </span><span class="mx-1" style="font-size: smaller"><span class="ml-2 fa fa-inr"></span> ${income}</span>
        <span class="ml-1 fa fa-circle text-danger" style="font-size: 15px"> </span><span class="mx-1" style="font-size: smaller"><span class="ml-2 fa fa-inr"></span> ${expense}</span>

        <span class="ml-1 fa fa-circle text-info" style="font-size: 15px"> </span><span class="mx-1" style="font-size: smaller"><span class="ml-2 fa fa-inr"></span> ${net}</span>
        </h4></p>`
   
        transaction[element].forEach((element) => {
            if(element.type === 'INCOME'){
               div.innerHTML +=  `<div class="row mt-2 p-2 bg-light shadow" style="border-left: 15px solid #28a745; background-color: white;">
                                <div class="d-inline col-3">${element.type}</div>
                                <div class="d-inline col-3">${element.day}</div>
                                <div class="d-inline col-3">${element.catagory}</div>
                                <div class="d-inline col-3"><span class="ml-2 fa fa-inr"></span> ${element.amount}
                                <button class=" ml-5 btn btn-sm btn-info" data-toggle="collapse"
                                    data-target="#description_${index}"><span class="fa fa-arrow-down"></span></button>
                                </div>
                            </div>
                            <p id="description_${index}" class="mt-2 collapse">Description : ${element.description}</p>
                            `
            }
            else if(element.type === 'EXPENSE'){
                div.innerHTML +=  `<div class="row mt-2 p-2 bg-light shadow" style="border-left: 15px solid #dc3545;">
                                 <div class="d-inline col-3">${element.type}</div>
                                 <div class="d-inline col-3">${element.day}</div>
                                 <div class="d-inline col-3">${element.catagory}</div>
                                 <div class="d-inline col-3"><span class="ml-2 fa fa-inr"></span> ${element.amount}<button class=" ml-5 btn btn-sm btn-info" data-toggle="collapse"
                                 data-target="#description_${index}"><span class="fa fa-arrow-down"></span></button>
                             </div>
                         </div>
                         <p id="description_${index}" class="mt-2 collapse">Description : ${element.description}</p>`
             }

             index += 1;
        })
    })
}


addPassword = () => {
    let form = document.password;

    let org = form.org.value.trim();
    let email = form.email.value.trim();
    let password = form.password.value.trim();

    managePassword.push({
        org : org,
        email : email,
        password : password
    });

    displayPassword();
    console.log(org, email, password);
}

displayPassword = () => {
    let div = document.getElementById("display_password");

    div.innerHTML = `<h4>Your Passwords</h4><hr>`;

    managePassword.forEach((element, index) => {
        let n = element.password.length;
        let p = "";
        for(let i = 0 ; i < n; i++) p += "*";
        div.innerHTML += `
        <div class="row shadow p-2 mt-3 bg-light rounded" style="border: 3px solid #0bc5d5;">
            <div class="col-3 text-left"><span class="fa fa-square mr-1 text-info" style="font-size:13px"> </span>${element.org}</div>
            <div class="col-4 text-left"><span class="fa fa-user mr-1 text-info" style="font-size:17px"> </span>${element.email}</div>
            <div class="col-5 text-left"><p id="hide_password_${index}" class="d-inline">${p}</p><p id="show_password_${index}" class="d-none" style="font-size : 15px;">${element.password}</p> <span class="fa fa-lock ml-3" style="font-size : 22px;" onclick="showPass(this,${index})"> </span> <span class="fa fa-clone ml-2" style="font-size : 20px; cursor : pointer;" data-toggle="tooltip" data-placement="top" title="Copy to Clipboard" onclick="copyPass(${index})"> </span></div>
        </div>`
    })

}


showPass = (element, index) => {
    console.log(element);
    console.log(element.classList)
    console.log("Index ",index, typeof(index));
    
    let hide_pass = document.getElementById("hide_password_" + index);
    let show_pass =  document.getElementById("show_password_"+index);

    if(element.className.includes("fa-lock")){
        hide_pass.classList.add("d-none");
        hide_pass.classList.remove("d-inline");
    
        show_pass.classList.remove("d-none");
        show_pass.classList.add("d-inline");

        element.classList.remove("fa-lock");
        element.classList.add("fa-unlock");
    }
    else{
        hide_pass.classList.add("d-inline");
        hide_pass.classList.remove("d-none");
    
        show_pass.classList.remove("d-inline");
        show_pass.classList.add("d-none");

        element.classList.remove("fa-unlock");
        element.classList.add("fa-lock");
    }
    


}

copyPass = (index) => {
    let copytxt = document.getElementById("show_password_"+index).innerText;
    document.addEventListener('copy', function(e) {
      e.clipboardData.setData('text/plain', copytxt);
      e.preventDefault();
   }, true);

   document.execCommand('copy');  
}