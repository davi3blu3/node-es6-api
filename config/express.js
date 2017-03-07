import express from 'express';
import expressValidation from 'express-validation';
import bodyParser from 'body-parser';
import routes from '../server/routes';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// validation error handling
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        res.status(err.status).json(err);
    } else {
        res.status(500)
            .json({
                status: err.status,
                message: err.message
            });
    }
});

// mount all routes on /api path
app.use('/api', routes);
app.use((err, req, res, next) => {
    res.status(err.status)
        .json({
            status: err.status,
            message: err.message
        });
});

export default app;