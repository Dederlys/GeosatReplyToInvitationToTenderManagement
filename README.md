# Reply to invitation to Tender Manager

Application delivered to Geosat to reply to invitation to tenders. This project was achieved during semester 9 at ENSEIRB-MATMECA (computer science engineering school).

## Contributors

- Hélène BALLET : Front developper
- Clément LARCHER : Back developper
- Xavier MORETO : Back developper and scrum master
- Elise RUBIO : Front developper
- Antoine TIREL : Communication manager and tester

Special thanks to Romain D'esparbes, Thomas Montaigu and Jennifer Simeon from Geosat for helping us to work on this project.

## Technologies

BACK : Springboot and Java 8

FRONT : Angular 6

## Functionalities

The objective of this project was to help to reply to invitations to tender.

The final reply is composed of two word files. One for the human means that will be deployed on the project and an another one for the material means.

Associated to each human mean we have a resume, a biographie and diplomas (all diplomas are in one unique file). 

As for human means we have two files describing a material mean :
- The manufacturer description
- The Geosat usage

The issue was the time spent to find the files into the filesystem and to merge them doing copy-pasting. We needed to find a solution to speed up this process.

In order to do that, we manage to create a database administration interface that helps the user to find elements that will be put on the reply.

The specificity of the solution is that it works without any database. It's working only with the filesystem in order to make it easier to maintain (as the amount of data stored is tiny).

We have 4 JSON files used for database and configuration :
- config.json
- employees.json
- value_types.json
- equipments.json

These files are in back/src/main/resources/

## Deployment

This section will give you instructions to deploy the project

### FRONT

Make sure you have node.js, npm and an apache server installed before doing this process.

First, install dependencies by doing :

`npm install`

You will have to edit front/src/environments/environment.prod.ts. Put the ip address of the server using the BACK into the var _base_url_.

Then, you can build the project using the command :

`ng buid --prod`

Finally you can put the content of the folder front/dist/geosat/ into the folder you will deploy with apache.

### BACK

To compile you will need maven and Java installed.

Execute this command first :

`mvn package`

That will produce a jar file that can be executed.

Take the jar file and _back/src/main/resources/config.json_ and put them on your execution folder. You can execute the program by doing

`java -jar your_jar.jar`

It will launch the program and listen the port 8080. Please note that today, it is not posible to change the port of the back-end part.

## Development

If you want to work on this project to improve it, you can import the back on Eclipse and execute the front by using the command :

`npm run start`

This command will create a local server executing your code and updating if you edit files and accessing to localhost:8080 for BACK requests.

## About

We are a little team of 5 student-engineers. This project was realized having only 1 month of intense development. It's not finished as there are still some bugs but it's a great demonstration of what we are able to do.