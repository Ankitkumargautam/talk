# talk with Ankit

---

- Commit 10 contains information about

1. use of react-hook-form for form validation
2. made two custom hook
   - one for hide and show button
   - one for image upload
3. complete integration of singup and login

- Commit 13 contains informatin about
  Chat’s apis
- access or create 1o1 chat (done)
- fetchChats (done)
- create group chat (done)
- rename chat (done)
- add to group (done)
- remove from group (done)

4. commit 15 24 jan 2024

- made chat page with search user functionality and setSearchUser

5. commit 16 24 jan 2024

- made my chat component with functionality

6. commit 18 25 jan 2024

- protected route and
- debugging and
- group creation functionality

7. commit 19 "major bug fix" on 26 jan 2024

- contains all code for fixing the popups :

  - Profile modal
  - create group modal
  - side drawer modal
  - update

8. commit 20 updated above component with html code instead of "Modal"

9. commit 27 date 30 jan 2024

- implemented socket for folowing functionality in reference of backend-
  - "connection": to make connection to socket
  - "setup": to join user id to the socket
  - "connected": to give frontend information of user join to socket
  - "join chat": to join chat id's to create room which will be used
    to give notification to user room later
  - "new message": to get new message data from fortend and then give
    the data to all user by emiting "message received" with the help
    of user id that connected in "setup"
  - "message received": to give all user the message data which is
    send by some user in the chat obj except the sender user
  - on "typing": to get info from room(chat Id which was joined in
    "connected" socket) that typing is going on in this room
  - emit "typing": to give frontend the info that typing is happening
    in this room with the help of chatId
  - on "stop typing": to get info from room(chat Id which was joined in
    "connected" socket) that typing is stop in this room
  - emit "stop typing": to give frontend the info that typing is stopped
    in this room with the help of chatId
