# Furniro

A full-stack furniture e-commerce project with a React single-page application and a separate Express backend.

I built this project to bring together the customer-facing interface, backend APIs and an admin panel in one application.

## Features

- Product browsing with search, sorting and pagination
- Filters for category, material and color
- User registration and JWT authentication
- Profile updates with image uploads
- Backend APIs for creating orders, viewing order history and updating order status
- Admin panel for managing products and users

## Tech Stack

**Frontend:** React, TypeScript, Redux Toolkit, React Router, Axios, Vite and CSS.

**Backend:** Node.js, Express, TypeScript, MongoDB and Mongoose.

**Authentication and uploads:** JWT and Multer.

**Admin interface:** EJS.

## Project Structure

The frontend uses React Router for navigation, Redux Toolkit for product state and Axios to communicate with the backend.

The backend separates routes, controllers, services and database models. EJS templates provide the admin interface, while Mongoose handles data modeling and database operations.

## Repositories

- [Frontend — React SPA](https://github.com/azizbekreimbaev/furniro-app)
- [Backend — Express API and admin panel](https://github.com/azizbekreimbaev/furniro)
