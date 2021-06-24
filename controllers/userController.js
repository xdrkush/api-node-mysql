/*
 * Import Module
 ****************/

/*
 * Controller
 *************/

// Method Get
exports.get = async (req, res) => {
    res.json({
        status: 200,
        listUser: await query(`SELECT * FROM users`),
        message: "users lists retrieved successfully"
    })
}

// Method Post
exports.post = async (req, res) => {

    // SQL pour creer un users
    let sql = `INSERT INTO users (name,email,mobile) values(?)`;
    const values = [req.body.name, req.body.email, req.body.mobile];
    await query(sql, [values]);

    res.json({
        status: 200,
        listUser: await query(`SELECT * FROM users`),
        message: "Add Users successfully"
    })

}

// Method Edit One User
exports.editOne = async (req, res) => {
    // SQL pour editer un users
    let sql = `UPDATE users 
               SET name   = '${req.body.name}',
                   mobile = '${req.body.mobile}',
                   email  = '${req.body.email}'
               WHERE  id  = '${req.params.id}';`;

    await query(sql);

    res.json({
        status: 200,
        listUser: await query(`SELECT * FROM users`),
        message: "Update Users successfully"
    })

}

// Method Delete One
exports.deleteOne = async (req, res) => {
    // SQL pour delete un users à partir de son id
    let sql = `DELETE FROM users  WHERE id = ?`;
    let values = [req.params.id];

    await query(sql, [values])

    res.json({
        status: 200,
        listUser: await query(`SELECT * FROM users`),
        message: "Delete Users successfully"
    })
}

// Method Delete All
exports.deleteAll = async (req, res) => {
    // SQL pour delete tout les users
    let sql = `DELETE FROM users`;
    await db.query(sql)

    res.json({
        status: 200,
        listUser: await query(`SELECT * FROM users`),
        message: "Delete All Users successfully"
    })
}