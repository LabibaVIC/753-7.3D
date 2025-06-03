const express = require('express');
const bodyParser = require('body-parser');  // Make sure body-parser is used for parsing form data
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(express.json());  // Parse JSON bodies if necessary

// Serve static files
app.use(express.static('public'));

// Render index page (form)
app.get('/', (req, res) => {
    res.render('index');  // Rendering the form in index.ejs
});

// Handle form submission
app.post('/submitmembership', (req, res) => {
    // Form data will be in req.body
    const formData = req.body;

    // Log the data to see what's being submitted (for debugging)
    console.log(formData);

    // Pass form data to thank you page
    res.render('thankyou', {
        firstName: formData.firstname,
        surname: formData.surname,
        email: formData.email,
        mobile: formData.mobileNumber,
        capsOwned: formData.inputNumCaps,
        favoriteCaps: formData.capstyle,
        poem: formData.comments
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
