# JWallet Backend
## About 
##### Backend program with posgresql for E-Money app
#
## Built With
#### [node.js](https://nodejs.org/)
#### [expess.js](https://expressjs.com/)
#
## How to Use This Backend Locally
##### Clone this project to your local computer
##### Import zwallet.sql to your local postgresql database
##### Create .env file and fill write the code below
##### Install required package with command `npm i`
##### Run the app with `npm run dev`
#
## .env
##### PORT= (your port)
##### DATABASE_URL= (your database url)
##### LIMIT_DATA = (set your limit data ex:5)
##### LIMIT_PICTURE = (set your picture limit in megabyte)
##### APP_SECRET = (set your app secret)
##### CLOUD_NAME = (set your cloud name from cloudinary)
##### API_KEY = (set your api key)
##### API_SECRET = (set your api secret)
#
# Main Endpoint
Notes | URL | Method | Description |
--- | --- | --- | --- |
auth | /auth/login | post | to login into the app |
auth | /auth/register | post | to register into app |
auth | /auth/createPin | post | to create pin |
authenticated | /authenticated/profiles | get | get all data profile who loged in |
authenticated | /authenticated/checkPin | post | to check pin is match or no |
authenticated | /authenticated/updatePin | patch | to update the pin if check pin result is 'match' |
authenticated | /authenticated/phone | patch | to update phonenumber |
authenticated | /authenticated/changePassword | patch | to update password |
authenticated | /authenticated/profiles | patch | to update profile data |
authenticated | /authenticated/transfer | post | to make transaction with someone else |
authenticated | /authenticated/topup | post | to make topup money to your account |
authenticated | /authenticated/historyTransactions | post | to get all history transaction |

#### `notes :`
#### some endpoint may can't use because the backend not working corectly yet (stil in progres)
