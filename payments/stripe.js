const dotenv=require('dotenv');
dotenv.config();
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);

const chargeClient=async(req,res)=>{
    const { amount, token } = req.body;
    try{
        
        const charge = await stripe.charges.create({
            amount, 
            currency: 'usd',
            source: token.id, 
            description: 'Charge for test@example.com',
          });
          res.status(200).json(charge);
    } catch(err){
        console.error('Error processing payment:', err);
    let message = 'An error occurred while processing your payment.';

    if (err.type === 'StripeCardError') {
      message = err.message;
    }
}
}

module.exports={chargeClient};



