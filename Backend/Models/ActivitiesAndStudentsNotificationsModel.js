import mongoose from 'mongoose';

const ActivitiesAndStudentsNotificationsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: false
    }
},{timestamps:true})

const ActivitiesAndStudentsNotificationsModel = mongoose.model('ActivitiesAndStudentsNotifications',ActivitiesAndStudentsNotificationsSchema);



export default ActivitiesAndStudentsNotificationsModel;