const methodOverride = require('method-override');
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

function newTicket(req, res){
    console.log(req.params.id);
    res.render('tickets/new', {
        flight: req.params.id
    });
};


function create(req, res){
    req.body.flight = req.params.id;
    const ticket = new Ticket(req.body);
    ticket.save(function(err){
        res.redirect(`/flights/${req.params.id}`)
    })
}

module.exports = {
    new: newTicket,
    create
};