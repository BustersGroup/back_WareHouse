    import { Schema, model } from 'mongoose'


    const reportSchema = new mongoose.Schema({
        type: {
        type: String,
        enum: ['inventory', 'movement', 'statistics'],
        required: true,
        index: true
        },
        title: {
        type: String,
        required: true
        },
        generatedAt: {
        type: Date,
        default: Date.now,
        immutable: true
        },
        period: {
        start: Date,
        end: Date
        },
        data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
        },
        generatedBy: {
        ref: 'User',
        required: true
        },
        format: {
        type: String,
        enum: ['json', 'pdf', 'csv', 'xlsx'],
        default: 'json'
        },
        status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed'
        }
    }, {
        timestamps: true,
        versionKey: false 
    })

    export default model('Reports', reportSchema);
