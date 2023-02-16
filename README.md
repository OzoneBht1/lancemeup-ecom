# E-commerce Web Application Task

## Introduction

This is a simple ecommerce web application built with React and ReduxToolkit for state management as part of the internship task for Lancemeup Company.

---

## Implementation Detail

For this task, I decided to use Tailwind CSS for the UI and TypeScript as the programming language. I used the JSON Server package to create a RESTful API from a local JSON file for user authentication. This made it easy to implement user authentication without having to set up a database.

To manage the user's authentication state, I created a custom hook that used the browser's local storage to store the user's information, then stored it in redux. This made it easy to retrieve the user's information throughout the application, without having to pass it down as props.

To work with products, I used the Fake Store API (https://fakestoreapi.com/) to retrieve a list of products. The list of products was then stored in the Redux store using Redux Toolkit. I also used Redux Query to handle API requests and caching.

---

## Getting Started

To run this application, you will need to have Node.js and npm (Node Package Manager) installed on your machine. Once you have installed them, you can follow the steps below to get started:

1. Clone this repository to your local machine using the command:

```bash
$ git clone https://github.com/OzoneBht1/lancemeup-ecom
```

2. Navigate to the project directory by running:

```bash
$ cd ecom-frontend
```

3. Install the required packages by running:

```bash
$ npm install
```

4. Navigate to the components directory by running:

```bash
$ cd ecom-frontend/src/components
```

5. Create a new file called **'secret-pass.ts'** in the 'components' folder.
6. In the 'secret-pass.ts' file, add the following code:

```bash
import bcrypt from "bcrypt";

export const saltRounds = 10;
export const secret = bcrypt.hashSync("<your-secret-password>", saltRounds);
```

Replace <your-secret-password> with your desired secret password. This password will be used to hash the user's passwords for security purposes.

7. Navigate back to the project directory by running: cd ../../..

8. Start the development server by running:

```bash
$ npm start
```

The application will open in your default browser at: http://localhost:3000.

---

## Usage

Once the application is running, you can use the following pages and features:

- **Login page**: This is the first page of the application, where you can login as an admin or customer.
- **Add product page**: This page allows the admin user to add a new product to the list.
  Product list page: This page shows the list of all products in a table format. Normal users can buy products by clicking on the "Buy" button, while admin users can edit or delete products by clicking on the respective buttons.
- **Search and filter product**: This feature allows users to search for products by name and/or filter them by price range and/or category.
- **Order list page**: This page is only accessible to the admin user and shows the list of all orders placed by customers.

  ***

## Security

This application includes a **Higher-Order Component** (HOC) for route protection that checks if the user is authenticated before allowing access to certain routes. The HOC handles authentication checks, redirects, and provides a way for the wrapped component to access the authentication state. This helps to ensure that only authorized users can access certain pages and features.

---

## Local Storage Management

This application includes a custom hook for managing the local storage state of the React app, including setting and retrieving data, and handling errors. This helps to ensure that user data is stored securely and can be retrieved easily when needed.

---

## Conclusion

This ecommerce web application built with React and ReduxToolkit for state management includes several key features such as login page, product list page, search and filter product, and order list page. Additionally, it includes a Higher-Order Component (HOC) for route protection and a custom hook for managing the local storage state of the React app.
