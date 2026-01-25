import React, { useEffect, useState } from 'react';
import Button from './Button';
import { COLORS } from '../constants';

const History = ({ onBack }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('snake_history') || '[]');
            setHistory(stored);
        } catch (e) {
            console.error("Failed to load history", e);
        }
    }, []);

    const clearHistory = () => {
        localStorage.removeItem('snake_history');
        setHistory([]);
    };

    return (
        <div className="card" style={{
            backgroundColor: COLORS.PANEL_BG,
            border: `2px solid ${COLORS.PANEL_BORDER}`,
            padding: '30px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '500px',
            maxHeight: '80vh',
            gap: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            <h1 style={{ color: COLORS.TEXT_MAIN }}>📜 Score History</h1>

            <div style={{
                width: '100%',
                overflowY: 'auto',
                border: `1px solid ${COLORS.PANEL_BORDER}`,
                borderRadius: '10px',
                backgroundColor: COLORS.APP_BG
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: COLORS.TEXT_MAIN }}>
                    <thead>
                        <tr style={{ backgroundColor: '#111827', textAlign: 'left' }}>
                            <th style={{ padding: '15px' }}>Date</th>
                            <th style={{ padding: '15px' }}>Score</th>
                            <th style={{ padding: '15px' }}>Map</th>
                            <th style={{ padding: '15px' }}>Diff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length === 0 ? (
                            <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: COLORS.TEXT_MUTED }}>No history yet</td></tr>
                        ) : (
                            history.map((row, i) => (
                                <tr key={i} style={{ borderTop: `1px solid ${COLORS.PANEL_BORDER}` }}>
                                    <td style={{ padding: '12px' }}>{row.date}</td>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: COLORS.ACCENT }}>{row.score}</td>
                                    <td style={{ padding: '12px' }}>{row.map}</td>
                                    <td style={{ padding: '12px' }}>{row.difficulty}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '10px', justifyContent: 'center' }}>
                <Button onClick={clearHistory} style={{ width: 'auto' }}>🗑 Clear</Button>
                <Button onClick={onBack} style={{ width: 'auto' }}>⬅ Back</Button>
            </div>
        </div>
    );
};

export default History;
