# StudentCouncelingSystem




1) Xampp<br>
* Click on this [link](https://www.apachefriends.org/download.html) to download xampp<br>
* To install xampp, run the downloaded .exe file <br>
* Xampp will be downloaded to C:\xampp , by default.
* To run the xampp server go to C:\xampp and run xampp-control.exe
* To start Apache and Mysql ,Now just click the start button on the control panel
* Download the studentcouncelling zip file and extract it

## Setting up  Database

* Click on the Mysql Admin button or directly go to localhost/phpmyadmin url <br>

* Create a new database by clicking on new, name the database as studentcouncelling<br>

* Now Click on import, then browse to extracted folder and Select studentcouncelling.sql<br>

* Then click go (or) press ctrl+enter  it will take few minutes to import database.<br>

2)Installing Node js and running the project 
* Click on this link(https://nodejs.org/en/)
* To install Node, run the .exe file 
* node will be downloaded 
* Go to the extracted folder and open command prompt or terminal 
* Enter the command "npm start" (without quotes)
* now go to url [http://localhost:8080]

* for the Admin login Use "User" as Username and "User123" as password
* All the frontend files are ejs.files and are in the views directory
* All the executable files are in routes directory
* All Styling files are in public directory

* Deatils of the students(Rollnumber,Rank) who apperaed for the exam are in student.csv file.
* Use only those Rollnumbers while regisering as student 
* Students with the Rollnumbers not in student.csv will not alloted any college 

