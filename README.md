# This project is done purely with respect for Spotify and especially its development team.

Icons/SVGs etc I use in the video are owned by Spotify and I will not be deploying this application anywhere, neither should you.

Use this repository to follow along with me as I educate myself on best React.js practices and improve my UI development skills.

Hope you enjoy and learn something!

# List of Features to be made:

1.Home Page and Featured Music

2.Music Player Component

3.Added the search component to search the songs or albums

4.Creted Song and Album Details Page

5.Connected to server for Register and Login

6.Created Playlists and Favorite Songs

7.Added Subscription Modal

Tech stacks : HTML, CSS, JavaScript, React

I have used the Icons from React and Material UI
Project is completely responsive.
Created Using Material User Interface (MUI)
Used the StateProvider All over the project using createContext, useContext for using the datas GLOBALLY.

. The project aims to create a Spotify (https://open.spotify.com/) clone application using HTML, CSS, JavaScript, and React. The app will replicate the core functionalities of Spotify, a music streaming platform, allowing users to browse, listen to, and discover their favorite songs and artists.

. Spotify is a popular music streaming platform that offers a vast library of songs, albums, and personalized recommendations. The Spotify clone will offer users a similar experience, enabling them to enjoy their favorite music and discover new tracks and artists.

Use the following APIs to fetch music data:

Get list of music:
fetch('https://academics.newtonschool.co/api/v1/music/song', {
headers:
'projectId': 'PROJECT_ID'
}
})

Get list of albums:
fetch('https://academics.newtonschool.co/api/v1/music/album', {
headers: {
'projectId': 'PROJECT_ID'
}
})

Filtering : This can be done by passing key-value pairs in the query string, with each key corresponding to a field in the database. For instance, I requested to GET
/api/v1/music/song?filter={"field1":"value1","field2":"value2"}
to get all data of type field1.

fetch('https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}', {
headers: {
'projectId': 'PROJECT_ID'
}
})--> https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}

Sorting : we can sort the results by one or more fields by specifying a sort query parameter with the fields to sort by. For example, GET /api/v1/music/song?sort={"field1":1,"field2":-1} would sort the results by field1 in ascending order (since it's value is 1 ) and field2 in descending order (since it's value is -1 ). But i didnt done . i will do it in the future.

--> https://academics.newtonschool.co/api/v1/music/song?sort={"release":1}

While designing the component, I needed the details about the song that's currently playing. I used the Get music using id endpoint.

fetch('https://academics.newtonschool.co/api/v1/music/album/:id', {
headers: {
'projectId': 'PROJECT_ID'
}
})

I use the filtering feature from the API for this:

fetch('https://academics.newtonschool.co/api/v1/music/song?filter={"title":"search_term_here"}', {
headers: {
'projectId': 'PROJECT_ID'
}
})
