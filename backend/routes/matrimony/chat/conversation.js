import express from 'express'
import ConversationMembers from '../../../models/conversation.js'
import mongoose from 'mongoose';
import MatrimonyProfileconnection from '../../../models/ConnectedProfile.js';
import { verifyProfile } from '../../../utils/verifyToken.js';
import Profile from '../../../models/MatrimonyProfile.js';

const router = express.Router()


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

router.get('/getConversation/:id', verifyProfile, async (req, res) => {
    const otherUserId = req.query.friendId; 
    try {
        const conversation = await ConversationMembers.findOne({
            members: { $in: [req.params.id, otherUserId] }
        });
        console.log(conversation);
        
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/getContactedProfile/:id', async (req, res) => {
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

        const newestProfile = contactedProfiles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json(newestProfile);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/recentConversation/:id', verifyProfile, async (req, res) => {
    console.log(req.params.id);
    
    try {
        // Fetch all conversations where the user is a member
        const conversations = await ConversationMembers.find({
            members: { $in: [req.params.id] }
        });

        // Fetch profiles corresponding to the conversations
        const contactedProfiles = await Promise.all(
            conversations.map(async (conversation) => {
                const otherProfileId = conversation.members.filter((member) => member != req.params.id);
                const profile = await Profile.findById(otherProfileId[0]);

                // Attach the conversation ID to the profile
                return {
                    ...profile._doc, // spread profile fields
                    conversationId: conversation._id // attach conversation ID
                };
            })
        );

        // Sort profiles by creation date (newest first) and take the first 10
        const newestProfiles = contactedProfiles
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        res.status(200).json(newestProfiles);
    } catch (error) {
        res.status(500).json(error);
    }
});


export default router