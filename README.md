# ict-study-buddy
Discover the Perfect Study Partner with Study Buddy – Elevate Your
            Learning Together!

## How to run the app
We use `yarn` as the main node management tool. 
if you do not have yarn installed, please run
```bash
npm install --global yarn
```
We use `npm` as well. So when you find some packages were uninstalled, please run
```bash
npm install
```

### How to launch the backend locally?
```bash
# navigate to the server folder
cd server

# Install dependencies
yarn install 

# if .env does not exist, please run (first time launch the project)
mv .env.sample .env

# launch
yarn start

# Once you notice that
App server listening on port 3000!

# which means the server launched successfully. The server is up at http://localhost:3000.
```

### How to launch the front end locally?
```bash
# Please open a new terminal and navigate to the client folder
cd client

# Install dependencies
yarn install 

# launch
yarn dev
```
### How to launch the socket locally?
```bash
# Please open a new terminal and navigate to the socket folder
cd socket

# Install dependencies
yarn install 

# launch
yarn start
```
***

### How to play the App?

1. Open the link: \
http://localhost:5173/

You will be navigated to the Login page if you have never logged into this app before.
<img width="1503" alt="image" src="https://github.com/Monica-Zhang-git/study-buddy/assets/80732580/ffeadde5-f549-45a3-872b-49519f7ab3e8">

2. Input the email address and password.

```bash
Test Account One:
email: monica.zhang.nz@gmail.com
password: dsfasdf

Test Account Two:
email: jenny@gmail.com
password: dsfasdf
```

You will be directed to the homepage once you log in to the App. Here is the homepage.
<img width="1512" alt="HomePage" src="https://github.com/UOA-MINFOTECH-INTERNSHIPS/ict-study-buddy/assets/80732580/d676282e-f12b-4961-9623-5f3c3a2dd885">




