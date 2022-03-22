const methodOverride = require('method-override');
const Flight = require('../models/flight');

function index(req, res){
    Flight.find({}, function(err, flights){
        flights.sort(function(a,b){
            if(a.departs > b.departs){
                return 1
            }
            if(a.departs < b.departs){
                return -1
            }
            return 0
        })
        res.render('flights/index', {title: 'All Flights', flights});
    });
};

function show(req, res){
    Flight.findById(req.params.id, function(err, flight){
        res.render('flights/show', {title:'Flight Detail', flight});
    })
}

function newFlight (req, res){
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', {title: 'Add Flight', departsDate});
};

function create (req,res){
    const flight = new Flight(req.body);
    flight.save(function(err){
        if(err) return res.redirect('/flights/new');
        res.redirect('/flights/');
    });
};

module.exports = {
    index,
    show,
    new: newFlight,
    create
}