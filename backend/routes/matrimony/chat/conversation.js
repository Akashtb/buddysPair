import express from 'express'
import ConversationMembers from '../../../models/conversation.js'
import mongoose from 'mongoose';
import MatrimonyProfileconnection from '../../../models/ConnectedProfile.js';
import { verifyProfile } from '../../../utils/verifyToken.js';
import Profile from '../../../models/MatrimonyProfile.js';

const router = express.Router()

//new coversation
// router.post('/create-conversations/:profileId', async (req, res) => {
//     const { profileId } = req.params;
  
//     if (!mongoose.Types.ObjectId.isValid(profileId)) {
//       return res.status(400).json({ message: 'Invalid profile ID' });
//     }
  
//     try {
   
//       const connections = await MatrimonyProfileconnection.find({
//         $or: [
//           { fromUID: profileId, status: 'accepted' },
//           { toUID: profileId, status: 'accepted' }
//         ]
//       });
  
//       if (connections.length === 0) {
//         return res.status(200).json({ message: 'No accepted connections found' });
//       }
  
//       const conversationPromises = connections.map(async connection => {
//         const memberIds = [connection.fromUID, connection.toUID];
  
        
//         let conversation = await ConversationMembers.findOne({
//           members: { $all: memberIds }
//         });
  
     
//         if (!conversation) {
//           conversation = new ConversationMembers({
//             members: memberIds
//           });
//           await conversation.save();
//         }
  
//         return conversation;
//       });
  
//       // Wait for all promises to resolve
//       const conversations = await Promise.all(conversationPromises);
  
//       res.status(200).json(conversations);
//     } catch (error) {
//       console.error('Error creating conversations:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });


router.get('/getCurrentUserConversation/:id',verifyProfile,async(req,res)=>{
    console.log(req.params.id);
    
    try{
        const conversation = await ConversationMembers.find({
            members:{$in:[req.params.id]}
        })
        res.status(200).json(conversation)
    }catch(error){
        res.status(500).json(error);
    }
})

router.get('/getContactedProfile/:id',verifyProfile, async (req, res) => {
    const id = req.params.id;
    try {
        const conversations = await ConversationMembers.find({
            members: { $in: [id] },
            isContacted: true
        });

        const contactedProfiles = await Promise.all(
            conversations.map(async (profile) => {
                const otherProfileId = profile.members.filter((member) => member != id);
                return await Profile.findById(otherProfileId[0]);
            })
        );

        res.status(200).json(contactedProfiles);
    } catch (error) {
        res.status(500).json(error);
    }
});


export default router