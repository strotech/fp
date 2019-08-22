let mongoose=require('mongoose');

//Details Schema
let detailsSchema=mongoose.Schema({
    slNo:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    amenityReq:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
}, { collection: 'location_details' })

let activities=module.exports=mongoose.model('detailsModel',detailsSchema);