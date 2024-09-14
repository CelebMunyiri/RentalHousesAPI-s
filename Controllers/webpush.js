const webpush = require("web-push");
const Subscription = require("../Models/subscription")
const Notification = require("../Models/notification")

webpush.setVapidDetails(
    `mailto:${process.env.EMAIL}`,
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
    
     res.status(200).json({success:true, message:"Device registered as success"});
    } catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server error"});
    }
}

const sendNotification = async (userId, title, body) => {
  try {
    // Fetch user subscriptions
    const userSubscriptions = await Subscription.find({ userId });

    if (userSubscriptions.length === 0) {
      throw new Error('No subscriptions found for the user.');
    }

    // Prepare the notification payload
    const payload = JSON.stringify({ title, body });

    // Optionally, create a new Notification entry in your database
    const newNotification = new Notification({
      userId,
      title,
      body,
      subscription: userSubscriptions[0]._id
 // Saving only the first subscription for record-keeping
    });
    await newNotification.save();

    // Send notifications to all user subscriptions
    userSubscriptions.forEach((subscription) => {
      webpush.sendNotification(subscription.subscription, payload).catch((error) => {
        console.error('Error sending notification', error);
      });
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send notifications:', error.message);
    return { success: false, message: error.message };
  }
};
  module.exports = {subscribe,sendNotification}