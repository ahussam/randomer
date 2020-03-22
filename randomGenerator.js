class Random {


    constructor(xArr, yArr, type, limit) {
        this.xArr = xArr;
        this.yArr = yArr;
        this.type = type;
        this.limit = limit;
    }



    generateNumber() {
        var seed = this.xArr[97] * this.xArr[180] + this.yArr[56] * this.yArr[178];
        seed = seed >>> 2;
        var i = 0;
        var iterate = this.xArr.length;
        var random = 0.1;

        // seed should not be larger than limit.

        while (seed > this.limit) {
            seed = parseInt(seed / 10);
        }

        // Now we have a seed to limit our loop. It is just for hardening the function. 
        while (i < iterate / xArr[seed]) {

            if (xArr[i] !== 0 && yArr[i] !== 0 && seed !== 0) {
                random *= (this.xArr[i] * this.yArr[i]) / 10 /
                    ((seed * this.xArr[i]) / this.yArr[i]);
                //   console.log(random);
            }
            i++;
        }

        // Random must be less than 1 
        while (random > 1) {
            random /= 10;
        }

        //console.log("This is your number:" + random);
        return random;
    }




    generateText(text_length) {
        var seed = this.generateNumber();
        var inc = xArr[367] + yArr[253];
        inc = parseInt(inc);
        // inc should be less than array's limit

        while (inc > this.limit) {
            inc /= 10;
        }
        inc = parseInt(inc);
        var string = "";
        const charsSet = "'`~!@#$%^&*()_+-={}[]:;\'<>?,./|\\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'";
        while (text_length--) {

            seed = seed * this.xArr[inc++] + this.yArr[inc++];
            while (seed > 1) {
                seed = seed * 0.1;
            }


            string += charsSet.substr(Math.floor((seed * charsSet.length) + 1), 1);
        }
        return string;

    }



    generateImage() {


        // Create a canvas 
        var pointSize = 2;
        var canvas = document.createElement("canvas");
        canvas.backgroundColor = 'blue';
        var ctx = canvas.getContext("2d");

        // Random color RGB format 
        var c = 0;
        for (let i = 100; i < 300; i++) {
            c += this.xArr[i] + this.yArr[i];
        }
        // C must be less than 1 
        while (c > 1) {
            c *= 0.1;
        }

        var randomColor = '#' + Math.floor(c * 16777215).toString(16); // 16777215 is FFFFFF in hex 
        console.log(randomColor);
        ctx.fillStyle = randomColor;

        // Our image is 300 * 300 

        for (let i = 0; i < 300; i++) {
            for (let j = 0; j < 300; j++) {

                //  No more than 300 pixel 
                while (this.xArr[i] > 300) {
                    this.xArr[i] -= 300;
                }
                while (this.yArr[i] > 300) {
                    this.yArr[i] -= 300;
                }

                ctx.beginPath();
                // Put the dots inside the canvas
                ctx.arc(this.xArr[i], this.yArr[i], pointSize, 0, Math.PI * 2, true);
                ctx.fill();
            }
        }


        var randomdataURL = canvas.toDataURL();


        return (randomdataURL);

    }



    generate(length) {

        var length = length || 6; // Default text length 

        if (this.limit < 500) {
            throw console.error("More entropy is needed");
            return;
        }
        switch (this.type) {
            case 0:
                return this.generateNumber();
                break;
            case 1:
                return this.generateImage();
                break;
            case 2:
                return this.generateText(length);
                break;
            default:
                alert("Unknown type!");
                break;
        }
    }
}
