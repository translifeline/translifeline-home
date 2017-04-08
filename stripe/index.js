'use strict';

class Stripe {
  constructor(app) {
    app.post('/stripe/charge', (req, res) => {
      let charge = req.body.data.object;
      let db = app.get('database');
      db.collection('charges').update(
        { stripe_id: charge.id },
        {
          stripe_id: charge.id,
          created: charge.created,
          amount: charge.amount - charge.amount_refunded
        },
        {upsert: true}
      ).then((result) => {
        res.sendStatus(200);
      });
    })
  }
}

module.exports = function(app) {
  new Stripe(app);
};
