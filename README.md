# api-node-mysql
tuto api node mysql

# Pré-requis
  - Node & Npm 
  (https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)
  - MySQL (tuto réaliser avec MariaDB)
  (https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04)

# Install Project
  - configurer back-end en commençant par notre DB et nous démarrons notre api

## terminal
  - Démarrer la base de données local:
```
sudo systemctl start mariadb.service
```
  - Ouvrir la console mariadb:
```
sudo mariadb
```

## dans la console mariadb:

!!! si vous n'avez jamais utiliser mariadb sur votre pc il vous faudra creer un utilisateur et lui donner des droit

```
create user 'tuto'@'localhost' identified by 'tuto$';
grant all privileges on *.* to 'tuto'@'localhost';
flush privileges;
```
## Et enfin si vos utilisateur sont déja creer
(toujour dans la console)
```
create database quasar_tutorial;
grant all privileges on quasar_tutorial.* to 'tuto'@'localhost';
flush privileges;
```

## et maintenant toujour dans la console mariadb nous pouvons monter nos tables:
```
source database/db.sql
exit
```

## Il nous manque plus qu'a démarrer notre api:
```
cd api-node-mysql
npm i
nodemon server.js
```

(Il ce peux que les commandes soit à peine exact le tuto est en cours de réalisations n'hésiter pas à me tenir au courant)

J'espères que cela poura vous aidez ;)