## This is a webmail application or in more descriptive terms, a web-based email client.

To interact with the app, that is to access the user's inbox, the user provides valid credentials to the frontend on the browser,
while the backend api verifies a successful connection with the server given the details.

The backend api, upon login attempt, returns true or false depending on whether a successful connection to the server was made and the total
of the messages in the user's inbox.

The frontend logic takes the user to the front(inbox) page if the connection to the server is successful and the user has some
messages in the inbox. Otherwise, it does well to throw an error to the user (while not very descriptive, hints the user about the next steps).

All user's messages are fetched upon successful login at once, though lots of efforts went into ensuring concurrent data fetching
and display. The libraries employed frustrated the efforts.
The user's credentials are stored locally in the localstorage, while the data fetched are stored in the components states.

Error would be displayed via the browser alert box in any case the data fetching encounters any errors and the user is advised to refresh the page to
attempt the process again. The user could logout to begin anew, of course.

And that basically sums up the use of this simple application (NodeJs and ReactJs).

It is worth noting that the motivation behind the development of this app came from the need to showcase coding skils as required by the
Mailbird's recruitment team.

De moi, Je vous souhaite une excellente journee.
From me, I wish you an excellent day.

Best,
Kingsley Uzogor

## Ok, If you opened this file, you are interested in the codes and the structures I suppose.

## So a quick walk through...

This is the front end (react) app of the webmail.
The ultimate file in this application is the public/index.html file. That is the only "page" rendered on the browser.
It houses the all components that make up this app, from the src/App.tsx file (which is the file that organizes all other components)
to the sub components files (e.g src/components/messagebox/messageBoxHead.tsx).
And so, the best way to get the hang of it all is to walk down the "app tree" set up by the App.tsx file. That then, should see you in the UserProvider.tsx,
which wraps the other components (as it houses the user's data with the help of the useContext hook) to the pages/(Index.tsx, Login.tsx and Congrats.tsx) files which
are basically the only main pages in this app.

## For responsiveness check, always refresh the upon resize.

With that, you already have a good grasp of how this app works. See you in the files :)

C'est tout en ce moment!
That's all at this point!
