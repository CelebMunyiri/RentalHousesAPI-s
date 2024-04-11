const dotenv=require('dotenv');
dotenv.config();
const payment=require('../Models/payment.model');
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
          
          res.status(200).json({message:"Payment Succesful",charge});
    } catch(err){
        console.error('Error processing payment:', err);
    
    if (err.type === 'StripeCardError') {
      message = err.message;
    }
    res.status(500).json({message:"Failed to complete  payment"});
}
}

module.exports={chargeClient};



