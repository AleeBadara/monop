const winston =require('winston');
winston.remove(winston.transports.Console); // suppression des logs de winston lors des tests unitaires