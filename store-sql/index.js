
const { insertInto } = require('./insert')
const { deleteOne, deleteAll } = require('./delete')
const { updateOne } = require('./update')
const { selectAll } = require('./select')


module.exports = {
    // Insert
    insertInto,
    // Delete
    deleteOne, deleteAll,
    // Update
    updateOne,
    // Select
    selectAll
}
