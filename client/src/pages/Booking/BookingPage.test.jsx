import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import BookingPage from './BookingPage';

jest.mock('axios');

describe('BookingPage', () => {
    const mockNavigate = jest.fn();
    const mockUseParams = jest.fn().mockReturnValue({ userId: '1' });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
        jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue(mockUseParams());
    });

    test('renders BookingPage component', () => {
        render(
            <MemoryRouter>
                <BookingPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Book Appointment')).toBeInTheDocument();
    });

    test('displays error if user is not authenticated', async () => {
        render(
            <MemoryRouter>
                <BookingPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Book Appointment'));

        await waitFor(() => {
            expect(screen.getByText('User not authenticated. Please log in.')).toBeInTheDocument();
        });
    });

    test('handles successful appointment booking', async () => {
        localStorage.setItem('token', 'mockToken');
        axios.post.mockResolvedValueOnce({ data: { id: '1' } });

        render(
            <MemoryRouter>
                <BookingPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Appointment Type'), { target: { value: 'Classic Lashes Full Set' } });
        fireEvent.change(screen.getByLabelText('Appointment Date'), { target: { value: '2023-10-10T10:00' } });

        fireEvent.click(screen.getByText('Book Appointment'));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard/1');
        });
    });

    test('handles error during appointment booking', async () => {
        localStorage.setItem('token', 'mockToken');
        axios.post.mockRejectedValueOnce({ response: { data: { error: 'Booking failed' } } });

        render(
            <MemoryRouter>
                <BookingPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Appointment Type'), { target: { value: 'Classic Lashes Full Set' } });
        fireEvent.change(screen.getByLabelText('Appointment Date'), { target: { value: '2023-10-10T10:00' } });

        fireEvent.click(screen.getByText('Book Appointment'));

        await waitFor(() => {
            expect(screen.getByText('Booking failed')).toBeInTheDocument();
        });
    });

    test('navigates back to dashboard', () => {
        render(
            <MemoryRouter>
                <BookingPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Back to Dashboard'));

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/1');
    });
});