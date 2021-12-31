const mongoose = require('mongoose');
const EntradaSaidaSchema = new mongoose.Schema({
    Descricao: {
        type: String,
        required: true,
    },
    Valor: {
        type: String,
        required: true,
    },
    Mes: {
        type: String,
        required: true,
    },
    Ano: {
        type: String,
        required: true,
    },
    Tipo: {
        type: String,
        enum: ['Entrada', 'Saída'],
        required: true,
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

mongoose.model('EntradaSaida', EntradaSaidaSchema);