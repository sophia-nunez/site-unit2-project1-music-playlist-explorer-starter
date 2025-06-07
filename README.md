## Unit Assignment: Music Playlist Explorer

Submitted by: Sophia Nunez

Estimated time spent: 20 hrs (12 hrs in-office)

Deployed Application (**required**): [Music Playlist Explorer Deployed Site](https://site-unit2-project1-music-playlist-hepj.onrender.com)

### Application Features

#### CORE FEATURES

- [x] **Display Playlists**
  - [x] Dynamically render playlists on the homepage using JavaScript.
    - [x] Playlists should be shown in grid view.
    - [x] Playlist images should be reasonably sized (at least 6 playlists on your laptop when full screen; large enough that the playlist components detailed in the next feature are legible).
  - [x] Fetch data from a provided Javascript file and use it to create interactive playlist tiles.

- [x] **Playlist Components**
  - [x] Each tile should display the playlist's:
    - [x] Cover image
    - [x] Name
    - [x] Author
    - [x] Like count

- [x] **Playlist Details**
  - [x] Create a modal pop-up view that displays detailed information about a playlist when a user clicks on a playlist tile.
  - [x] The modal should show the playlist's:
    - [x] Cover image
    - [x] Name
    - [x] Author
    - [x] List of songs, including each song's:
      - [x] Title
      - [x] Artist
      - [x] Duration
  - [x] The modal itself should:
    - [x] Not occupy the entire screen.
    - [x] Have a shadow to show that it is a pop-up.
    - [x] Appear floating on the screen.
    - [x] The backdrop should appear darker or in a different shade.

- [x] **Like Playlists**
  - [x] Implement functionality to allow users to like playlists by clicking a heart icon on each playlist tile.
  - [x] When the heart icon is clicked:
    - [x] If previously unliked:
      - [x] The like count on the playlist tile should increase by 1.
      - [x] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been liked by the user.
    - [x] If previously liked:
      - [x] The like count on the playlist tile should decrease by 1.
      - [x] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been unliked by the user.
    - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please film yourself liking and unliking:
      - [ ] a playlist with a like count of 0
      - [ ] a playlist with a non-zero like count

- [x] **Shuffle Songs**
  - [x] Enable users to shuffle the songs within a playlist using a shuffle button in the playlist's detail modal.
  - [x] When the shuffle button is clicked, the playlist's songs should display in a different order.
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself shuffling the same playlist more than once. 
  
- [x] **Featured Page**
  - [x] Application includes a dedicated page that randomly selects and displays a playlist, showing the playlist’s:
    - [x] Playlist Image
    - [x] Playlist Name
    - [x] List of songs, including each song's:
      - [x] Title
      - [x] Artist
      - [x] Duration
  - [x] When the page is refreshed or reloaded, a new random playlist is displayed
    - For example, navigating to the all playlists page and then back to the featured playlist page should result in a new random playlist being displayed
    - Note that because your algorithm will not be truly random, it is possible that the same playlist will feature twice in a row. 
    - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself refreshing the featured page more than once. 
  - [x] Application includes a navigation bar or some other mechanism such that users can navigate to the page with all playlists from the featured page and vice versa without using the browser's back and forward buttons. 

#### STRETCH FEATURES

- [x] **Add New Playlists**
  - [x] Allow users to create new playlists.
  - [x] Using a form, users can input playlist:
    - [x] Name
    - [x] Author
    - [x] Cover image
    - [x] Add one or more songs to the playlist, specifying the song's:
      - [x] Title
      - [x] Artist
  - [x] The resulting playlist should display in the grid view.
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself adding at least two songs to the playlist. 

- [x] **Edit Existing Playlists**
  - [x] Enable users to modify the details of existing playlists.
  - [x] Add an edit button to each playlist tile.
  - [x] Users can update the playlist:
    - [x] Name
    - [x] Author
    - [x] Songs
  - [x] The playlist grid view and playlist detail modal should update to display any changes (see Required Features, Criterion 1 & 2).
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself:
    - [ ] Editing all of a playlist's features (name, creator, AND songs)
    - [ ] Editing some of a playlist's features (name, creator, OR songs) 

- [x] **Delete Playlists**
  - [x] Add a delete button to each playlist tile within the grid view.
  - [x] When clicked, the playlist is removed from the playlist grid view.

- [x] **Search Functionality**
  - [x] Implement a search bar that allows users to filter playlists by:
    - [x] Name 
    - [x] Author
  - [x] The search bar should include:
    - [x] Text input field
    - [x] Submit/Search Button
    - [x] Clear Button
  - [x] Playlists matching the search query in the text input are displayed in a grid view when the user:
    - [x] Presses the Enter Key
    - [x] Clicks the Submit/Search Button 
  - [x] User can click the clear button. When clicked:
    - [x] All text in the text input field is deleted
    - [x] All playlists in the `data.json` file are displayed in a grid view
    - [x] **Optional:** If the Add Playlist, Edit Existing Playlist, or Delete Playlist stretch features were implemented:
      - [x] If users can add a playlist, added playlists should be included in search results.
      - [x] If users can edit a playlist, search results should reflect the latest edits to each playlist.
      - [x] If users can delete a playlist, deleted playlists should no longer be included in search results.
      - **Note:** You will not be graded on the implementation of this optional subfeature to keep your grade of this stretch feature independent of your implementation of other stretch features. However, we highly suggest including this in your implementation to model realistic behavior of real applications. 

- [x] **Sorting Options**
  - [x] Implement a drop-down or button options that allow users to sort the playlist by:
    - [x] Name (A-Z alphabetically)
    - [x] Number of likes (descending order)
    - [x] Date added (most recent to oldest, chronologically)
  - [x] Selecting a sort option should result in a reordering based on the selected sort while maintaining a grid view.

### Walkthrough Video
Embed feature did not work, so I've put the link below after speaking with a CodePath instructor:
https://www.loom.com/share/42a6dfa50ccc4f638ed84799a9ea92c9?sid=600f0ae2-4eab-4b67-a9b6-921a29a6f251

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The lessons were helpful, especially for those who have very little backgrond in HTML/CSS/Javascript. The discussion we had on form submissions helped me a lot, as this was a topic I've never used before with these technologies. The labs were a nice way for me to practice the topics we had gone over in more depth, closer to the level of difficulty that was needed for the project features. However, there were some areas such as image uploads and more complicated grid manipulation that were difficult. Especially for different screen sizes, I didn't know to start the layout for a small screen and make media styles for wider ones on top of that.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would work on style and page responsiveness more. I worked out most major issues with this, but there was a lot of code that got messy. Due to this, it was difficult to go through my CSS and make sure everything would work (although the basic display seemed to operate well on many device screen sizes). Additionally, I would leave more time for the stretch features. I spent a lot of time on very minor stylistic choices, so some of the functions especially around the form submissions were overcomplicated in my code. I got them working, but I wish I had more time to trial the page and find more bugs.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I'm really happy with how my design turned out! I usually find the page design hard to do, but I was able to modify things and eventually reach a display I really liked. I was also able to do all of the features in a way that I think worked well. This was especially true for playlist add/edit with the cover upload, as I got this working with a preview. One other thing was the array with playlist objects, as I thought my manipulation of this between functions went very well! Some things didn't go as planned, especially regarding modal styling. It was diffficult to figure out what to do with so many containers,and I likely overcomplicated the page setup. I really liked how my friend, Leia, did her design. The color palette was really nice and she had a lot of styling that made the page look professional.

### Open-source libraries used

Not a library, but I used font-awesome: https://fontawesome.com/

### Shout out
Thank you to Greg for your help throughout everything! Also to Gianna, who I talked with in the beginning of the week about general functionality of the page.
