## Notes avant de continuer:
Comme convenu, la finalité n'est pas d'avoir un produit 100% abouti, donc ce service ne gére les éléments importants suivant (pour un API et des opérations CRUD):
> - autorisation pour effectuer des opérations CRUD
> - gestion CORS: les apis ne peuvent être appelés que via curl ou un client Rest (Ex: postman). Les appels via le web seront bloqués par la politique CORS si le nom de domaine est différent de localhost:3000.
> - swagger: un swagger n'est pas fourni. Pour l'utilisation des apis, réferrez-vous à la section **Exemples** en dessous.

## Structure:
Ce module est structuré comme suit:
> - src : dossier contenant tous les autres dossiers de ce module
> - src/data: dossier contenant le fichier **UsersData.js**. Ce fichier contient la variable qui stocke les utilisateurs créés
> - src/middleware: dossier contenant principalement le middleware chargé de la gestion des erreurs
> - src/model: dossier contenant le modéle d'un utilisateur
> - src/routes: dossier contenant le fichier **UserRouter.js** qui contient tout le code des apis exposés (création, modification, recupération, suppression). Il contient aussi un fichier utilitaire **UserUtils.js** qui expose des fonctions utilitaires.
> - src/tests: dossiers contenant les tests unitaires
> - src/Readme.md: fichier contenant les informations à savoir avant d'utiliser ce module
> - src/index.js: fichier représentant le point d'entrée de l'application

## Installation:
Avant d'installer le projet, il faut s'assurer que Node et NPM soient installés sur votre ordinateur.<br>
Ouvrir le projet dans un terminal, et éxécuter les commandes suivantes:
```
npm install
```
```
npm run start
```
Pour éxécuter les tests, utiliser la commande suivante:
```
npm run test
```

## Nommage:
Les noms des dossiers, fichiers, fonctions, variables et messages d'erreur sont en anglais.<br>
Les commentaires sur les fonctions et certaines sections sont par contre en français.

## Dépendances externes:
Les dépendances externes utilisées sont les suivantes:<br>
> - express : pour la création des apis
> - validator: pour validation de string
> - winston: pour le log des erreurs
> - helmet: pour la sécurisation des apis (en ajoutant divers entêtes http)
> - jest: pour les tests unitaires
> - supertest: pour les tests http

## Stockage:
Les données utilisateurs sont stockées dans une variable en mémoire **users** (**voir module data/UsersData.js**).<br>
La valeur par défaut de cette variable est un tableau vide.

## Exemples d'appels des apis:
Pour chaque api exposé par ce module, voici un exemple de curl. <br>
> - Api de création d'un utilisateur: 
```
curl --request POST \
  --url http://localhost:3000/api/user \
  --header 'content-type: application/json' \
  --data '{
	"name":"John",
	"surname":"Doe",
	"dateOfBirth":"01/01/1970",
	"phone":"0687670918",
	"address": "Oxford Street"
}'
```

L'api renvoie un code http 200 si tout est OK et l'utilisateur créé.
Dans le cas contraire, il renvoie un code différent de 200 avec un message d'erreur (indiquant la cause de l'erreur). <br>

> - Api de recupération d'un utilisateur: 
```
curl --request GET \
  --url http://localhost:3000/api/user/<idUtilisateur_a_recuperer> \
  --header 'content-type: application/json'
```
L'api renvoie un code http 200 si tout est OK et l'utilisateur correspondant à l'id passé en path param.
Dans le cas contraire, il renvoie un code différent de 200 avec un message d'erreur (indiquant la cause de l'erreur).<br>
**NB**: il faut remplacer **idUtilisateur_a_recuperer** par un identifiant valide. Vous pouvez recupérer l'identifiant renvoyé par l'api de création au dessus.

> - Api de modification d'un utilisateur: 
```
curl --request PATCH \
  --url http://localhost:3000/api/user/<idUtilisateur_a_modifier> \
  --header 'content-type: application/json' \
  --data '{
	
	"address": "Nouvelle adresse"
}'
```
L'api renvoie un code http 200 si tout est OK et l'utilisateur modifié.
Dans le cas contraire, il renvoie un code différent de 200 avec un message d'erreur (indiquant la cause de l'erreur).<br>
**NB**: il faut remplacer **idUtilisateur_a_modifier** par un identifiant valide. Vous pouvez recupérer l'identifiant renvoyé par l'api de création au dessus.

> - Api de suppression d'un utilisateur: 
```
curl --request DELETE \
  --url http://localhost:3000/api/user/<idUtilisateur_a_supprimer> \
  --header 'content-type: application/json'
```
L'api renvoie un code http 200 si tout est OK.
Dans le cas contraire, il renvoie un code différent de 200 avec un message d'erreur (indiquant la cause de l'erreur).<br>
**NB**: il faut remplacer **idUtilisateur_a_supprimer** par un identifiant valide. Vous pouvez recupérer l'identifiant renvoyé par l'api de création au dessus.