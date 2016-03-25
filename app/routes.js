var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all food in JSON format
    });
}
;

function getTotal(res)
{

        Food.find(function (err, foods)
        {
            
            if (err) {
                
                res.send(err);
            }

            var sum = 0.0;
            for(var x in foods)
                sum+=parseFloat(foods[x].price);

            sum += sum * 7.5 / 100;
 
            res.json(sum);

        });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    //total price of all food item + 7.5% tax
    app.get('/api/total', function (req, res) {

   getTotal(res);

    });

    // get all food
    app.get('/api/food', function (req, res) {
        // use mongoose to get all food in the database
        getFoods(res);
    });

    // create food and send back all food after creation
    app.post('/api/food', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            text: req.body.text,
            price: req.body.number,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the food after you create another
            getFoods(res);
        });

    });

    // delete a food
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });


    app.delete('/api/deleteALL', function(req, res) {
        Food.remove({
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};