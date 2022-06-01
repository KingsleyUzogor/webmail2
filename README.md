## This is a simple webmail application or in more descriptive terms, a web-based email client that retrieves a user's inbox from the mail server.

## To download the image on your local computer, ensure docker is set up on your computer (see docker documentation) and simply run the following command:

## docker pull kingsleyuzogorr/webmail2

## To check that the image is successfully downloaded on your computer, run the following command:

## docker images

## And you should see the kingsleyuzogorr/webmail2 image.

## Then, to run the image on port 4000 (or as desired) after it is downloaded on your computer, run the following command:

## docker run -p 4000:4000 kingsleyuzogorr/webmail2

## OR giving the container a name...

## docker run --name <preferred name> -p 4000:4000 kingsleyuzogorr/webmail2

## Now, visit http://localhost:4000 on your browser to interact with the app.

## THE WEBMAIL APP

To interact with the app, that is to access the user's inbox, the user provides valid credentials to the frontend on the browser,
while the backend API verifies a successful connection with the server given the details.

The backend API, upon login attempt, returns true or false depending on whether a successful connection to the server was made and the total
of the messages in the user's inbox.

The frontend logic takes the user to the front(inbox) page if the connection to the server is successful and the user has some
messages in the inbox. Otherwise, it does well to throw an error to the user (while not very descriptive, hints to the user about the next steps).

All user's messages are fetched upon successful login at once, though lots of efforts went into ensuring concurrent data fetching
and display. The libraries employed frustrated the efforts.
The user's credentials are stored locally in the local storage, while the data fetched are stored in the components states.

Error would be displayed via the browser alert box in any case the data fetching encounters any errors and the user is advised to refresh the page to
attempt the process again. The user could log out to begin anew, of course.

And that basically sums up the use of this simple application (NodeJs and ReactJs).

It is worth noting that the motivation behind the development of this app came from the need to showcase creativity and coding skills as required by the
Mailbird's recruitment team.

De moi, Je vous souhaite une excellente journee.
From me, I wish you an excellent day.

Best,
Kingsley Uzogor
