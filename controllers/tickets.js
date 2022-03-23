const methodOverride = require('method-override');
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

function newTicket(req, res){
    res.render('tickets/new', {
        title: 'New Ticket',
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