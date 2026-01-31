const req = { session: {} };
const res = {
    status: function (code) {
        console.log('Status set to:', code);
        return this;
    },
    json: function (msg) {
        console.log('JSON response:', msg);
        return this;
    }
};
const next = () => console.log('Next called');

const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access.");
    }
    next();
};

console.log('Testing with undefined user:');
isAuthenticated(req, res, next);

console.log('\nTesting with defined user:');
req.session.user = { displayName: 'Test User' };
isAuthenticated(req, res, next);
