import React from 'react';
import Button from './Button';
import { DIFFICULTIES, MAPS, COLORS } from '../constants';

const Options = ({ difficulty, setDifficulty, selectedMap, setSelectedMap, onBack }) => {
    return (
        <div className="card" style={{
            backgroundColor: COLORS.PANEL_BG,
            border: `2px solid ${COLORS.PANEL_BORDER}`,
            padding: '40px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '400px',
            gap: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            <h1 style={{ color: COLORS.TEXT_MAIN }}>⚙ Options</h1>

            <div style={{ width: '100%' }}>
                <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '10px', color: COLORS.TEXT_MAIN }}>Difficulty</label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1.1rem',
                        backgroundColor: COLORS.APP_BG,
                        color: 'white',
                        border: `1px solid ${COLORS.PANEL_BORDER}`,
                        borderRadius: '8px'
                    }}
                >
                    {Object.keys(DIFFICULTIES).map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            <div style={{ width: '100%' }}>
                <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '10px', color: COLORS.TEXT_MAIN }}>Map Type</label>
                <select
                    value={selectedMap}
                    onChange={(e) => setSelectedMap(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1.1rem',
                        backgroundColor: COLORS.APP_BG,
                        color: 'white',
                        border: `1px solid ${COLORS.PANEL_BORDER}`,
                        borderRadius: '8px'
                    }}
                >
                    {Object.keys(MAPS).map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>

            <Button onClick={onBack} style={{ marginTop: '20px' }}>⬅ Back</Button>
        </div>
    );
};

export default Options;
