import React from 'react';
import { Card } from '../../components/Card';
import useBinance from '../../hooks/useBinance';

export const BinanceHidden: React.FC = () => {
  const { trades, status } = useBinance('btcusdt', 100);

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <h2>Binance Live Trades (hidden)</h2>
      <p style={{ color: '#666' }}>Rota escondida — acessível diretamente via URL <code>/_binance</code>.</p>
      <Card style={{ marginTop: 12 }}>
        <div style={{ padding: 12, color: '#666' }}>Status: {status}</div>
        <div style={{ maxHeight: 480, overflowY: 'auto' }}>
          {trades.length === 0 && <div style={{ padding: 20 }}>Aguardando trades...</div>}
          {trades.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 700, color: t.side === 'buy' ? '#16a34a' : '#dc2626' }}>{t.price}</div>
              <div style={{ color: '#666' }}>{Number(t.qty).toFixed(6)}</div>
              <div style={{ color: '#999', fontSize: 12 }}>{new Date(t.time).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BinanceHidden;
