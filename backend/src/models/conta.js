const mongoose = require('mongoose');
const ContaSchema = new mongoose.Schema({
    Descricao: {
        type: String,
        required: true,
    },
    Valor: {
        type: String,
        required: true,
    },
    DataVencimento: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ["Pago", "Pendente"],
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        allowNull: false,
        type: Date,
    },
    updatedAt: {
        allowNull: false,
        type: Date,
    },
});

mongoose.model('Conta', ContaSchema);