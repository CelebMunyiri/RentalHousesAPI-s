const webpush = require("web-push");
const Subscription = require("../Models/subscription")

webpush.setVapidDetails(
    `mailto:${process.env.My_Email}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  


const subscribe = async(req,res)=>{
    try{
     const {userId, subscription} = req.body;
     let existingSubscription = await Subscription.findOne({ userId, 'subscription.endpoint': subscription.endpoint });
     if (!existingSubscription) {
       const newSubscription = new Subscription({ userId, subscription });
       await newSubscription.save();
     }
     res.status(200).json({sucess:true, message:"Device registered as success"});
    } catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server error"});
    }
}

const sendNotification = async (req, res) => {
    let { userId, title, body = {} } = req.body;
    // console.log({ userId, title, body })
  
    try {
      const userSubscriptions = await Subscription.find({ userId });
      // console.log(userSubscriptions);
      const payload = JSON.stringify({ title, body, });
  
      userSubscriptions.forEach(subscription => {
  
      
        const newNotification = Notification.create({userId,title,body,subscription:subscription._id});
         newNotification.save();
        webpush.sendNotification(subscription.subscription, payload).catch(error => console.error('Error sending notification', error));
      });
  
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send notifications', error: error.message });
    }
  };