# Travel Tales Application Documentation

## Overview
Travel Tales is a social blogging platform focused on travel experiences. Users can share their travel stories, rate destinations, and interact with other travelers' content.

## Authentication Flow

### Registration Process
1. User navigates to `/auth` and clicks "Sign Up"
2. System presents registration form requesting:
   - Name
   - Username (alphanumeric + underscores only)
   - Email
   - Password (minimum 6 characters)
3. Upon form submission:
   - Frontend validates input fields
   - API call made to `POST /user` endpoint
   - New user object created with:
     - Provided user data
     - Empty arrays for favorites, followers, following
     - Current timestamp for createdAt
4. Upon successful registration:
   - User automatically logged in
   - Redirected to dashboard
   - Auth context updated with user data

### Login Process
1. User navigates to `/auth`
2. Enters email/username and password
3. System:
   - Makes API call to `GET /user` with email filter
   - Validates password match
   - Updates auth context with user data
   - Redirects to dashboard

## Post Management

### Creating a Post
1. User navigates to dashboard
2. Fills post creation form with:
   - Place name (optional)
   - Location (required)
   - Review text (required)
   - Rating (1-10)
   - Continent selection
   - Image URL (optional)
3. System:
   - Validates input
   - Makes API call to `POST /user/:userId/blogPost`
   - Adds post to user's posts collection
   - Updates dashboard view

### Updating a Post
1. User clicks "Edit" on their post
2. System:
   - Populates form with existing post data
   - User modifies desired fields
3. Upon submission:
   - API call to `PUT /user/:userId/blogPost/:postId`
   - Dashboard updates with modified post

### Deleting a Post
1. User clicks "Delete" on their post
2. System:
   - Makes API call to `DELETE /user/:userId/blogPost/:postId`
   - Removes post from dashboard view
   - Updates posts list

## Post Publication

Posts are automatically public once created. The publication process:

1. Post Creation:
   - Post saved to API database
   - Immediately available in global feed
   - Appears in user's profile

2. Post Visibility:
   - Visible in main blog feed
   - Filterable by:
     - Continent
     - Rating
     - User
     - Following/Followers
   - Searchable by location/content

3. Post Interaction:
   - Other users can:
     - View posts
     - Add to favorites
     - Visit poster's profile
   - Post creator can:
     - Edit post
     - Delete post
     - View in their dashboard

## Data Management
- All data persisted through MockAPI
- Base URL: https://672da310fd89797156431180.mockapi.io/traveltales/
- Automatic error handling and retries
- Rate limiting and validation handled automatically