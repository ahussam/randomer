var xArr = []; // X's array
var yArr = []; // Y's array
var limit = 500; // Entropy limit 


function show(params) {
    //Show textbox to get the text length 
    document.getElementById('len').style.display = 'block';
}
function hide(params) {
    //Hide the text length input 
    document.getElementById('len').style.display = 'none';
}

document.onmousemove = function (e) {
    // Get X.Y position

    var coordinateX = e.screenX;
    var coordinateY = e.screenY;

    // Check if we need more entropy entries 

    if (xArr.length < limit) {
        entropyCollector(coordinateX, coordinateY);
    }

};


function generateRandom() {

    var type;
    var len = parseInt(document.getElementById("len").value) || 0;
    var radioSelect = document.getElementsByClassName("radio-inline");

    // Check type(number, image, text) based on radio select 

    for (let i = 0; i < radioSelect.length; i++) {
        if (radioSelect[i].firstElementChild.checked) {
            type = i;
        }
    }


    // Check if text selected but set length to zero 

    if (type === 2 && len === 0 || len === undefined) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Zero Length text!',
        })
        disable();
        free();


    } else {
        // Create Random object 
        var rand = new Random(xArr, yArr, type, limit);
        var newRandomNumber = rand.generate(len);

        switch (type) {
            case 0:
                Swal.fire('Your random number is: ' + newRandomNumber);
                break;
            case 1:
                Swal.fire({
                    title: 'Your random image!',
                    imageUrl: newRandomNumber,
                    imageWidth: 300,
                    imageHeight: 300,
                    imageAlt: 'Custom image',
                });
                break;
            case 2:
                Swal.fire('Your random text is: ' + newRandomNumber);
                break;

            default:
                break;
        }
        free();
        disable();
    }

}

function entropyCollector(x, y) {
    // Push the X position to xArr and Y to yArr
    xArr.push(x);
    yArr.push(y);
    if (xArr.length === limit) {
        enable();
    }
}

function enable() {

    document.getElementById("generate").disabled = false;
    document.getElementById("info").innerHTML = `<div class="alert alert-success text-center" role="alert" id="info">You can generate your random number/image/text now!</div>`;



}
function disable() {
    document.getElementById("generate").disabled = true;
    document.getElementById("info").innerHTML = ` <div class="alert alert-primary text-center" role="alert">Move the mouse until enough entropy gets collected.</div>`;

}


function free() {

    xArr = [];
    yArr = [];

}
