# !/bin/bash

# production

git reset --hard

git checkout master

git pull origin master

npm i

npm run build 

pm2 start process.config.js --env production



# # development 

# git reset --hard

# git checkout develop

# git pull origin develop


# npm i

# pm2 start process.config.js --env development


