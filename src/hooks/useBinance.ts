import { useEffect, useRef, useState } from 'react';

export type TradeItem = {
  id: number;
  price: string;
  qty: string;
  time: number;
  side: 'buy' | 'sell';
};

export function useBinance(symbol = 'btcusdt', maxItems = 100) {
  const [trades, setTrades] = useState<TradeItem[]>([]);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'open' | 'closed' | 'error'>('idle');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = `wss://stream.binance.com:9443/ws/${symbol}@trade`;
    setStatus('connecting');

    let mounted = true;
    try {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        if (!mounted) return;
        setStatus('open');
      };
      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          const item: TradeItem = {
            id: msg.t,
            price: msg.p,
            qty: msg.q,
            time: msg.T,
            side: msg.m ? 'sell' : 'buy',
          };
          setTrades((prev) => [item, ...prev].slice(0, maxItems));
        } catch (e) {
          // ignore parse errors
        }
      };
      ws.onerror = (e) => {
        console.warn('Binance WS error', e);
        if (!mounted) return;
        setStatus('error');
      };
      ws.onclose = () => {
        if (!mounted) return;
        setStatus('closed');
      };
      wsRef.current = ws;
    } catch (e) {
      console.warn('Failed to open Binance WS', e);
      setStatus('error');
    }

    return () => {
      mounted = false;
      try {
        wsRef.current?.close();
      } catch {}
      wsRef.current = null;
    };
  }, [symbol, maxItems]);

  return { trades, status } as const;
}

export default useBinance;
