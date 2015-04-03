(function () {
    'use strict';
    
    function genpoints() {
        return [1, 2 * Math.random() - 1, 2 * Math.random() - 1];  //generates a point between -1 and 1, returns [x0 = 1, x1, x2]
    }

    function linegen() {
        var points = [genpoints(), genpoints()],  //Makes a list of two points
            w = [];
        
        w[1] = points[0][2] - points[1][2];   //weight of x1
        w[2] = -(points[0][1] - points[1][1]);   //weight of x2
        w[0] = -w[2] * points[1][1] - w[1] * points[1][2];
    
        return w; //returns the line in standard form [w0, w1, w2] w0 * x0 + w1 * x1 + w2 * x2 = 0
    }

    function check(line, point) {
        return ((line[0] * point[0] + line[1] * point[1] + line[2] * point[2]) > 0) ? 1 : -1; // checks if a point is above or below a line
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
        
        return [data, f];  //returns data
    }
    
    function adjusted(w, p) {
        var learnrate = 0.1,
            len = w.length;
        
        for (var i = 0; i < len; i += 1) {
            w[i] = w[i] + p.result * learnrate * p.point[i];
        }
        
        return w;
    }
    
    function pla() {
        var h = [0, 0, 0],
            datastore = createdata(10),
            data = datastore[0],
            target = datastore[1],
            flag = 0,
            done = false,
            datapoint;
        
        while (!done) {
            datapoint = data.pop();
            
            if (check(h, datapoint.point) !== datapoint.result) {
                flag = 0;
                data.splice(Math.floor((data.length * Math.random())), 0, datapoint);
                h = adjusted(h, datapoint)
            } else {
                flag = flag + 1;
                data.unshift(datapoint);
                if (flag > 2 * data.length) {
                    done = true;
                }
            }
        }
        return [h, target];
    }
    
    function test() {
        var results = pla(),
            diff = [];
        
        diff.push((results[0][0]-results[1][0])/Math.abs(results[0][0]+results[1][0]));
        diff.push((results[0][1]-results[1][1])/Math.abs(results[0][1]+results[1][1]));
        diff.push((results[0][2]-results[1][2])/Math.abs(results[0][2]+results[1][2]));
            
        return diff;
    }    
    
    console.log(test());
}());