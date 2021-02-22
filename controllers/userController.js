/*
 * Import Module
 ****************/

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {
        // SQL récupération de tout les users
        let sql = `SELECT * FROM users`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listUser: data,
                message: "users lists retrieved successfully"
            })
        })
    },
    // Method Post
    post: async (req, res) => {
        // SQL pour creer un users
        let sql = `INSERT INTO users (name,email,mobile) values(?)`;
        let values = [
            req.body.name,
            req.body.email,
            req.body.mobile
        ];
        db.query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // SQL récupération de tout les users
            let sql = `SELECT * FROM users`;
            db.query(sql, (error, dataRes, fields) => {
                if (error) throw error;
                res.json({
                    status: 200,
                    listUser: dataRes,
                    message: "Add Users successfully"
                })
            })
        })
    },
    // Method Edit One User
    editOne: (req, res) => {
        // SQL pour editer un users
        let sql = `UPDATE users 
                   SET name = '${req.body.name}',
                       mobile = '${req.body.mobile}',
                       email = '${req.body.email}'
                   WHERE id = '${req.params.id}';`

        db.query(sql, function (err, edit, fields) {
            if (err) throw err;
            // SQL récupération de tout les users
            let sql = `SELECT * FROM users`;
            console.log(edit)
            db.query(sql, (error, data, fields) => {
                if (error) throw error;
                res.json({
                    status: 200,
                    listUser: data,
                    message: "Update Users successfully"
                })
            })
        })
    },
    // Method Delete One
    deleteOne: (req, res) => {
        // SQL pour delete un users à partir de son id
        let sql = `DELETE FROM users  WHERE id = ?`;
        let values = [
            req.params.id
        ];
        db.query(sql, [values], function (err, del, fields) {
            if (err) throw err;
            // SQL récupération de tout les users
            let sql = `SELECT * FROM users`;
            db.query(sql, (error, data, fields) => {
                if (error) throw error;
                res.json({
                    status: 200,
                    listUser: data,
                    message: "Delete Users successfully"
                })
            })
        })
    },
    // Method Delete All
    deleteAll: (req, res) => {
        // SQL pour delete tout les users
        let sql = `DELETE FROM users`;
        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            // SQL récupération de tout les users
            let sql = `SELECT * FROM users`;
            db.query(sql, (error, data, fields) => {
                if (error) throw error;
                res.json({
                    status: 200,
                    dbArticle: data,
                    message: "Delete All Users successfully"
                })
            })
        })
    }
}