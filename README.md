# Aaron-Image-Board
 An image board made with MEEN (ejs)

```
TODO~
- Lines 71 and 113 in threadController, redirect to /thread/:threadNo instead of just /:threadNo to prevent glitches.
    - possibly other locations in code as well, just route threads through /thread or similar diliniater

- Figure out cloud storage or something for images 
```


# Plan for login feature 

1. Login page where user can log in to a session

2. Logged in users can access a unique "user portal" page containing the posts and threads that they have made

3. If nobody is logged in, you cannot access the user portal (redirects to login page)