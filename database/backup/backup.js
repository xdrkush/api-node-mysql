// Import Module
const cron = require('node-cron'),
    { spawn } = require('child_process'),
    moment = require('moment'),
    fs = require('fs');

require('dotenv').config()

// node-cron: https://www.npmjs.com/package/node-cron
// child-process: https://nodejs.org/api/child_process.html
// mysql-dump: https://www.memoinfo.fr/tutoriels-linux/guide-sauvegarde-restauration-mysql/
// commande shell: mysqldump --user=tuto --password=tuto$ --databases quasar_tutorial > ./backup.sql

// Log de démarrage
console.log('Backup started !')

// !!! ATTENTION la tache cron s'execute toute les minutes a vous de construire votre tache avec les liens en haut de cette page
cron.schedule('* * * * *', () => {

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
        })
        .on('error', (err) => {
            console.log(err)
        })

})
