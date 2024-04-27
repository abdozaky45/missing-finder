import {Schema, model, Types} from 'mongoose';
const volunteerSchema = new Schema (
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    labelFaceModel: {
      type: String,
      min: 3,
      max: 100,
      required:true
    },
    fullName: {
      type: String,
      required: true,
      min: 3,
      max: 100
    },
    missingPersonInformation: {
      type: String,
      required: true,
      enum: [
        'The Person Himself Confirmed His Name',
        'Not sure of his/her identity'
      ],
    },
    images: [{
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true }
    }],
    foundPersonGender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    healthStatus: {
      type: String,
      enum: ['healthy', 'sick', 'SpecialNeeds'],
      required: true,
    },
    dateOfLoss: {     
      type: Date,
      required: true
    },
    age: {type: Number, min: 1, max: 100},
    city: {type: String, required: true},
    country: {type: String, required: true},
    address: {type: String, required: true},
    absenceReport: {
      type: String,
      enum: ["Yes", "No", "No clue"],
      default: "No clue"
    },
    // Data of the reporting person
    phone: {type: String, min: 0, max: 11, required: true},
  },
  {timestamps: true,strictQuery:true}
);
volunteerSchema.query.paginate = function (page) {
  // this >>>>> query
  // return query
  page = !page || page < 1 || isNaN (page) ? 1 : page;
  const limit = 20;
  const skip = limit * (page - 1);
  return this.skip (skip).limit (limit);
};
export const volunteerModel = model ('Guset', volunteerSchema);
