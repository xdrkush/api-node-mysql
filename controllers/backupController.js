/*
 * Import Module
 ****************/
// Import Module
const { spawn } = require('child_process'),
    exec = require('child_process').exec,
    moment = require('moment'),
    path = require('path'),
    fs = require('fs');

require('dotenv').config()

/*
 * Controller
 *************/

exports.newBackup = async (req, res) => {
    // Method synchrone
    // var exec = require('child_process').exec;
    // var child = exec('mysqldump --user=tuto --password=tuto$ --databases quasar_tutorial > ./backup.sql');

    // Method Asynchron
    // Moment est util pour reformater les dates
    // On creer le nom de notre fichier à creer
    const fileName = `${process.env.DB_NAME}_${moment().format('YYYY_MM_DD')}.sql`
    // On definit l'écoute du fichier à écrire
    const wstream = fs.createWriteStream(`./database/backup/history/${fileName}`)
    console.log('---------------------')
    console.log('Running Database Backup Cron Job')
    // Notre ligne de commande à executer
    const mysqldump = spawn('mysqldump', [
        '-u', process.env.DB_USER,
        `-p${process.env.DB_PASSWORD}`,
        process.env.DB_NAME
    ])

    // On lance le stream de notre backup
    // ?? à commenter si vous tester la method synchron
    mysqldump
        .stdout
        .pipe(wstream)
        .on('finish', () => {
            console.log('DB Backup Completed!')
            res.json({
                status: 200,
                success: 'Backup confirmed succesfuly !'
            })
        })
        .on('error', (err) => {
            console.log(err)
            res.json({
                status: 200,
                success: 'Error when realised backup !'
            })
        })


}

// The DB should created before restore
// CREATE database quasar_tutorial;
// https://www.shellhacks.com/restore-mysql-database-command-line/
exports.restoreLastBackup = async (req, res) => {
    // Method synchrone
    // var child = exec(`mysql -u tuto -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} < ./database/backup/history/quasar_tutorial_2021_06_14.sql`);

    const mysql = spawn('mysql', [
        '-u', process.env.DB_USER,
        `-p${process.env.DB_PASSWORD}`,
        `${process.env.DB_NAME} < ./database/backup/history/quasar_tutorial_2021_06_14.sql`
    ])

    // Method Asynchron
    // Moment est util pour reformater les dates
    // On creer le nom de notre fichier à creer
    // const fileName = `${process.env.DB_NAME}_${moment().format('YYYY_MM_DD')}.sql`
    // On definit l'écoute du fichier à écrire
    // const wstream = fs.createWriteStream(`./database/backup/history/${fileName}`)

    console.log('fdqfsfg')

    // const directory = path.resolve("database/backup/history")

    // fs.readdir(directory, (err, files) => {
    //     if (err) throw err
    //     // notre boucle viens selectionner toutes nos images
    //     console.log(files[files.length - 1])
    //     // Notre ligne de commande à executer
    //     const mysqldump = spawn('mysql', [
    //         '-u', process.env.DB_USER,
    //         `-p${process.env.DB_PASSWORD}`,
    //         process.env.DB_NAME + ' < ' + files[files.length - 1]
    //     ])
    //     // On lance le stream de notre backup
    //     // ?? à commenter si vous tester la method synchron
        mysql
            .stdout
            .pipe()
            .on('finish', () => {
                console.log('DB restore OK!')
                res.json({
                    status: 200,
                    success: 'Restore confirmed succesfuly !'
                })
            })
            .on('error', (err) => {
                console.log(err)
                res.json({
                    status: 200,
                    success: 'Error when realised backup !'
                })
            })
    //     // puis on redirige
        // res.json({ success: 'Restore database succesfully !' })
    // })

    // Notre ligne de commande à executer
    // const mysqldump = spawn('mysql', [
    //     '-u', process.env.DB_USER,
    //     `-p${process.env.DB_PASSWORD}`,
    //     process.env.DB_NAME
    // ])




}