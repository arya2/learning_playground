(function () {
    'use strict';

    function castit(num1) {
        return num1 ? 1 : -1;
    }
    
    function genpoints() {
        return [1, 2 * Math.random() - 1, 2 * Math.random() - 1];  //generates a point between -1 and 1, returns [x0 = 1, x1, x2]
    }

    function linegen() {
        var points = [genpoints(), genpoints()],  //Makes a list of two points
            w = [];
        
        w[1] = points[0][2] - points[1][2];   //weight of x1
        w[2] = - (points[0][1] - points[1][1]);   //weight of x2
        w[0] = - w[2] * points[1][1] - w[1] * points[1][2];
    
        return w; //returns the line in standard form [a,b,c] ay - bx + c = 0
    }

    function check(line, point) {
        return (line[0] * point[0] + line[1] * point[1] + line[2] * point[2]) > 0; // checks if a point is above or below a line
    }

    function createdata(N) {
        var f = linegen(),   //generates line weights
            data = [],   //initializes list of data points
            point,
            i;
        for (i = 0; i < N; i = i + 1) {
            point = genpoints();  //assigns a random point
            data.push({         //adds datapoint to data
                "point": point, //coordinates of the point
                "result": check(f, point)  //true or false attribute dictates whether it is above or below the line
            });
        }
        
        console.log("f: " + f)
        return data;  //returns data
    }

    function pla() {
        var h = [0, 0, 0],
            data = createdata(10),
            counter,
            datapoint;

        while (data.length > 0 || ) {
            datapoint = data.pop();
            
            if (check(h, datapoint.point) !== datapoint.result) {
                data.splice(Math.floor((data.length * Math.random())), 0, datapoint);
                for (counter = 0; counter < 3; counter = counter + 1) {
                    h[counter] = h[counter] + 0.01 * castit(datapoint.result);
                    console.log(0.01 * castit(datapoint.result));
                }
            }
        }
        
        return h;
    }
    
    function test() {
        var isittrue = {"true": 0, "false": 0},
            counter;
        for (counter = 0; counter < 100; counter = counter + 1) {
            if (check(linegen(), genpoints())) {
                isittrue.true = isittrue.true + 1
            }else{
                isittrue.false = isittrue.false + 1
            }
        }
        return isittrue
    }
    
    console.log(pla());
}());