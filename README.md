# Dog Adoption App

## Idea
An application that allows you to adopt a dog. It stores information about the **dogs** (name, breed, age, image url, story and adoption status), registered **users** (username, full name, phone, email and the dogs in their watch list) and the adoption **applications** made by registered users only (dog id, user id and status of the application).

## Design
The Dog Adoption App has three types of users that can perform the following actions.

* Guest
    * Guests can access the guest homepage - direct access
    * Guests can register - access through the homepage
    * Guests can login - access through the homepage
* Admin
    * Admins can access the admin homepage - direct access
    * Admins can manage all dog cards (All CRUD operations)
        * Admins can create new card - access through the homepage
        * Admins can see all listed cards - access through the homepage page
        * Admins can check details for a specific card - access through the catalog page
        * Admins can update a specific card - access through the details page for the card
        * Admins can delete a specific card - access through the details page for the card
    * Admins can manage all adoption applications through the dashboard - access through the homepage
        * Admins can see all listed applications
        * Admins can update a statuse of a specific applications
        * Admins can delete a specific applications
* User
    * Users can access the user homepage - direct access
    * Users can see all cards of dogs available for adoption - access through the homepage page
    * Users can check details for a specific card - access through the catalog page
    * Users can create an adoption requst - access through the details page for the card
    * Users can add to their watch list - access through the details page for the card
    * Users can check their prifile details including watch list - access through the homepage page

## Backend
The application uses [Progress® Kinvey™](https://www.progress.com/kinvey "Progress® Kinvey™") as a backend. 



