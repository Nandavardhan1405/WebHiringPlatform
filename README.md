
# WEB HIRING PLATFORM - ENTNT

This project is a React-based web application designed for hiring platforms. It provides an admin dashboard for managing job postings, tracking candidates, and creating job-specific assessments. The app streamlines the hiring process by allowing admins to post jobs, review candidate details, and assign tailored assessments for each position.
## Installation and Setup



To install the project and run the following command in your terminal:


#### 1. Clone the repository
```
git clone https://github.com/Nandavardhan1405/WebHiringPlatform.git
```
#### 2. Change the Directory
```
cd frontend
```
#### 3. Install Required
```
npm install

```
#### 4. Run the App
```
npm start
```
The app should now be running on http://localhost:3000.

## Features

* ADMIN LANDING PAGE: 
  * Admin can navigate to the Job listings section and Assessments section
* Jobs page for Managing Job Postings: 
  * Allows an admin to Monitor,Add,Delete and Edit job postings.
  * For each job posting the Job name,Description and the number of applied candidates are displayed.
  * By Clicking on the Name of a job,the admin can navigate to the Candidate Tracker.
* Candidate Tracker
  * Random candidates were generated for selected job.
  * For each candidate the Candidate name,Resume link,Application date,Status ("Under Review", "Interview Scheduled","Rejected","Hired") are displayed.
  * By Clicking on the Name of a candidate,the admin can navigate to the Candidate Details where the admin can view candidate details and copy the Resume link.
* Assessments
  * Using a Dropdown list,admin can select a particular job
  * For each job admin can Create,Monitor,Delete and Edit the questions and save the Assessments.


  
  

## Additional Features
* Responsive Design: The application is fully responsive and mobile-friendly.
* Routing: Seamless navigation using React Router.
* UI Consistency: Clean and user-friendly interface using Material-UI components.
* Data Persistence: Uses local storage for simulated data persistence.

## Authors

- [Yedulla Nandavardhan Reddy](https://github.com/Nandavardhan1405)

