import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import BanksPage from './pages/BanksPage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const App: React.FC = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Button color="inherit" component={Link} to="/users">Users</Button>
                    <Button color="inherit" component={Link} to="/banks">Banks</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/banks" element={<BanksPage />} />
            </Routes>
        </Router>
    );
};

export default App;
