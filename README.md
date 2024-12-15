# Task-Management-System
Task Management System, supporting realtime task management and sorting tasks based on priority, start time and end time.

# TechStack:
- React.js
- Node.js
- Express.js
- MongoDB (mongoose ODM)
- Tailwindcss
- Typescript

# Tasks Implemented:
1. Tasks to have title, start time, end time, priority (values from 1-5 allowed) and task status (pending or finished values only)
2. End time represents the estimated time for completion when the task is not complete. When task is marked complete, the end time needs to be updated with the actual time of completion of the task.
3. Use database IDs for the task IDs
4. Users can filter tasks by priority and completion status
5. Users can sort tasks by start time and end time
6. Create a dashboard to view task statistics such as
    - Total count of tasks
    - Percent of completed and pending tasks
    - Time lapsed till now and balance estimated time left of pending tasks by priority (show time lapsed and balance estimate times in hours)
    - Overall actual average time for completion (show time in hours)
7. Implemented Reference wireframes.
8. Implement basic username (email-ID) and password based authentication (use JWT)
9. Other than Home page, all other pages are private pages and cannot be accessed without login.
    - The user should be redirected to dashboard page after logging
    - If the user is already logged in and tries to open the home page, then also he / she should be automatically redirected to dashboard page.
10. Create endpoints as you deem necessary based on the app requirements
11. Users should be able to do CRUD on their tasks and not on tasks of other users (hence authentication is required both on front end and back end)
12. Create endpoints to dynamically calculate the statistics required for dashboard page. Fetching all data on front end and then doing data manipulation on front end is not advisable (all required calculations should be done by backend)