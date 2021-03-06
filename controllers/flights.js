const methodOverride = require('method-override');
const Flight = require('../models/flight');
const ticket = require('../models/ticket');

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
        ticket.find({flight: flight._id}, function(err, tickets){
            if(flight.destinations.length > 1){
                flight.destinations.sort(function(a,b){
                    if(a.arrival > b.arrival){
                        return 1
                    }
                    if(a.arrival < b.arrival){
                        return -1
                    }
                    return 0
                })
            }
            res.render('flights/show', {title:'Flight Detail', flight, tickets});
        })
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

function update(req,res){
    Flight.findById(req.params.id, function(err,flight){
        flight.destinations.push(req.body);
        flight.save(function(err){
            res.redirect(`/flights/${flight.id}`)
        })
    })
};

module.exports = {
    index,
    show,
    new: newFlight,
    create,
    update
}