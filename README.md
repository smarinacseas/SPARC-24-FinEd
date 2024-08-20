# SPARC-24-FinEd

Introduction of Problem:

Navigating the world of personal finance can be daunting for many people. People, especially young adults and beginners, often struggle with understanding fundamental financial concepts, finding right information, and applying it effectively in their lives. Our group decided to build a financial literacy web application that's geared toward young adults or anyone who is a beginner when it comes to personal finances. With an action based platform catered to beginners, we hope our project will provide a fun, interactive experience to help people get started building a sustainable financial framework.

Proposed Design:

Our project aims to address the challenges faced by people as they begin their personal financial journey through a financial literacy web application, designed and implemented specifically for beginners. Our web application features an action based learning platform that breaks down complex financial concepts into manageable, engaging modules. Each module focuses on a different concept, such as credit card, bank account, investing, and budgeting. Each module also has action steps in which an user will need to complete and check off before unlocking the next module. Additionally, when a user first register and login to our application, they will be asked to complete a demographic questionnaire that includes information such as age, income level, and financial goals. We are using this questionnaire to generate artificial intelligence recommendations (through OpenAI) for each of the modules based on the user’s current status.

Description of Solution/Project Impact:

Our web application provides an interactive and user-friendly interface, with structured curriculum modules that introduce users to essential financial information, and action steps in which they can take to set themselves up financially. By providing a centralized and easy to navigate platform, our project aims to empower users with the knowledge and tools to help them build their financial confidence. The application will help users understand and implement effective financial strategies, leading to improved financial habits and achieving their long-term goals.

Our web application has 7 modules, each with content specific to that module, action steps, and AI feature that generates recommendations based on the user’s demographic that is related to that module. Some of the modules also have interactive components such as debt repayment calculator, APR calculator, interest calculator, and mini spending tracker. With the various multiple action steps in each module, we also implemented a tracker that tracks progress based on how many actions an user has completed in each module and a module unlocking feature in which a user can only move onto the next module when they completed the previous one, all of which a user can interact with and see on the homepage. We also have a login and registration page for new and returning users to login and continue learning based on where they left off. We leveraged Amazon RDS (Relational Database Service) to streamline database management, which allows us to automate essential tasks such as backups, patching, and scaling. That also simplifies both the initial setup and ongoing maintenance relational databases. Additionally, we utilized PostgreSQL as a robust open-source relational database system to efficiently update and maintain data. We employed PGAdmin as the open source tool that handles connections and supports various administrative tasks.

Technologies:

Node Package Manager (NPM): Allowed easy installation and use/management of various JavaScript packages and dependencies. This was also used to run our development server.

Flask (Python Framework): We decided on Flask to run the backend since it allowed us to develop in Python which we were all familiar with from outside experience + CIT 5910. Flask helped us with routing, serving the API endpoints, and managing requests + responses.

Frontend and Backend Communication: The React frontend communicated with the Flask backend through API calls. This allows all logic to be processed in the backend, where the React app sends data to the backend Flask RESTful API where all logic/data processing takes place. This was most relevant to the login/registration pages, demographics info, and progress tracking. Together, React and Flask allowed us to separate frontend aspects of the project from the backend logic.

Axios Configuration File (frontend/…/api.js) - Allows us to make consistent/manageable HTTP requests to the backend API through a centralized instance of Axios.

React Router DOM - For managing navigation and routing between different components, allowing smoother transitions vs. using a traditional HTML approach (would require loading new HTML pages from the server when pressing links). Selective rendering of only relevant components as a user navigates, improves performance and UX.

AuthContext (React Context API): Used to manage a user’s global authentication state across the application, so a user’s progress and demographic info is saved for that particular user when logged in. This worked in tandem with react-router-dom to create protected routes, meaning only an authenticated user could navigate through the React application.

Bcrypt: Password security and verification - when a user enters a password, it is hashed so we’re not storing plain text passwords in the database.

Bootstrap: We mainly used this in the beginning of development to create a login/registration page that allowed us to test requests/responses between the frontend and backend. This was done so we didn’t have to worry much about styling and could instead focus on functionality. useState (React Hook): Used to manage user inputs (particularly form data. This allowed us to store user inputs into state variables for data processing. This was especially useful for progress tracking.

react-chartjs-2 (JS Library): For interactive and responsive charts (pie charts for visualizing/interacting with financial or spending categories and a bar chart for compounding interest calculator).
