import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { CreateReminder } from './pages/CreateReminder';
import { DateDetail } from './pages/DateDetail';
import { Home } from './pages/Home';
import { ReminderDetail } from './pages/ReminderDetail';

function App() {
  return (
    <div className="flex flex-col h-screen justify-between font-mulish">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateReminder />} />
        <Route path="/detail" element={<DateDetail />} />
        <Route path="/detail/reminder" element={<ReminderDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
