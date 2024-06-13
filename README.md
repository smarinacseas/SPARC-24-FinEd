# SPARC-24-FinEd

Front end - React, host on AWS, multi-page via React Router
Back end - Flask (Python), host on EC2 instance (AWS)
Database - AWS RDS (resource -> Postgres + SQL)
--> Open to all traffic (avoid building private cloud + security)

--> Only back end talking to database: front end packages information and sends to flask server,
flask sends to database

Environment variables (avoid storing usernames/passwords in code)
--> SWE Standard, avoid getting blocked from database
Secrets manager in AWS (more complex, stretch goal)

Main goal: Get project working locally at a very basic level (front end + back end + database)
- Front end: says "front end", has 1 button that sends request to back end
- Back end: send a basic response for front end to display
  --> Can start locally, ideally host in the cloud
- Database: very basic setup on AWS (view on DBeaver)
  --> manually create a login table, send post request with user/pass from back end, use DBeaver to check

Milestones:
1. Someone create database in AWS and connect it to/visualize via DBeaver
   --> Can interact directly (Boto3) if we want
2. Send a post request to the database, ensure all ends talk
3. Host back end online, can be very basic (test by sending http request)
4. Define an API for front/back end communication (e.g. login page: front end sends user/pass
   front end requests 401k material, back end sends)

AI:
Simple monthly expense prediction model
Chat bot via OpenAI API, be careful with API key (env vars)

MVP:
